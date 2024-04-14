const { comment } = require("../DB/schemas/comments");
const { getUserDataById } = require("./auth");
const { getProductById } = require("./productsManager");
const {ObjectId} = require("mongoose").SchemaTypes

/**
 * 
 * @param {ObjectId} productId
 * @returns {Promise<Array>}
 */
const getProductComments = async (productId) => {
    return comment.find({product: productId})
}

/**
 * 
 * @param {ObjectId} userId
 * @returns {Promise<Array>}
 */
const getUserComments = async (userId) => {
    return comment.find({author: userId})
}

/**
 * 
 * @param {ObjectId} commentId
 * @returns {Promise<Boolean>}
 */
const deleteComment = async (commentId) => {
    const deleted = await comment.deleteOne({_id: commentId})
    return deleted.deletedCount == 1
}

/**
 * 
 * @param {ObjectId} userId 
 * @returns {Promise<Number>}
 */
const deleteUserComments = async (userId) => {
    const deleted = await comment.deleteMany({author: userId})
    return deleted.deletedCount
}

/**
 * 
 * @param {ObjectId} productId 
 * @returns {Promise<Number>}
 */
const deleteProductComments = async (productId) => {
    const deleted = await comment.deleteMany({product: productId})
    return deleted.deletedCount
}

/**
 * 
 * @param {ObjectId} productId 
 * @param {ObjectId} authorId 
 * @param {String} title 
 * @param {String} description 
 * @param {Number} stars 
 * @returns {Promise<{success: Boolean, error?:String}>}
 */
const createComment = async (productId, authorId, title, description, stars) => {
    const user = await getUserDataById(authorId)
    if (!user.valid) return {success: false, error: "User not found"}
    const product = await getProductById(productId)
    if (!product) return {success: false, error: "Product not found"}

    const newComment = new comment({product: productId, author: authorId, title, description, stars})
    await newComment.save()
    return {success: true}
}


module.exports = {
    createComment,
    deleteComment,
    deleteUserComments,
    deleteProductComments,
    getProductComments,
    getUserComments
}