const Router = require('express')
const { User, Category, Product } = require('../model/DB.')
const adminRouter = Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { AdminAuthMiddle } = require('../middleware/AdminAuthMiddle')

adminRouter.post("/signup", async(req, res) =>{
    const { email, name, password, adminsecret } = req.body

    try{
        const existingAdmin = await User.findOne({ email })
        if(existingAdmin){
            return res.status(400).json({
                message: "Admin already exists",
            })
        }
        if(adminsecret !== process.env.ADMIN_SECRET){
            return res.status(403).json({
                message: "Forbidden",
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newAdmin = await User.create({
            email,
            name,
            password: hashPassword,
            role: 'admin'
        })
        return res.status(201).json({
            message: "Admin created successfully",
        })
    }catch(error){
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })
    }
})

adminRouter.post("/signin", async(req, res)=>{
    const { email, password } = req.body;

    try{
        const finduser = await User.findOne({ email })
        console.log(finduser)
        if(!finduser){
            return res.status(404).json({
                message: "User not found",
            })
        }
        const verifyPassword =finduser?await bcrypt.compare(password, finduser.password): false
        if(!verifyPassword){
            return res.status(401).json({
                message: "Invalid credentials",
            })
        }
        if(finduser.role !== 'admin'){
            return res.status(403).json({
                message: "Forbidden",
            })
        }
        const token = jwt.sign({
            adminId: finduser._id,
            role: finduser.role,
        },process.env.JWT_SECRET)
        return res.json({
            token: token,
            role: finduser.role,
            message: "Login successful",
        })

    }catch(error){
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })
    }
})
adminRouter.get("/auth", AdminAuthMiddle, async(req, res) =>{
    const { id, role } = req.user
    return res.status(200).json({
        message: "Authenticated",
        user: { id, role }
    })
})
//category creation
adminRouter.post("/category",AdminAuthMiddle, async(req, res) =>{
    const {name} = req.body;
    try{
        const existingCategory = await Category.findOne({ name })
        if(existingCategory){
            return res.status(400).json({
                message: "Category already exists",
            })
        }
        const newCategory = await Category.create({ name })
        return res.status(201).json({
            message: "Category created successfully",
            category: newCategory,
        })
    }catch(error){
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })
    }
})
adminRouter.get("/category", AdminAuthMiddle, async(req, res) =>{
    try{
        const categories = await Category.find()
        return res.status(200).json({
            categories: categories,
        })
    }catch(error){
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })
    }
})

// Product creation
adminRouter.post("/product", AdminAuthMiddle, async(req, res) =>{
    const { id } = req.user
    const {name, description, price, image, category, stock} = req.body
    try{
        // const findCategory = await Category.findOne({name: category})
        // // console.log(findCategory._id)
        // if(!findCategory){
        //     return res.status(400).json({
        //         message: "Category not found",
        //     })
        // }
        //category not added to product
        // const categoryId = findCategory._id
        const newProduct = await Product.create({
            name,
            description,
            price,
            image,
            category,
            stock,
            user: id,
        })
        return res.status(201).json({
            message: "Product created successfully",
            product: newProduct,
        })
    }catch(error){
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })
    }
})
adminRouter.get("/product", AdminAuthMiddle, async(req, res)=>{
    const { id } = req.user
    try{
        //once category added to product, it will be populated in the response
        const products = await Product.find({ user: id }).populate('user', 'name')
        return res.status(200).json({
            products: products,
        })
    }catch(error){
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })
    }
})
adminRouter.get("/product/:id", AdminAuthMiddle, async(req, res) =>{
    const { id } = req.user
    const { id: productId } = req.params
    try{
        const findProduct = await Product.findOne({ _id: productId, user: id }).populate('user', 'name')
        if(!findProduct){
            return res.status(404).json({
                message: "Product not found",
            })
        }
        return res.status(200).json({
            product: findProduct,
        })
    }catch(error){
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })
    }
})
adminRouter.put("/product/:id", AdminAuthMiddle, async(req, res) =>{
    const { id } = req.user
    const { name, description, price, image, category, stock } = req.body
    const { id: productId } = req.params
    try{
        const findProduct = await Product.findOne({ _id: productId, user: id })
        if(!findProduct){
            return res.status(404).json({
                message: "Product not found",
            })
        }
        const updatedProduct = await Product.findByIdAndUpdate(productId, {
            name,
            description,
            price,
            image,
            category,
            stock,
        }, { new: true })
        return res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct,
        })
    }catch(error){
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })
    }
 }
)
adminRouter.delete("/product/:id", AdminAuthMiddle, async(req, res) =>{
    const { id } = req.user
    const { id: productId } = req.params
    try{
        const findProduct = await Product.findOne({ _id: productId, user: id })
        if(!findProduct){
            return res.status(404).json({
                message: "Product not found",
            })
        }
        await Product.findByIdAndDelete(productId)
        return res.status(200).json({
            message: "Product deleted successfully",
        })
    }catch(error){
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })
    }
})
// add stock to product
adminRouter.post("/product/:id/stock", AdminAuthMiddle, async(req, res) =>{
    
    const { id } = req.user
    const { id: productId } = req.params
    const { stock } = req.body
    try{
        const findProduct = await Product.findOne({ _id: productId, user: id })
        if(!findProduct){
            return res.status(404).json({
                message: "Product not found",
            })
        }
        findProduct.stock = stock
        await findProduct.save()
        return res.status(200).json({
            message: "Stock updated successfully",
        })
    }catch(error){
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })
    }
})
module.exports = {
    adminRouter
}