const { isUserLogin } = require("../Utils/auth")
const { getProductComments, createComment, deleteComment, deleteProductComments, getUserComments } = require("../Utils/commentManager")
const {body} = require("express-validator")
const { validateRequest, isUserAdmin } = require("../Utils/validator")
const Router = require("express").Router()

Router.get("/product/:id", async (req, res) => {
    const comments = getProductComments(req.params.id)
    return res.json(comments)
})

Router.use(process.Session, isUserLogin)

const validator = [
    body("title").isString().notEmpty().isLength({min: 5, max: 50}),
    body("description").isString().notEmpty().isLength({min: 10, max: 400}),
    body("stars").isInt({min: 1, max: 5}).notEmpty()
]

Router.post("/product/:id", validator, validateRequest, async (req, res, next) => {
    const {title, description, stars} = req.body
    const comment = await createComment(req.params.id, req.session._id, title, description, stars)
    if (!comment.success) {
        res.status(400).json(comment)
    }
    res.json({success: true})
})

Router.delete("/:id", isUserAdmin, async (req, res) => {
    const deleted = await deleteComment(req.params.id)
    res.json({success: deleted})
})

Router.delete("/product/:id", isUserAdmin, async (req, res) => {
    const deleted = await deleteProductComments(req.params.id)
    res.json({success: deleted})
})

Router.get("/user/:id", isUserAdmin, async (req, res) => {
    const comments = await getUserComments(req.params.id)
    res.json(comments)
})


module.exports = {
    route: "comments",
    version: 1.0,
    exec: Router
}
