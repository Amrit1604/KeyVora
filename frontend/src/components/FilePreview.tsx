import { Download, Image as ImageIcon, Video, Music, FileText, File } from 'lucide-react';
import { getFileCategory, formatFileSize, downloadFile, base64ToBlob, type FileAttachment } from '../utils/fileUtils';

interface FilePreviewProps {
  attachments: FileAttachment[];
}

export default function FilePreview({ attachments }: FilePreviewProps) {
  if (attachments.length === 0) return null;

  const getFileIcon = (mimeType: string) => {
    const category = getFileCategory(mimeType);
    switch (category) {
      case 'image':
        return <ImageIcon className="w-6 h-6 text-blue-400" />;
      case 'video':
        return <Video className="w-6 h-6 text-purple-400" />;
      case 'audio':
        return <Music className="w-6 h-6 text-pink-400" />;
      case 'document':
      case 'text':
        return <FileText className="w-6 h-6 text-green-400" />;
      default:
        return <File className="w-6 h-6 text-gray-400" />;
    }
  };

  const renderPreview = (attachment: FileAttachment) => {
    const category = getFileCategory(attachment.mimeType);
    const blob = base64ToBlob(attachment.data, attachment.mimeType);
    const url = URL.createObjectURL(blob);

    switch (category) {
      case 'image':
        return (
          <div className="mt-3">
            <img
              src={url}
              alt={attachment.originalName}
              className="max-w-full h-auto rounded-lg border border-green-500/20"
              onLoad={() => URL.revokeObjectURL(url)}
            />
          </div>
        );

      case 'video':
        return (
          <div className="mt-3">
            <video
              controls
              className="max-w-full h-auto rounded-lg border border-green-500/20"
              onLoadedData={() => URL.revokeObjectURL(url)}
            >
              <source src={url} type={attachment.mimeType} />
              Your browser does not support video playback.
            </video>
          </div>
        );

      case 'audio':
        return (
          <div className="mt-3">
            <audio
              controls
              className="w-full"
              onLoadedData={() => URL.revokeObjectURL(url)}
            >
              <source src={url} type={attachment.mimeType} />
              Your browser does not support audio playback.
            </audio>
          </div>
        );

      case 'document':
        if (attachment.mimeType === 'application/pdf') {
          return (
            <div className="mt-3">
              <iframe
                src={url}
                className="w-full h-96 rounded-lg border border-green-500/20"
                title={attachment.originalName}
              />
            </div>
          );
        }
        return null;

      case 'text':
        return (
          <div className="mt-3 bg-slate-900 rounded-lg p-4 border border-green-500/20">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap overflow-x-auto">
              {atob(attachment.data)}
            </pre>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">📎 Attachments</h2>
      <div className="space-y-4">
        {attachments.map((attachment, index) => (
          <div
            key={index}
            className="bg-slate-800/50 backdrop-blur border border-green-500/20 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                {getFileIcon(attachment.mimeType)}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium truncate">{attachment.originalName}</h3>
                  <p className="text-sm text-gray-400">
                    {formatFileSize(attachment.size)} · {attachment.mimeType}
                  </p>
                </div>
              </div>
              <button
                onClick={() => downloadFile(attachment)}
                className="ml-4 flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-lg transition"
                title="Download file"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
              </button>
            </div>

            {renderPreview(attachment)}
          </div>
        ))}
      </div>
    </div>
  );
}
