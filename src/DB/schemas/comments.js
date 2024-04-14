const {Schema, models, model, SchemaTypes} = require("mongoose")

const commentSchema = new Schema({
    title: String,
    description: String,
    author: SchemaTypes.ObjectId,
    product: SchemaTypes.ObjectId,
    stars: Number
})

const comment = models.comment || model("comment", commentSchema)

module.exports = {comment}