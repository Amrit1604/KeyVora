const fs = require('fs');
const path = require('path');
const storageService = require('../../src/services/storageService');

describe('Storage Service', () => {
    const testFilePath = path.join(__dirname, '../../data/test.json');

    afterEach(() => {
        if (fs.existsSync(testFilePath)) {
            fs.unlinkSync(testFilePath);
        }
    });

    test('should write data to a JSON file', async () => {
        const data = { key: 'value' };
        await storageService.writeData(testFilePath, data);
        const fileData = JSON.parse(fs.readFileSync(testFilePath, 'utf8'));
        expect(fileData).toEqual(data);
    });

    test('should read data from a JSON file', async () => {
        const data = { key: 'value' };
        fs.writeFileSync(testFilePath, JSON.stringify(data));
        const result = await storageService.readData(testFilePath);
        expect(result).toEqual(data);
    });

    test('should return null for non-existing file', async () => {
        const result = await storageService.readData(testFilePath);
        expect(result).toBeNull();
    });
});