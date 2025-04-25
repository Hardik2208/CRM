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

router.delete('/product',async (req, res)=>{
    await Product.findByIdAndDelete(req.params.id)
    res.send('Enquiry Deleted Successfully')
})


module.exports = router