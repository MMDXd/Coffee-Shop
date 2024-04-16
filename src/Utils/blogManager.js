const { blog } = require("../DB/schemas/blogs");
const {ObjectId} = require("mongoose").SchemaTypes


class Blog {
    constructor() {
        /**
         * @type {ObjectId?}
         */
        this._id
        /**
         * @type {string}
         */
        this.title
        /**
         * @type {string}
         */
        this.content
        /**
         * @type {string}
         */
        this.thumbnailPath
        /**
         * @type {string}
         */
        this.imagePath
        /**
         * @type {Date}
         */
        this.postedDate
    }
}


/**
 * @returns {Promise<Array<Blog>>}
 */
const getBlogs = async () => {
    return await blog.find().sort("postedDate")
}

/**
 * 
 * @param {ObjectId} id
 * @returns {Promise<Blog>}
 */
const getBlogById = async (id) => {
    return await blog.findById(id)
}

/**
 * @param {Blog} blogClass
 * @returns {Promise<void>}
 */
const addBlog = async (blogClass) => {
    const newBlog = new blog({title: blogClass.title, content: blogClass.content, thumbnailPath: blogClass.thumbnailPath, imagePath: blogClass.imagePath, postedDate: blogClass.postedDate})
    return await newBlog.save()
}

/**
 * 
 * @param {ObjectId} id 
 * @returns {Promise<Boolean>}
 */
const deleteBlog = async (id) => {
    const deleted = await blog.deleteOne({_id: id})
    return deleted.deletedCount == 1
}

module.exports = {
    getBlogs,
    getBlogById,
    addBlog,
    deleteBlog
}