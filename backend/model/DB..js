const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: String,
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
    },
    role : {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    address : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
    }],
    products : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }],


    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
})

const AddressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    address: String,
    city: String,
    state: String,
    country: String,
    pincode: String,
})

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String,
    stock: Number,
    catagory : String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
 })
const CategorySchema = new mongoose.Schema({
    name: String,
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }]
})

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        quantity: Number,
    }],
    totalPrice: Number,
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
 })



const User = mongoose.model('User', UserSchema)
const Address = mongoose.model('Address', AddressSchema)
const Product = mongoose.model('Product', ProductSchema)
const Order = mongoose.model('Order', OrderSchema)
const Category = mongoose.model('Category', CategorySchema)


module.exports = {
    User,
    Address,
    Product,
    Order,
    Category
}
 
