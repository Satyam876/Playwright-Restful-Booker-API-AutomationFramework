const {test, expect} = require('@playwright/test');
const AuthClient = require('../client/authClient.js');
const env = require('../config/env.js');
const bookingSchema = require('../schema/bookingSchema.js');
const Ajv = require('ajv');

test('Booking Schema Validation Test', async({request}) => {
    const authClient = new AuthClient(request);
    const response = await authClient.getAuthToken(env.username, env.password);
    
    const ajv = new Ajv();
    const validate = ajv.compile(bookingSchema);
    const isValid = validate(response);
    console.log(validate.errors);
    expect(isValid).toBe(true);
})