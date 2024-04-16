const { body } = require("express-validator")
const { getBlogs, getBlogById } = require("../Utils/blogManager")
const { isUserAdmin, validateRequest } = require("../Utils/validator")

const Router = require("express").Router()

Router.get("/", async (req, res) => {
    return res.json(await getBlogs())
})

Router.get("/:id", async (req, res) => {
    const blog = await getBlogById(req.params.id)
    if (!blog) return res.status(404).json({error: "Not Found"})
    return res.json(blog)
})

Router.use(process.Session, isUserAdmin)

const validate = [
    body("title").isString().notEmpty().isLength({min: 2}),
    body("content").isString().notEmpty().isLength({min: 20})
]

Router.post("/", validate, validateRequest, async (req, res) => {
    const {name, type, tag} = req.body
    await addCategory(name, tag, type)
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