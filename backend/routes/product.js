const Router = require('express')
const productRouter = Router()
const {Product} = require('../model/DB.')

productRouter.get("/", async (req, res) => {
    try{
        const products = await Product.find({})
        res.status(200).json({
            products: products
        })
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
})
productRouter.get("/latest", async (req, res) => {
    try{
        const products = await Product.find({}).sort({createdAt: -1}).limit(3)
        res.status(200).json({
            products: products
        })
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
})
productRouter.get("/weekly", async (req, res) => {
    try{
        const products = await Product.find({}).sort({createdAt: -1}).limit(6)
        res.status(200).json({
            products: products
        })
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
})
productRouter.get("/:id", async (req, res)=>{
    const { id } = req.params
    try{
        const product = await Product.findById(id)
        if(!product){
            return res.status(404).json({
                message: "Product not found"
            })
        }
        res.status(200).json({
            product: product
        })
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
})

module.exports = {
    productRouter
}