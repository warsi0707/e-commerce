require('dotenv').config()

const express = require('express')
const { userRouter } = require('./routes/user')
const { adminRouter } = require('./routes/admin')
const { default: mongoose } = require('mongoose')
const { productRouter } = require('./routes/product')
const app = express()
const cors = require('cors')


app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use("/api/v1/user", userRouter)
app.use("/api/v1/admin",adminRouter)
app.use("/api/v1/product",productRouter)

const Main =async()=>{
    app.listen(3000)
    console.log('Server is running on port 3000')
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB')
}
Main()