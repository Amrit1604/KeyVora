const request = require('supertest');
const app = require('../../src/app');
const fs = require('fs');
const path = require('path');

describe('Pads Integration Tests', () => {
    const padsFilePath = path.join(__dirname, '../../data/pads.json');

    beforeEach(() => {
        // Reset pads.json before each test
        fs.writeFileSync(padsFilePath, JSON.stringify([]));
    });

    it('should create a new pad', async () => {
        const response = await request(app)
            .post('/api/pads')
            .send({ title: 'Test Pad', content: 'This is a test pad.' });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Test Pad');
    });

    it('should retrieve a pad by ID', async () => {
        const createResponse = await request(app)
            .post('/api/pads')
            .send({ title: 'Test Pad', content: 'This is a test pad.' });

        const padId = createResponse.body.id;

        const response = await request(app)
            .get(`/api/pads/${padId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', padId);
        expect(response.body.title).toBe('Test Pad');
    });

    it('should update an existing pad', async () => {
        const createResponse = await request(app)
            .post('/api/pads')
            .send({ title: 'Test Pad', content: 'This is a test pad.' });

        const padId = createResponse.body.id;

        const response = await request(app)
            .put(`/api/pads/${padId}`)
            .send({ title: 'Updated Pad', content: 'This is an updated test pad.' });

        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Updated Pad');
    });

    it('should delete a pad', async () => {
        const createResponse = await request(app)
            .post('/api/pads')
            .send({ title: 'Test Pad', content: 'This is a test pad.' });

        const padId = createResponse.body.id;

        const response = await request(app)
            .delete(`/api/pads/${padId}`);

        expect(response.status).toBe(204);
    });

    it('should return 404 for a non-existing pad', async () => {
        const response = await request(app)
            .get('/api/pads/non-existing-id');

        expect(response.status).toBe(404);
    });
});