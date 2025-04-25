const express = require('express')
const connectDB = require('./db')
const cors = require('cors')

const server = express()
server.use(express.json())
server.use(cors())
server.use('/api', require('./routes/enquiryRoutes'))
server.use('/api', require('./routes/productRoutes'))
server.use('/api', require('./routes/orderRoutes'))

connectDB()



server.listen(5001, ()=>{
    console.log(`server running at localhost:5001`)
})