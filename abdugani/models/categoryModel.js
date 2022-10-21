import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default:Date.now
    },
    Product:[{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
})

const Category = mongoose.model("Category", categorySchema)

export default Category;