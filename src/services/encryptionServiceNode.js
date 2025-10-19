const crypto = require('crypto');

/**
 * Encryption Service using Node.js crypto module
 * Uses AES-256-GCM for authenticated encryption
 */
class EncryptionService {
  constructor() {
    this.algorithm = 'aes-256-gcm';
    this.keyLength = 32; // 256 bits
    this.ivLength = 16; // 128 bits
    this.saltLength = 64;
    this.tagLength = 16;
    this.iterations = 100000; // PBKDF2 iterations
  }

  /**
   * Derive encryption key from password using PBKDF2
   */
  deriveKey(password, salt) {
    return crypto.pbkdf2Sync(
      password,
      salt,
      this.iterations,
      this.keyLength,
      'sha256'
    );
  }

  /**
   * Encrypt data with password
   * Returns: { encrypted, iv, salt, tag }
   */
  encrypt(plaintext, password) {
    try {
      // Generate random salt and IV
      const salt = crypto.randomBytes(this.saltLength);
      const iv = crypto.randomBytes(this.ivLength);

      // Derive key from password
      const key = this.deriveKey(password, salt);

      // Create cipher
      const cipher = crypto.createCipheriv(this.algorithm, key, iv);

      // Encrypt
      let encrypted = cipher.update(plaintext, 'utf8', 'hex');
      encrypted += cipher.final('hex');

      // Get authentication tag
      const tag = cipher.getAuthTag();

      return {
        encrypted,
        iv: iv.toString('hex'),
        salt: salt.toString('hex'),
        tag: tag.toString('hex'),
      };
    } catch (error) {
      throw new Error(`Encryption failed: ${error.message}`);
    }
  }

  /**
   * Decrypt data with password
   * Requires: { encrypted, iv, salt, tag, password }
   */
  decrypt(encryptedData, iv, salt, tag, password) {
    try {
      // Derive key from password and salt
      const key = this.deriveKey(password, Buffer.from(salt, 'hex'));

      // Create decipher
      const decipher = crypto.createDecipheriv(
        this.algorithm,
        key,
        Buffer.from(iv, 'hex')
      );

      // Set authentication tag
      decipher.setAuthTag(Buffer.from(tag, 'hex'));

      // Decrypt
      let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
      decrypted += decipher.final('utf8');

      return decrypted;
    } catch (error) {
      throw new Error(`Decryption failed: ${error.message}`);
    }
  }

  /**
   * Create encrypted blob for storage
   * Returns JSON string with all encryption data
   */
  createEncryptedBlob(plaintext, password) {
    const { encrypted, iv, salt, tag } = this.encrypt(plaintext, password);

    return JSON.stringify({
      data: encrypted,
      iv,
      salt,
      tag,
      version: '1.0', // For future compatibility
    });
  }

  /**
   * Decrypt blob from storage
   */
  decryptBlob(encryptedBlob, password) {
    try {
      const { data, iv, salt, tag } = JSON.parse(encryptedBlob);
      return this.decrypt(data, iv, salt, tag, password);
    } catch (error) {
      throw new Error(`Invalid encrypted data or wrong password`);
    }
  }
}

module.exports = new EncryptionService();
