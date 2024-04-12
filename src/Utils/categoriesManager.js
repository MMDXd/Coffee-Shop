const {category} = require("../DB/schemas/categories")

/**
 * 
 * @returns {Promise<Array>}
 */
const getCategories = async () => {
    return await category.find()
}

/**
 * 
 * @param {Number} type 
 * @returns {Promise<Array>}
 */
const getCategoriesByType = async (type) => {
    return await category.find({type})
}

/**
 * 
 * @param {import("mongoose").ObjectId} id
 * @returns {Promise<Object>} 
 */
const getCategoryData = async (id) => {
    return await category.findById(id)
}

/**
 * 
 * @param {String} name 
 * @param {String} tag 
 * @param {Number} type 
 * @returns {Promise<void>}
 */
const addCategory = async (name, tag, type) => {
    const newCategory = new category({name, tag, type})
    await newCategory.save()
}

/**
 * 
 * @param {import("mongoose").ObjectId} id
 * @returns {Promise<Boolean>} 
 */
const deleteCategory = async (id) => {
    const deleted = await category.deleteOne({_id: id})
    return deleted.deletedCount == 1
}

module.exports = {
    getCategories,
    getCategoriesByType,
    getCategoryData,
    addCategory,
    deleteCategory
}