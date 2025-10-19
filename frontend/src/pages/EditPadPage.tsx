import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Lock, Unlock } from 'lucide-react';
import { padApi } from '../services/api';
import { decryptBlob, createEncryptedBlob } from '../utils/encryption';
import { passwordStore } from '../utils/passwordStore';
import FileUpload from '../components/FileUpload';
import type { FileAttachment } from '../utils/fileUtils';

interface Pad {
  id: string;
  title: string;
  content: string;
  encrypted: boolean;
  encryptedBlob?: string; // Store original encrypted data
  attachments?: FileAttachment[];
}

export default function EditPadPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pad, setPad] = useState<Pad | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Decryption state
  const [needsDecryption, setNeedsDecryption] = useState(false);
  const [password, setPassword] = useState('');
  const [decrypting, setDecrypting] = useState(false);
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);

  useEffect(() => {
    if (id) {
      fetchPad();
    }
  }, [id]);

  const fetchPad = async () => {
    try {
      setLoading(true);
      const data = await padApi.getPad(id!);

      // Check if pad is encrypted using the encrypted flag
      if (data.encrypted === true && data.encryptionMeta) {
        // Try to auto-decrypt with saved password
        const savedPassword = passwordStore.get(id!);
        if (savedPassword) {
          try {
            // Reconstruct the encrypted blob for decryption
            const encryptedBlob = JSON.stringify({
              data: data.encrypted_blob,
              iv: data.encryptionMeta.iv,
              salt: data.encryptionMeta.salt,
              version: '1.0'
            });
            const decryptedContent = await decryptBlob(encryptedBlob, savedPassword);
            setPad({
              id: data.id,
              title: data.title,
              content: decryptedContent,
              encrypted: true,
              attachments: data.attachments || [],
            });
            setAttachments(data.attachments || []);
            setPassword(savedPassword);
            setNeedsDecryption(false); // Already decrypted!
          } catch (err) {
            // Saved password didn't work
            setNeedsDecryption(true);
            setPad({
              id: data.id,
              title: data.title,
              content: '',
              encrypted: true,
              encryptedBlob: data.encrypted_blob,
              attachments: data.attachments || [],
            });
            setAttachments(data.attachments || []);
          }
        } else {
          // No saved password, show decrypt UI
          setNeedsDecryption(true);
          setPad({
            id: data.id,
            title: data.title,
            content: '',
            encrypted: true,
            encryptedBlob: data.encrypted_blob,
            attachments: data.attachments || [],
          });
          setAttachments(data.attachments || []);
        }
      } else {
        // Plain text pad
        setPad({
          id: data.id,
          title: data.title,
          content: data.encrypted_blob,
          encrypted: false,
          attachments: data.attachments || [],
        });
        setAttachments(data.attachments || []);
      }
      setError(null);
    } catch (err) {
      console.error('Failed to fetch pad:', err);
      setError('Failed to load pad. It may not exist.');
    } finally {
      setLoading(false);
    }
  };

  const handleDecrypt = async () => {
    if (!password) return;

    try {
      setDecrypting(true);
      setError(null);

      // Fetch the full pad data again to get encryptionMeta
      const data = await padApi.getPad(id!);

      if (data.encryptionMeta) {
        // Reconstruct the encrypted blob for decryption
        const encryptedBlob = JSON.stringify({
          data: data.encrypted_blob,
          iv: data.encryptionMeta.iv,
          salt: data.encryptionMeta.salt,
          version: '1.0'
        });

        const decryptedContent = await decryptBlob(encryptedBlob, password);
        setPad({
          ...pad!,
          content: decryptedContent,
          attachments: data.attachments || []
        });
        setAttachments(data.attachments || []);
        setNeedsDecryption(false);

        // Save password for this session
        passwordStore.save(id!, password);
      } else {
        setError('Encryption metadata missing. This pad may be corrupted.');
      }
    } catch (err) {
      console.error('Decryption failed:', err);
      setError('Wrong password or corrupted data');
    } finally {
      setDecrypting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pad) return;

    setSaving(true);
    setError(null);

    try {
      let contentToSave = pad.content;
      let encryptionMeta;

      // If pad was encrypted, re-encrypt with the same password
      if (pad.encrypted && password) {
        const encryptedBlob = await createEncryptedBlob(pad.content, password);
        const parsed = JSON.parse(encryptedBlob);
        contentToSave = parsed.data;
        encryptionMeta = {
          iv: parsed.iv,
          salt: parsed.salt
        };
      }

      await padApi.updatePad(id!, {
        title: pad.title,
        content: contentToSave,
        encryptionMeta,
        attachments: attachments.map(att => ({
          filename: att.filename,
          originalName: att.originalName,
          mimeType: att.mimeType,
          size: att.size,
          data: att.data,
          encrypted: false
        }))
      });
      navigate(`/pads/${id}`);
    } catch (err) {
      console.error('Failed to update pad:', err);
      setError('Failed to update pad. Please try again.');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading pad...</p>
        </div>
      </div>
    );
  }

  if (!pad) {
    return <div className="text-center py-16 text-gray-400">Pad not found</div>;
  }

  // Show decryption UI if pad is encrypted and not yet decrypted
  if (needsDecryption) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white font-mono mb-2">🔒 Decrypt to Edit</h1>
          <p className="text-gray-400">Enter password to decrypt and edit this pad</p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <div className="bg-slate-800/30 border border-green-500/20 rounded-lg p-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password..."
              className="w-full bg-slate-800/50 border border-green-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50"
              onKeyDown={(e) => e.key === 'Enter' && handleDecrypt()}
            />
          </div>

          <button
            onClick={handleDecrypt}
            disabled={!password || decrypting}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-black px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center space-x-2"
          >
            {decrypting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                <span>Decrypting...</span>
              </>
            ) : (
              <>
                <Unlock className="w-5 h-5" />
                <span>Decrypt & Edit</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white font-mono mb-2">Edit Pad</h1>
        <p className="text-gray-400">Make changes to your note</p>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-lg p-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Title
          </label>
          <input
            type="text"
            value={pad.title}
            onChange={(e) => setPad({ ...pad, title: e.target.value })}
            placeholder="Enter pad title..."
            required
            className="w-full bg-slate-800/50 border border-green-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50"
          />
        </div>

        {/* Encryption Status */}
        {pad.encrypted && (
          <div className="bg-slate-800/30 border border-yellow-500/20 rounded-lg p-4 flex items-center">
            <Lock className="w-5 h-5 text-yellow-400 mr-3" />
            <span className="text-gray-300">This pad is encrypted - your changes will be re-encrypted when you save</span>
          </div>
        )}

        {/* Content Textarea */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-300">
              Content
            </label>
            <div className="text-xs text-gray-400">
              {pad.content.length} characters · {pad.content.trim().split(/\s+/).filter((w: string) => w).length} words
            </div>
          </div>
          <textarea
            value={pad.content}
            onChange={(e) => setPad({ ...pad, content: e.target.value })}
            placeholder="Write your note here..."
            rows={15}
            required
            className="w-full bg-slate-800/50 border border-green-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 font-mono"
          />
        </div>

        {/* File Attachments */}
        <FileUpload
          attachments={attachments}
          onAttachmentsChange={setAttachments}
          disabled={saving}
        />

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-black px-6 py-3 rounded-lg font-semibold transition"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Save Changes</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/pads/${id}`)}
            className="px-6 py-3 text-gray-400 hover:text-white transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
