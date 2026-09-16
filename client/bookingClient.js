const env = require('../config/env.js');

class bookingClient {
    constructor(request){
        this.request = request;
    }

    async getBookingID(){
        const response = await this.request.get(`${env.baseURL}/booking`);
        return await response.json();
    }

    async getBookingIDByName(firstname, lastname){
        const response = await this.request.get(`${env.baseURL}/booking?firstname=${firstname}&lastname=${lastname}`);
        return await response.json();
    }

    async getBookingIDByDates(checkin, checkout){
        const response = await this.request.get(`${env.baseURL}/booking?checkin=${checkin}&checkout=${checkout}`);
        return await response.json();
    }

    async getBookingDetails(id){
        const response = await this.request.get(`${env.baseURL}/booking/${id}`);
        return await response;
    }

    async createBooking(payload){
        const response = await this.request.post(`${env.baseURL}/booking`, {
            data : payload
        })
        return await response;
    }

    async updateBooking(id, payload){
        const response = await this.request.put(`${env.baseURL}/booking/${id}`, {
            data : payload
        })
        return await response;
    }

    async partialUpdate(id, payload){
        const response = await this.request.patch(`${env.baseURL}/booking/${id}`, {
            data : payload
        })
        return await response.json();
    }

    async deleteBooking(id){
        const response = await this.request.delete(`${env.baseURL}/booking/${id}`);
        return response;
    }
}

module.exports = bookingClient;