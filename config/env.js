require('dotenv').config();

module.exports = {
    baseURL : 'https://restful-booker.herokuapp.com',
    username : process.env.TEST_USERNAME,
    password : process.env.TEST_PASSWORD
}