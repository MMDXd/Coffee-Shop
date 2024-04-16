const {Schema, models, model} = require("mongoose")

const categorySchema = new Schema({
    name: String,
    filter: String,
    tag: String
})

const category = models.category || model("category", categorySchema)

module.exports = {category}