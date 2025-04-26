const express = require('express')
const Product = require('../models/Product')
const router = express.Router() 

router.post('/product', (req, res)=>{
    console.log(req.body)
    const newEnquiry = new Product(req.body)
    newEnquiry.save()
    res.send('Product Added Successfully!')
})

router.get('/product', async(req, res)=>{
    const allProduct = await Product.find()
    res.send(allProduct)
})

router.put('/product/:id', async(req, res)=>{
    await Product.findByIdAndUpdate(req.params.id, req.body)
    res.send('Product Updated Sccessfully')
    
})


module.exports = router