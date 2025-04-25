const express = require('express')
const Enquiry = require('../models/Enquiry')
const router = express.Router() 

router.post('/enquiry', (req, res)=>{
    const newEnquiry = new Enquiry(req.body)
    newEnquiry.save()
    res.send('Enquiry Added Successfully!')
})

router.get('/enquiry', async(req, res)=>{
    const allEnquiries = await Enquiry.find()
    res.send(allEnquiries)
})

router.delete('/enquiry/:id', async(req, res)=>{
    await Enquiry.findByIdAndDelete(req.params.id)
    res.send('Enquiry Deleted SUccessfully')
})

router.put('/enquiry/:id', async(req, res)=>{
    await Enquiry.findByIdAndUpdate(req.params.id, req.body)
    res.send('Enquiry Updated SUccessfully')
})

module.exports = router