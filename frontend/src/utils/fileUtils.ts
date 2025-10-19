/**
 * File upload and management utilities
 */

export interface FileAttachment {
  id?: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  data: string; // base64 encoded
  encrypted: boolean;
  uploaded_at?: string;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const ALLOWED_FILE_TYPES = {
  images: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
  videos: ['video/mp4', 'video/webm', 'video/ogg'],
  audio: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/webm'],
  documents: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  text: ['text/plain', 'text/markdown', 'application/json'],
};

export const ALL_ALLOWED_TYPES = [
  ...ALLOWED_FILE_TYPES.images,
  ...ALLOWED_FILE_TYPES.videos,
  ...ALLOWED_FILE_TYPES.audio,
  ...ALLOWED_FILE_TYPES.documents,
  ...ALLOWED_FILE_TYPES.text,
];

export function isFileTypeAllowed(mimeType: string): boolean {
  return ALL_ALLOWED_TYPES.includes(mimeType);
}

export function getFileCategory(mimeType: string): 'image' | 'video' | 'audio' | 'document' | 'text' | 'unknown' {
  if (ALLOWED_FILE_TYPES.images.includes(mimeType)) return 'image';
  if (ALLOWED_FILE_TYPES.videos.includes(mimeType)) return 'video';
  if (ALLOWED_FILE_TYPES.audio.includes(mimeType)) return 'audio';
  if (ALLOWED_FILE_TYPES.documents.includes(mimeType)) return 'document';
  if (ALLOWED_FILE_TYPES.text.includes(mimeType)) return 'text';
  return 'unknown';
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix (e.g., "data:image/png;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
}

export function base64ToBlob(base64: string, mimeType: string): Blob {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}

export async function processFile(file: File): Promise<FileAttachment> {
  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds ${formatFileSize(MAX_FILE_SIZE)} limit`);
  }

  // Validate file type
  if (!isFileTypeAllowed(file.type)) {
    throw new Error(`File type ${file.type} is not allowed`);
  }

  const base64Data = await fileToBase64(file);

  return {
    filename: `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`,
    originalName: file.name,
    mimeType: file.type,
    size: file.size,
    data: base64Data,
    encrypted: false,
  };
}

export function downloadFile(attachment: FileAttachment): void {
  const blob = base64ToBlob(attachment.data, attachment.mimeType);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = attachment.originalName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
