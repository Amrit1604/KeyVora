import { useState, useRef } from 'react';
import { Upload, X, File, Image, Video, Music, FileText } from 'lucide-react';
import { processFile, formatFileSize, getFileCategory, type FileAttachment } from '../utils/fileUtils';

interface FileUploadProps {
  attachments: FileAttachment[];
  onAttachmentsChange: (attachments: FileAttachment[]) => void;
  disabled?: boolean;
}

export default function FileUpload({ attachments, onAttachmentsChange, disabled }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);

    try {
      const newAttachments: FileAttachment[] = [];

      for (let i = 0; i < files.length; i++) {
        try {
          const attachment = await processFile(files[i]);
          newAttachments.push(attachment);
        } catch (err: any) {
          console.error(`Failed to process ${files[i].name}:`, err);
          setError(`Failed to upload ${files[i].name}: ${err.message}`);
        }
      }

      if (newAttachments.length > 0) {
        onAttachmentsChange([...attachments, ...newAttachments]);
      }
    } catch (err: any) {
      console.error('File upload error:', err);
      setError('Failed to upload files. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = (index: number) => {
    const newAttachments = attachments.filter((_, i) => i !== index);
    onAttachmentsChange(newAttachments);
  };

  const getFileIcon = (mimeType: string) => {
    const category = getFileCategory(mimeType);
    switch (category) {
      case 'image':
        return <Image className="w-5 h-5 text-blue-400" />;
      case 'video':
        return <Video className="w-5 h-5 text-purple-400" />;
      case 'audio':
        return <Music className="w-5 h-5 text-pink-400" />;
      case 'document':
      case 'text':
        return <FileText className="w-5 h-5 text-green-400" />;
      default:
        return <File className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-300">
          Attachments (Optional)
        </label>
        <span className="text-xs text-gray-400">Max 10MB per file</span>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-3 bg-red-500/10 border border-red-500/50 rounded-lg p-3">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Upload Button */}
      <div className="mb-3">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt,.md,.json"
          onChange={handleFileSelect}
          disabled={disabled || uploading}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className={`flex items-center justify-center space-x-2 border-2 border-dashed rounded-lg p-4 cursor-pointer transition ${
            disabled || uploading
              ? 'border-gray-700 bg-gray-800/50 cursor-not-allowed'
              : 'border-green-500/30 bg-slate-800/30 hover:border-green-500/50 hover:bg-slate-800/50'
          }`}
        >
          <Upload className="w-5 h-5 text-green-400" />
          <span className="text-sm text-gray-300">
            {uploading ? 'Uploading...' : 'Click to upload files'}
          </span>
        </label>
      </div>

      {/* Attachments List */}
      {attachments.length > 0 && (
        <div className="space-y-2">
          {attachments.map((attachment, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-slate-800/50 border border-green-500/20 rounded-lg p-3"
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                {getFileIcon(attachment.mimeType)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{attachment.originalName}</p>
                  <p className="text-xs text-gray-400">{formatFileSize(attachment.size)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                disabled={disabled}
                className="ml-2 p-1 text-red-400 hover:text-red-300 disabled:text-gray-600 transition"
                title="Remove attachment"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {attachments.length > 0 && (
        <p className="mt-2 text-xs text-gray-400">
          {attachments.length} file{attachments.length > 1 ? 's' : ''} attached · Total:{' '}
          {formatFileSize(attachments.reduce((sum, a) => sum + a.size, 0))}
        </p>
      )}
    </div>
  );
}
