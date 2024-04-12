const {getCategories, getCategoriesByType, getCategoryData} = require("../Utils/categoriesManager")
const Router = require("express").Router()

Router.get("/", async (req, res) => {
    return res.json(await getCategories())
})

Router.get("/type/:type", async (req, res) => {
    return res.json(await getCategoriesByType(req.params.type))
})
Router.get("/:id", async (req, res) => {
    return res.json(await getCategoryData(req.params.id))
})



module.exports = {
    route: "categories",
    version: 1,
    exec: Router
}