/**
 * Client-side Encryption Utilities using Web Crypto API
 * AES-256-GCM encryption for secure, authenticated encryption
 */

const ALGORITHM = 'AES-GCM';
const KEY_LENGTH = 256;
const IV_LENGTH = 12; // 96 bits for GCM
const SALT_LENGTH = 16;
const ITERATIONS = 100000;

/**
 * Convert string to ArrayBuffer
 */
function str2ab(str: string): ArrayBuffer {
  const encoder = new TextEncoder();
  return encoder.encode(str).buffer;
}

/**
 * Convert ArrayBuffer to string
 */
function ab2str(buffer: ArrayBuffer): string {
  const decoder = new TextDecoder();
  return decoder.decode(buffer);
}

/**
 * Convert ArrayBuffer to hex string
 */
function ab2hex(buffer: ArrayBuffer | Uint8Array): string {
  const arr = buffer instanceof ArrayBuffer ? new Uint8Array(buffer) : buffer;
  return Array.from(arr)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Convert hex string to ArrayBuffer
 */
function hex2ab(hex: string): ArrayBuffer {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes.buffer;
}

/**
 * Derive encryption key from password using PBKDF2
 */
async function deriveKey(password: string, salt: ArrayBuffer | Uint8Array): Promise<CryptoKey> {
  const saltBuffer = salt instanceof ArrayBuffer ? salt : (salt.buffer as ArrayBuffer);
  const passwordKey = await crypto.subtle.importKey(
    'raw',
    str2ab(password),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltBuffer,
      iterations: ITERATIONS,
      hash: 'SHA-256',
    },
    passwordKey,
    { name: ALGORITHM, length: KEY_LENGTH },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypt plaintext with password
 * Returns encrypted data with IV and salt
 */
export async function encrypt(plaintext: string, password: string): Promise<{
  encrypted: string;
  iv: string;
  salt: string;
}> {
  try {
    // Generate random salt and IV
    const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
    const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));

    // Derive key from password
    const key = await deriveKey(password, salt);

    // Encrypt
    const encryptedBuffer = await crypto.subtle.encrypt(
      {
        name: ALGORITHM,
        iv,
      },
      key,
      str2ab(plaintext)
    );

    return {
      encrypted: ab2hex(encryptedBuffer),
      iv: ab2hex(iv),
      salt: ab2hex(salt),
    };
  } catch (error) {
    throw new Error(`Encryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Decrypt encrypted data with password
 */
export async function decrypt(
  encrypted: string,
  iv: string,
  salt: string,
  password: string
): Promise<string> {
  try {
    // Convert hex strings back to ArrayBuffers
    const encryptedBuffer = hex2ab(encrypted);
    const ivBuffer = hex2ab(iv);
    const saltBuffer = hex2ab(salt);

    // Derive key from password and salt
    const key = await deriveKey(password, saltBuffer);

    // Decrypt
    const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: ALGORITHM,
        iv: ivBuffer,
      },
      key,
      encryptedBuffer
    );

    return ab2str(decryptedBuffer);
  } catch (error) {
    throw new Error('Decryption failed. Wrong password or corrupted data.');
  }
}

/**
 * Create encrypted blob for storage (JSON string)
 */
export async function createEncryptedBlob(plaintext: string, password: string): Promise<string> {
  const { encrypted, iv, salt } = await encrypt(plaintext, password);

  return JSON.stringify({
    data: encrypted,
    iv,
    salt,
    version: '1.0',
  });
}

/**
 * Decrypt blob from storage
 */
export async function decryptBlob(encryptedBlob: string, password: string): Promise<string> {
  try {
    const { data, iv, salt } = JSON.parse(encryptedBlob);
    return await decrypt(data, iv, salt, password);
  } catch (error) {
    throw new Error('Invalid encrypted data or wrong password');
  }
}
