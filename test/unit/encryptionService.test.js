const { encrypt, decrypt } = require('../src/services/encryptionService');

describe('Encryption Service', () => {
    const testData = 'Hello, World!';
    const passphrase = 'securePassphrase';

    test('should encrypt and decrypt data correctly', async () => {
        const encryptedData = await encrypt(testData, passphrase);
        const decryptedData = await decrypt(encryptedData, passphrase);
        expect(decryptedData).toBe(testData);
    });

    test('should throw an error when using an incorrect passphrase', async () => {
        const encryptedData = await encrypt(testData, passphrase);
        await expect(decrypt(encryptedData, 'wrongPassphrase')).rejects.toThrow();
    });

    test('should handle empty data', async () => {
        const encryptedData = await encrypt('', passphrase);
        const decryptedData = await decrypt(encryptedData, passphrase);
        expect(decryptedData).toBe('');
    });
});