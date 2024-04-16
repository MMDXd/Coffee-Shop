const { product } = require("../DB/schemas/products");
const { deleteProductComments } = require("./commentManager");
const obj = product.schema.obj


/**
 * 
 * @returns {Promise<Array<obj>>}
 */
const getProducts = async () => {
    return await product.find()
}

/**
 * 
 * @param {import("mongoose").ObjectId} id 
 * @returns {Promise<obj>}
 */
const getProductById = async (id) => {
    return await product.findById(id)
}

/**
 * 
 * @param {import("mongoose").ObjectId} id 
 * @param {Number} price 
 * @returns {Promise<Boolean>}
 */
const editProductPrice = async (id, price) => {
    const updated = await product.updateOne({_id: id}, {price})
    return updated.modifiedCount == 1
}

/**
 * 
 * @param {String} name 
 * @param {Number} price 
 * @param {Array} categories 
 * @param {String} imagePath 
 * @param {Number} filter
 * @param {Number} weight
 * @returns {Promise<void>} 
 */
const addProduct = async (name, price, categories, imagePath, filter, weight) => {
    const newProduct = new product({name, price, categories, imagePath, filter, weight})
    await newProduct.save()
}

/**
 * 
 * @param {import("mongoose").ObjectId} id 
 * @param {String} name 
 * @param {Number} price 
 * @param {Array} categories 
 * @param {Number} filter
 * @param {Number} weight
 * @returns {Promise<Boolean>} 
 */
const editProduct = async (id, name, price, categories, filter, weight) => {
    const updated = await product.updateOne({_id: id}, {name, price, categories, filter, weight})
    return updated.modifiedCount == 1
}
/**
 * 
 * @param {import("mongoose").ObjectId} id 
 * @param {String} imagePath
 * @returns {Promise<Boolean>} 
 */
const editProductImagePath = async (id, imagePath) => {
    const updated = await product.updateOne({_id: id}, {imagePath})
    return updated.modifiedCount == 1
}

/**
 * 
 * @param {import("mongoose").ObjectId} id 
 * @returns {Promise<Boolean>}
 */
const deleteProduct = async (id) => {
    const deleted = await product.deleteOne({_id: id})
    deleteProductComments(id)
    return deleted.deletedCount == 1
}



module.exports = {
    getProducts,
    getProductById,
    editProductPrice,
    editProduct,
    editProductImagePath,
    addProduct,
    deleteProduct
}