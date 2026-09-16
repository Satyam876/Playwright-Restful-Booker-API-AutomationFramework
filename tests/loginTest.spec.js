const {test, expect} = require('@playwright/test');
const AuthClient = require('../client/authClient.js');
const env = require('../config/env.js');

test('Login Test', async({request}) => {
    const authClient = new AuthClient(request);
    const authToken = await authClient.getAuthToken(env.username, env.password);

    expect(authToken).toHaveProperty('token');
    console.log(authToken);
})