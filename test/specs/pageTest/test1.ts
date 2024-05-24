const { remote } = require('webdriverio');
const supertest = require('supertest');

describe('API GET Request Test', () => {
    it('should make a GET request to https://reqres.in/api/users/2', async () => {
        const baseURL = 'https://reqres.in/api';

        const api = supertest(baseURL);

        const response = await api.get('/users/2');

        console.log('API Response:', response.body);
    });
});
