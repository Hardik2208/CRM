const express = require('express')
const Customer = require('../models/Customer')
const router = express.Router() 

router.post('/Customer', (req, res)=>{
    const newCustomer = new Customer(req.body)
    newCustomer.save()
    res.send('Customer Added Successfully!')
})

router.get('/Customer', async(req, res)=>{
    const allEnquiries = await Customer.find()
    res.send(allEnquiries)
})

router.delete('/Customer/:id', async(req, res)=>{
    await Customer.findByIdAndDelete(req.params.id)
    res.send('Customer Deleted Successfully')
})

router.put('/Customer/:id', async(req, res)=>{
    await Customer.findByIdAndUpdate(req.params.id, req.body)
    res.send('Customer Updated Successfully')
})

router.put('/Customer/Reassign/:id', async(req, res)=>{
    let assignedCustomer = await Customer.findOne({phoneNumber: req.body.assignedNumber})
    if(!assignedCustomer){
        return res.status(404).send("User Not Found")
    }
    let customer = await Customer.findById(req.params.id)

    assignedCustomer.orderList = [...assignedCustomer.orderList, ...customer.orderList.filter((i)=>i.orderNumber == req.body.orderNumber)]


    customer.orderList = customer.orderList.filter((i)=>i.orderNumber != req.body.orderNumber)

    
    await customer.save()

    await assignedCustomer.save()

})

module.exports = router