const { product } = require("../DB/schemas/products");
const obj = product.schema.obj


/**
 * 
 * @param {Number?} page
 * @description every page = 10x product
 * @returns {Promise<Array<obj>>}
 */
const getProducts = async (page = 1) => {
    return await product.find().skip((page-1) * 10).limit(10)
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
 * @param {Number} type
 * @returns {Promise<void>} 
 */
const addProduct = async (name, price, categories, imagePath, type) => {
    const newProduct = new product({name, price, categories, imagePath, type})
    await newProduct.save()
}

/**
 * 
 * @param {import("mongoose").ObjectId} id 
 * @returns {Promise<Boolean>}
 */
const deleteProduct = async (id) => {
    const deleted = await product.deleteOne({_id: id})
    return deleted.deletedCount == 1
}



module.exports = {
    getProducts,
    getProductById,
    editProductPrice,
    addProduct,
    deleteProduct
}