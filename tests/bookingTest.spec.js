const {test, expect} = require('../fixtures/authFixture');
const bookingClient = require('../client/bookingClient.js');
const bookingData = require('../test-data/bookingData.json');
const updateBookingData = require('../test-data/updateBookingData.json');
const partialUpdateData = require('../test-data/partialUpdateData.json');
const negativeBookingData = require('../test-data/negativeBookingData.json');

test('Booking Test', async({request, authenticatedRequest}) => {
    const plainBookingClient = new bookingClient(request);
    const authBookingClient = new bookingClient(authenticatedRequest);

    const bookingCreated = await plainBookingClient.createBooking(bookingData);
    const bookingIDResponse = await bookingCreated.json();
    const bookingID = bookingIDResponse.bookingid;
    console.log("!!! Booking Created !!!")
    console.log(bookingIDResponse);

    const bookingDetails = await plainBookingClient.getBookingDetails(bookingID);
    console.log("!!! Booking Details !!!");
    const bookingDetailsResponse = await bookingDetails.json();
    console.log(bookingDetailsResponse);

    const updateBooking = await authBookingClient.updateBooking(bookingID, updateBookingData);
    const updatedBooking = await updateBooking.json();
    expect(updatedBooking.firstname).toBe("Satyam");
    console.log("!!! Updated Booking Details !!!");
    console.log(updatedBooking);

    const partialUpdated = await authBookingClient.partialUpdate(bookingID, partialUpdateData);
    expect(partialUpdated.depositpaid).toBe(false);
    console.log("!!! Partially Updated Booking !!!");
    console.log(partialUpdated);


    const bookingIDs = await plainBookingClient.getBookingID();
    console.log("!!! Booking ID's !!!");
    console.log(bookingIDs);

    const bookingDeleted = await authBookingClient.deleteBooking(bookingID);
    expect(bookingDeleted.status()).toBe(201);

    const getBookingDetailsAgain = await authBookingClient.getBookingDetails(bookingID);
    expect(getBookingDetailsAgain.status()).toBe(404);
})

test('Negative Tests', async({request, authenticatedRequest}) => {
    const plainBookingClient = new bookingClient(request);
    const authBookingClient = new bookingClient(authenticatedRequest);

    const bookingCreated = await plainBookingClient.createBooking(bookingData);
    const bookingIDResponse = await bookingCreated.json();
    const bookingID = bookingIDResponse.bookingid;

    const bookingNotCreated = await plainBookingClient.createBooking(negativeBookingData);
    expect(bookingNotCreated.status()).toBe(500);

    const bookingNotUpdated = await plainBookingClient.updateBooking(bookingID, updateBookingData);
    expect(bookingNotUpdated.status()).toBe(403);
})