const express = require('express')
const Staff = require('../models/Staff')
const router = express.Router() 

router.post('/staff', (req, res)=>{
    const newStaff = new Staff(req.body)
    newStaff.save()
    res.send('Staff Added Successfully!')
})

router.get('/staff', async(req, res)=>{
    const allEnquiries = await Staff.find()
    res.send(allEnquiries)
})

router.delete('/staff/:id', async(req, res)=>{
    await Staff.findByIdAndDelete(req.params.id)
    res.send('Staff Deleted Successfully')
})

router.put('/staff/:id', async(req, res)=>{
    await Staff.findByIdAndUpdate(req.params.id, req.body)
    res.send('Staff Updated Successfully')
})

module.exports = router