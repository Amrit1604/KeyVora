const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const keyLength = 32; // Key length for AES-256
const ivLength = 16; // Initialization vector length for AES

function generateKey(passphrase) {
  return crypto.scryptSync(passphrase, 'salt', keyLength);
}

function encrypt(text, passphrase) {
  const iv = crypto.randomBytes(ivLength);
  const key = generateKey(passphrase);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return {
    iv: iv.toString('hex'),
    content: encrypted
  };
}

function decrypt(encryptedData, passphrase) {
  const iv = Buffer.from(encryptedData.iv, 'hex');
  const key = generateKey(passphrase);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedData.content, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = {
  encrypt,
  decrypt
};