const env = require('../config/env.js');

class AuthClient {
    constructor(request){
        this.request = request;
    }

    async getAuthToken(username, password){
        const response = await this.request.post(`${env.baseURL}/auth`, {
            data : {
                username : username,
                password : password
            }
        })
        return await response.json();
    }
}

module.exports = AuthClient;