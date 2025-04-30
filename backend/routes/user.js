const Router =require('express')
const userRouter = Router()
const bcrypt = require('bcrypt')
const { User, Cart, Address, Order } = require('../model/DB.')
const jwt = require('jsonwebtoken')
const { JWT_USER_SECRET } = require('../config')
const { UserAuthMiddleware } = require('../middleware/UserAuthMiddleware')

userRouter.post("/signup", async(req, res) =>{ 
    const { email, name, password } = req.body

    try{
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            email,
            name,
            password: hashPassword,
        })
        res.status(201).json({ 
            message: "User created successfully", 
        })
    }catch(error){
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })
    }
})
userRouter.post("/signin", async(req, res)=>{ 
    const { email, password } = req.body;
    
    try {
        const  existingUser = await User.findOne({ email })
        if(!existingUser){
            return res.status(404).json({
                message: "User not found",
            })
        }
        const isPasswordValid =existingUser? await bcrypt.compare(password, existingUser.password):false

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password",
            })
        }
        const token = jwt.sign({
            userId: existingUser._id,
        }, JWT_USER_SECRET)
        return res.status(200).json({
            message: "Sign in successful",
           token: token,
        })
    }catch(error){
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })
    }
}) 

userRouter.get("/auth", UserAuthMiddleware, async(req, res) => {
    const { userId } = req.user
    try{
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({
                authenticated: false,
                message: "User not found",
            })
        }
        return res.status(200).json({
            message: "User authenticated",
            authenticated: true,
        })
    }catch(error){
        return res.status(500).json({
            authenticated: false,
            message: "Internal server error",
            error: error.message,
        })
    }
})
//profile
userRouter.get("/profile", UserAuthMiddleware, async(req, res)=>{
    const { userId } = req.user
    try{
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({
                message: "User not found",
            })
        }       
        return res.status(200).json({
            user: {
                email: user.email,
                name: user.name,
                mobile: user.mobile,
            }
        })
    }catch(error){
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })
    }
})
// name update
userRouter.put("/profile/name", UserAuthMiddleware, async(req, res)=>{  
    const { userId } = req.user
    const { names } = req.body
    try{
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({
                message: "User not found",
            })
        }
        const updatedUser = await User.findByIdAndUpdate(userId, { name: names })
        return res.status(200).json({
            message: "Name updated successfully",
        })
    }catch(error){
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })
    }
})
// email update
userRouter.put("/profile/email", UserAuthMiddleware, async(req, res)=>{  
    const { userId } = req.user
    const { email } = req.body
    try{
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({
                message: "User not found",
            })
        }
        const updatedUser = await User.findByIdAndUpdate(userId, { email: email })
        return res.status(200).json({
            message: "Email updated successfully"
        })
    }catch(error){
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })
    }
})
userRouter.put("/profile/mobile", UserAuthMiddleware, async(req, res)=>{  
    const { userId } = req.user
    const { mobile } = req.body
    try{
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({
                message: "User not found",
            })
        }
        const updatedUser = await User.findByIdAndUpdate(userId, { mobile: mobile })
        return res.status(200).json({
            message: "Mobile number updated successfully"
        })
    }catch(error){
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })
    }
})
userRouter.put("/profile/password", UserAuthMiddleware, async(req, res)=>{  
    const { userId } = req.user
    const {oldpassword, password, confirmPassword } = req.body
    try{
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({
                message: "User not found",
            })
        }
        const isPasswordValid = await bcrypt.compare(oldpassword, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Old password is incorrect",
            })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match",
            })
        }
        const updatedUser = await User.findByIdAndUpdate(userId,{
            password: await bcrypt.hash(password, 10)
        })
        return res.status(200).json({
            message: "Password updated successfully"
        })
    }catch(error){
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })
    }
})

//address
userRouter.post("/address", UserAuthMiddleware, async(req, res)=>{  
    const { userId } = req.user
    const { address, city, state, country, pincode } = req.body
    
    try{
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({
                message: "User not found",
            })
        }
        const newAddress = await Address.create({
            user: userId,
            address,
            city,
            state,
            country,
            pincode,
        })
        return res.status(200).json({
            message: "Address updated successfully",
        })
    }catch(error){
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })
    }
})
userRouter.get("/address", UserAuthMiddleware, async(req, res)=>{
    const { userId } = req.user
    try{
        const   address = await Address.find({ user: userId })
        if(!address){
            return res.status(404).json({
                message: "Address not found",
            })
        }
        return res.status(200).json({
            address: address,
        })
    }catch(error){
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })
    }
})
userRouter.put("/address/:id", UserAuthMiddleware, async(req, res)=>{
    const { userId } = req.user
    const { id } = req.params
    const { address, city, state, country, pincode } = req.body
    
    try{
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({
                message: "User not found",
            })
        }
        const updatedAddress = await Address.findByIdAndUpdate(id, {
            address,
            city,
            state,
            country,
            pincode,
        })
        return res.status(200).json({
            message: "Address updated successfully",
        })
    }catch(error){
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })
    }
})
userRouter.delete("/address/:id", UserAuthMiddleware, async(req, res)=>{
    const { userId } = req.user
    const { id } = req.params
    
    try{
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({
                message: "User not found",
            })
        }
        const deletedAddress = await Address.findByIdAndDelete(id)
        return res.status(200).json({
            message: "Address deleted successfully",
        })
    }catch(error){
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })
    }
})



//oreder

userRouter.post("/order", UserAuthMiddleware, async(req, res)=>{
    const { userId } = req.user
    const {product, total, addressId ,quantity} = req.body

    try{
        const address = await Address.find({_id:addressId})
        const addressIds = address.map((address) => address._id.toString())
        console.log("address", addressIds)
        if(!address){
            return res.status(404).json({
                message: "Address not found",
            })
        }
        const order = new Order ({
            user: userId,
            totalPrice: total,
            shippingAddress: addressId,
        })
        order.products.push({
            product: product,
            quantity:quantity
        })
        console.log("order", order)
        await order.save()
        console.log("order saved", order)
        if(!order){
            return res.status(404).json({
                message: "Order not found",
            })
        }
        return res.status(200).json({
            message: "Order placed successfully",
            order: order,
        })
    }catch(error){
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })
    }
})
userRouter.get("/order", UserAuthMiddleware,async(req,res)=>{
    const { userId } = req.user
    try{
        const orders = await Order.find({user: userId}).populate('products.product', 'name price image')
        if(!orders){
            return res.status(404).json({
                message: "No orders found",
            })
        }
        return res.status(200).json({
            orders: orders,
        })
    }catch(error){
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })
    }
})
module.exports = {
    userRouter
}