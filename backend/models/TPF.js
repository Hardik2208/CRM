const mongoose = require('mongoose')

const TPFSchema = new mongoose.Schema({
    downpayment: Number,
    numberOfEMI: Number,
    numberOfEMILeft: Number,
    amountOfEMI: Number,
    intrest: Number,
    fileCharge: Number,
    photo: File,
    guaranteerObject: Object,
    customerObject: Object,
    productObject: Object,
    upComingEMIDate: Date,
})

module.exports = mongoose.model("TPF", TPFSchema)