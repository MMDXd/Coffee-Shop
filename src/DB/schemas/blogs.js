const {Schema, models, model} = require("mongoose")

const blogSchema = new Schema({
    title: String,
    content: String,
    thumbnailPath: String,
    imagePath: String,
    postedDate: Date
})

const blog = models.blog || model("blog", blogSchema)

module.exports = {blog}