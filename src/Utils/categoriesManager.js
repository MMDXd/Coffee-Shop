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
 * @param {Number} filter 
 * @returns {Promise<Array>}
 */
const getCategoriesByFilter = async (filter) => {
    return await category.find({filter})
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
 * @param {Number} filter 
 * @returns {Promise<void>}
 */
const addCategory = async (name, tag, filter) => {
    const newCategory = new category({name, tag, filter})
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
    getCategoriesByFilter,
    getCategoryData,
    addCategory,
    deleteCategory
}