import axios from 'axios';

// Use Vite env var if provided, else fallback to localhost. Ensure trailing /api
const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
const API_BASE_URL = `${BASE.replace(/\/$/, '')}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export interface Pad {
  id: string;
  title: string;
  encrypted_blob: string;
  encrypted?: boolean;
  encryptionMeta?: EncryptionMeta;
  attachments?: FileAttachment[];
  metadata: {
    created_at: string;
    updated_at: string;
  };
}

export interface FileAttachment {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  data: string;
  encrypted: boolean;
}

export interface EncryptionMeta {
  iv: string;
  salt: string;
}

export interface CreatePadData {
  title: string;
  content: string;
  encrypted?: boolean;
  encryptionMeta?: EncryptionMeta;
  attachments?: FileAttachment[];
}

export interface UpdatePadData {
  title: string;
  content: string;
  encryptionMeta?: EncryptionMeta;
  attachments?: FileAttachment[];
}

// Pad API methods
export const padApi = {
  // Get all pads (with optional search)
  getAllPads: async (search?: string): Promise<Pad[]> => {
    const params = search ? { search } : {};
    const response = await api.get('/pads', { params });
    return response.data;
  },

  // Get single pad by ID
  getPad: async (id: string): Promise<Pad> => {
    const response = await api.get(`/pads/${id}`);
    return response.data;
  },

  // Create new pad
  createPad: async (data: CreatePadData): Promise<Pad> => {
    const response = await api.post('/pads', data);
    return response.data.pad;
  },

  // Update existing pad
  updatePad: async (id: string, data: UpdatePadData): Promise<Pad> => {
    const response = await api.put(`/pads/${id}`, data);
    return response.data.pad;
  },

  // Delete pad
  deletePad: async (id: string): Promise<void> => {
    await api.delete(`/pads/${id}`);
  },
};

// Health check
export const healthCheck = async (): Promise<{ status: string; message: string }> => {
  const response = await axios.get(`${BASE.replace(/\/$/, '')}/health`);
  return response.data;
};

export default api;
