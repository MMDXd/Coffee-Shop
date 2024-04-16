const {Schema, models, model} = require("mongoose")

const productSchema = new Schema({
    name: String,
    price: Number,
    categories: Array,
    imagePath: String,
    filter: String,
})

const product = models.product || model("product", productSchema)

module.exports = {product}