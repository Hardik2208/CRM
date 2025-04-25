const mongoose = require('mongoose')

const EnquirySchema = new mongoose.Schema({
    name: String,
    phoneNumber : Number,
    category: String,
    productName : String,
    dateOfEnquriy: Date,
    email: String

})

module.exports = mongoose.model("Enquiry", EnquirySchema)