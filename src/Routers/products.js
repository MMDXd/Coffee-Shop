const Router = require("express").Router()
const {getProducts, addProduct} = require("../Utils/productsManager")
const {body} = require("express-validator")
const path = require("path")
const multer = require('multer');
const mkdirp = require('mkdirp');
const { validateRequest, isUserAdmin } = require("../Utils/validator");


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
    body("categories").isArray().notEmpty(),
    body("type").isInt()
]


// Routes

Router.get("/", async (req, res) => {
    res.json(await getProducts(req.query.page))
})

Router.post("/", process.Session, upload.single("image"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next()
}, isUserAdmin, validate, validateRequest, async (req, res) => {
    const {name, price, categories, type} = req.body
    await addProduct(name, price, categories, `/images/products/${req.imagePath}`, type)
    res.json({success: true})
})

module.exports = {
    version: 1,
    route: "products",
    exec: Router
}