const {getCategories, getCategoriesByFilter, getCategoryData, addCategory, deleteCategory} = require("../Utils/categoriesManager")
const { isUserAdmin, validateRequest } = require("../Utils/validator")
const {body} = require("express-validator")
const Router = require("express").Router()

Router.get("/", async (req, res) => {
    return res.json(await getCategories())
})

Router.get("/filter/:filter", async (req, res) => {
    return res.json(await getCategoriesByFilter(req.params.filter))
})
Router.get("/:id", async (req, res) => {
    return res.json(await getCategoryData(req.params.id))
})

Router.use(process.Session, isUserAdmin)

const validate = [
    body("name").isString().notEmpty().isLength({min: 3, max: 50}),
    body("filter").isString().notEmpty(),
    body("tag").isString().notEmpty()
]

Router.post("/", validate, validateRequest, async (req, res) => {
    const {name, filter, tag} = req.body
    await addCategory(name, tag, filter)
    res.json({success: true})
})

Router.delete("/:id", async (req, res) => {
    const id = req.params.id
    const deleted = await deleteCategory(id)
    res.json({success: deleted})
})



module.exports = {
    route: "categories",
    version: 1,
    exec: Router
}