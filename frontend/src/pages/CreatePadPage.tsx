import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Lock } from 'lucide-react';
import { padApi } from '../services/api';
import { createEncryptedBlob } from '../utils/encryption';
import { passwordStore } from '../utils/passwordStore';
import { calculatePasswordStrength } from '../utils/passwordStrength';
import FileUpload from '../components/FileUpload';
import type { FileAttachment } from '../utils/fileUtils';

export default function CreatePadPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [encrypted, setEncrypted] = useState(false);
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // Encrypt content if encryption is enabled
      let contentToSave = content;
      let encryptionMeta;

      if (encrypted) {
        if (!password) {
          setError('Password is required for encrypted pads');
          setSaving(false);
          return;
        }
        const encryptedBlob = await createEncryptedBlob(content, password);
        const parsed = JSON.parse(encryptedBlob);
        contentToSave = parsed.data;
        encryptionMeta = {
          iv: parsed.iv,
          salt: parsed.salt
        };
      }

      const createdPad = await padApi.createPad({
        title,
        content: contentToSave,
        encrypted,
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

      // Save password for this session if encrypted
      if (encrypted && password) {
        passwordStore.save(createdPad.id, password);
      }

      alert(`✅ Pad created successfully!\n\n📝 Pad Name: ${title}\n${encrypted ? '🔒 Password: ' + password : ''}\n\nRemember these to access your pad!`);
      navigate('/pads');
    } catch (err: any) {
      console.error('Failed to create pad:', err);
      const errorMsg = err.response?.data?.message || 'Failed to create pad. Please try again.';
      setError(errorMsg);
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white font-mono mb-2">Create New Pad</h1>
        <p className="text-gray-400">Create a new encrypted or plain text note</p>
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
            Pad Name (Unique Identifier)
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter unique pad name..."
            required
            className="w-full bg-slate-800/50 border border-green-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50"
          />
          <p className="text-sm text-cyan-400 mt-2">
            💡 This name is your pad's ID. Remember it to access your pad later!
          </p>
        </div>

        {/* Encryption Toggle */}
        <div className="bg-slate-800/30 border border-green-500/20 rounded-lg p-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={encrypted}
              onChange={(e) => setEncrypted(e.target.checked)}
              className="w-5 h-5 text-green-500 rounded focus:ring-green-500 focus:ring-offset-0"
            />
            <Lock className="w-5 h-5 text-green-400 ml-3 mr-2" />
            <span className="text-white font-medium">Encrypt this pad</span>
          </label>
        </div>

        {/* Password Field (if encrypted) */}
        {encrypted && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Encryption Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a strong password..."
              required={encrypted}
              className="w-full bg-slate-800/50 border border-yellow-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50"
            />
            {password && (
              <div className="mt-2">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className={calculatePasswordStrength(password).color}>
                    {calculatePasswordStrength(password).feedback}
                  </span>
                  <span className="text-gray-400">
                    {calculatePasswordStrength(password).score}%
                  </span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      calculatePasswordStrength(password).strength === 'weak' ? 'bg-red-500' :
                      calculatePasswordStrength(password).strength === 'fair' ? 'bg-orange-500' :
                      calculatePasswordStrength(password).strength === 'good' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${calculatePasswordStrength(password).score}%` }}
                  />
                </div>
              </div>
            )}
            <p className="text-sm text-gray-400 mt-2">
              ⚠️ Remember this password! It cannot be recovered.
            </p>
          </div>
        )}

        {/* Content Textarea */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-300">
              Content
            </label>
            <div className="text-xs text-gray-400">
              {content.length} characters · {content.trim().split(/\s+/).filter(w => w).length} words
            </div>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
                <span>Save Pad</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate('/pads')}
            className="px-6 py-3 text-gray-400 hover:text-white transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
