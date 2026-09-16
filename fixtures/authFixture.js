const {test:base, expect, request} = require('@playwright/test');
const AuthClient = require('../client/authClient.js');
const env = require('../config/env.js');

const test = base.extend({
    authenticatedRequest : async({}, use) => {
        const contextObj = await request.newContext();
        const authContext = new AuthClient(contextObj);

        const tokenResponse = await authContext.getAuthToken(env.username, env.password);
        const accessToken = tokenResponse.token;
        await contextObj.dispose();

        const authRequest = await request.newContext({
            extraHTTPHeaders : {
                Cookie : `token=${accessToken}`
            }
        })

        await use(authRequest);
        await authRequest.dispose();
    }
})

module.exports = {test, expect};