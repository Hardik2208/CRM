const express = require('express')
const Order = require('../models/Order')
const router = express.Router()

router.post('/order', async(req,res)=>{
    
    const newOrder = new Order(req.body)
    const allOrders = await Order.find()
    newOrder["orderNumber"] = allOrders.length + 1
    await newOrder.save()
    res.send('Order Generated Successfully!')
})

router.get('/order',async(req,res)=>{
    const allOrder= await Order.find()
    res.send(allOrder)
})

module.exports = router
