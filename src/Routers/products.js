const Router = require("express").Router()
const {getProducts, addProduct, editProduct, getProductById, editProductImagePath, deleteProduct} = require("../Utils/productsManager")
const {body} = require("express-validator")
const path = require("path")
const multer = require('multer');
const mkdirp = require('mkdirp');
const { validateRequest, isUserAdmin } = require("../Utils/validator");
const { unlinkSync } = require("fs");


const diskStorage = multer.diskStorage({

    destination:function(req,file,cb){

        const dest = path.join(process.cwd(),'/images/products');

        mkdirp(dest,function(err){
            if(err) cb(err,dest);
            else cb(null,dest);
        });
    },
    filename:function(req,file,cb){
        const ext = path.extname(file.originalname);
        const file_name = Date.now()+ext;
        obj.file_name = file_name;
        cb(null,file_name);
    }
});
const upload = multer({storage:diskStorage});


const validate = [
    body("name").isString().notEmpty(),
    body("price").isInt(),
    body("categories").isArray(),
    body("type").isInt(),
    body("weight").isInt(),
]


// Routes

Router.get("/", async (req, res) => {
    res.json(await getProducts())
})

Router.post("/", process.Session, isUserAdmin, upload.single("image"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next()
}, validate, validateRequest, async (req, res) => {
    const {name, price, categories, type, weight} = req.body
    await addProduct(name, price, categories, `/images/products/${req.imagePath}`, type, weight)
    res.json({success: true})
})

Router.put("/:id", process.Session, isUserAdmin, validate, validateRequest, async (req, res) => {
    const {name, price, categories, type} = req.body
    const id = req.params.id
    const edited = await editProduct(id, name, price, categories, type, weight)
    res.json({success: edited})
})

Router.put("/:id/image", process.Session, isUserAdmin, async (req, res, next) => {
    if (!req.file && !req.files) return res.status(400).json({success: false, error: "image not found"})
    const product = await getProductById(req.params.id)
    if (!product) return res.status(404).json({success: false, error: "Product not found"})
    unlinkSync(path.join(process.cwd(), `/images/products/${product.imagePath}`))
    next()
}, upload.single("image"), async (req, res) => {
    const id = req.params.id
    const edited = await editProductImagePath(id, `/images/products/${req.imagePath}`)
    res.json({success: edited})
})

Router.delete("/:id", process.Session, isUserAdmin, async (req, res) => {
    const id = req.params.id
    const product = await getProductById(id)
    if (!product) return res.status(404).json({success: false, error: "Product not found"})
    unlinkSync(path.join(process.cwd(), `/images/products/${product.imagePath}`))
    const deleted = await deleteProduct(id)
    res.json({success: deleted})
})

module.exports = {
    version: 1,
    route: "products",
    exec: Router
}