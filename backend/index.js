require('dotenv').config()

const express = require('express')
const { userRouter } = require('./routes/user')
const { adminRouter } = require('./routes/admin')
const { default: mongoose } = require('mongoose')
const { productRouter } = require('./routes/product')
const app = express()
const path = require('path')
const cors = require('cors')
const { FRONTEND_URL } = require('./config')


app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.static(path.join(__dirname,"frontend","dist")))

app.get("/", (req, res) => {
    res.send("Hello world")
})
app.use("/api/v1/user", userRouter)
app.use("/api/v1/admin",adminRouter)
app.use("/api/v1/product",productRouter)

app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend','dist', 'index.html'))
})

const Main =async()=>{
    app.listen(3000)
    console.log('Server is running on port 3000')
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB')
}
Main()