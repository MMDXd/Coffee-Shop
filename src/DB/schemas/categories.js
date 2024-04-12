const {Schema, models, model} = require("mongoose")

const categorySchema = new Schema({
    name: String,
    type: Number,
    tag: String
})

const category = models.category || model("category", categorySchema)

module.exports = {category}