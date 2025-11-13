import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FileText, Lock, Calendar, Edit, Trash2, Copy, Download, Check, Share2, LockKeyhole } from 'lucide-react';
import { padApi } from '../services/api';
import { decryptBlob } from '../utils/encryption';
import { passwordStore } from '../utils/passwordStore';
import FilePreview from '../components/FilePreview';
import type { FileAttachment } from '../utils/fileUtils';

interface Pad {
  id: string;
  title: string;
  content: string;
  encrypted: boolean;
  createdAt: string;
  updatedAt: string;
  attachments?: FileAttachment[];
}

export default function ViewPadPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pad, setPad] = useState<Pad | null>(null);
  const [loading, setLoading] = useState(true);
  const [decrypted, setDecrypted] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPad();
    }
  }, [id]);

  const fetchPad = async () => {
    try {
      setLoading(true);
      const data = await padApi.getPad(id!);

      // Check if this pad is encrypted using the encrypted flag
      const isEncrypted = data.encrypted === true;

      // Try to auto-decrypt if we have a saved password
      if (isEncrypted && data.encryptionMeta) {
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
              createdAt: data.metadata.created_at,
              updatedAt: data.metadata.updated_at,
              attachments: data.attachments || [],
            });
            setDecrypted(true);
            setPassword(savedPassword); // Keep password for editing
          } catch (err) {


            // Saved password didn't work, show decrypt UI
            setPad({
              id: data.id,
              title: data.title,
              content: data.encrypted_blob,
              encrypted: true,
              createdAt: data.metadata.created_at,
              updatedAt: data.metadata.updated_at,
              attachments: data.attachments || [],
            });
          }

        } else {
          // No saved password, show decrypt UI
          setPad({
            id: data.id,
            title: data.title,
            content: data.encrypted_blob,
            encrypted: true,
            createdAt: data.metadata.created_at,
            updatedAt: data.metadata.updated_at,
            attachments: data.attachments || [],
          });
        }
      } else {
        // Plain text pad
        setPad({
          id: data.id,
          title: data.title,
          content: data.encrypted_blob,
          encrypted: false,
          createdAt: data.metadata.created_at,
          updatedAt: data.metadata.updated_at,
          attachments: data.attachments || [],
        });
        setDecrypted(true);
      }

      setError(null);
    } catch (err) {
      console.error('Failed to fetch pad:', err);
      setError('Failed to load pad. It may not exist.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    // For encrypted pads, require decryption first
    if (pad?.encrypted && !decrypted) {
      setError('⚠️ Please decrypt this pad first before deleting it');
      return;
    }

    const confirmMessage = pad?.encrypted
      ? '⚠️ Are you sure you want to delete this ENCRYPTED pad?\n\nThis action cannot be undone!'
      : 'Are you sure you want to delete this pad?';

    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      await padApi.deletePad(id!);

      // Clear saved password when deleting
      if (pad?.encrypted) {
        passwordStore.remove(id!);
      }

      navigate('/pads');
    } catch (err) {
      console.error('Failed to delete pad:', err);
      setError('Failed to delete pad. Please try again.');
    }
  };

  const handleDecrypt = async () => {
    if (!password) {
      setError('Please enter a password');
      return;
    }

    try {
      if (pad && pad.encrypted) {
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
          setPad({ ...pad, content: decryptedContent, attachments: data.attachments || [] });
          setDecrypted(true);
          setError(null);

          // Save password for this session
          passwordStore.save(id!, password);
        } else {
          setError('Encryption metadata missing. This pad may be corrupted.');
        }
      }
    } catch (err) {
      console.error('Decryption failed:', err);
      setError('Wrong password or corrupted data');
    }
  };

  const handleCopy = async () => {
    if (!pad?.content) return;

    try {
      await navigator.clipboard.writeText(pad.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setError('Failed to copy to clipboard');
    }
  };

  const handleExport = () => {
    if (!pad) return;

    const blob = new Blob([pad.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${pad.title}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (!pad) return;

    const padUrl = `${window.location.origin}/pads/${pad.id}`;

    try {
      await navigator.clipboard.writeText(padUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
      setError('Failed to copy link to clipboard');
    }
  };

  const handleLockPad = () => {
    if (!pad || !pad.encrypted) return;

    // Clear the saved password
    passwordStore.remove(id!);

    // Reload the page to show decrypt UI
    window.location.reload();
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

  if (!pad && !loading) {
    return (
      <div className="text-center py-16">
        <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-400 text-lg mb-4">Pad not found</p>
        <Link to="/pads" className="text-green-400 hover:text-green-300 underline">
          Back to pads
        </Link>
      </div>
    );
  }

  if (!pad) return null;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Error Banner */}
      {error && (
        <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-lg p-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <FileText className="w-8 h-8 text-green-400" />
          <h1 className="text-3xl font-bold text-white">{pad.title}</h1>
          {pad.encrypted && <Lock className="w-6 h-6 text-yellow-400" />}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
            title="Share pad link"
          >
            {linkCopied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            <span>{linkCopied ? 'Link Copied!' : 'Share'}</span>
          </button>
          {pad.encrypted && decrypted && (
            <button
              onClick={handleLockPad}
              className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition"
              title="Lock pad and clear saved password"
            >
              <LockKeyhole className="w-4 h-4" />
              <span>Lock</span>
            </button>
          )}
          <button
            onClick={handleCopy}
            disabled={!decrypted}
            className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition"
            title="Copy content to clipboard"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
          <button
            onClick={handleExport}
            disabled={!decrypted}
            className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition"
            title="Export as TXT"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <Link
            to={`/pads/${pad.id}/edit`}
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </Link>
          <button
            onClick={handleDelete}
            disabled={pad.encrypted && !decrypted}
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition"
            title={pad.encrypted && !decrypted ? 'Decrypt first to delete' : 'Delete this pad'}
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Metadata */}
      <div className="flex items-center space-x-6 text-sm text-gray-400 mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>Created: {new Date(pad.createdAt).toLocaleString()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>Updated: {new Date(pad.updatedAt).toLocaleString()}</span>
        </div>
      </div>

      {/* Content */}
      {pad.encrypted && !decrypted ? (
        <div className="bg-slate-800/50 border border-yellow-500/20 rounded-xl p-8 text-center">
          <Lock className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">This pad is encrypted</h3>
          <p className="text-gray-400 mb-6">Enter your password to decrypt and view the content</p>
          <div className="max-w-md mx-auto">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              className="w-full bg-slate-800/50 border border-green-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 mb-4"
            />
            <button
              onClick={handleDecrypt}
              className="bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-lg font-semibold transition"
            >
              Decrypt
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-slate-800/50 border border-green-500/20 rounded-xl p-8">
            <pre className="text-gray-300 whitespace-pre-wrap font-mono">{pad.content}</pre>
          </div>

          {/* File Attachments Preview */}
          {pad?.attachments && pad.attachments.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-green-400 mb-4">
                Attachments ({pad.attachments.length})
              </h3>
              <FilePreview attachments={pad.attachments} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
