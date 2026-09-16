const bookingSchema = {
    type : "object",
    required : ["bookingID"],
    properties : {
        firstname : {type : "string"},
        lastname : {type : "string"},
        totalprice : {type : "number"},
        depositpaid : {type : "boolean"},
        bookingdates : {
            checkin : {type : "date"},
            checkout : {type : "date"}
        },
        additionalneeds : {type : "string"}
    }
}