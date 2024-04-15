const express = require("express")
const app = express()
const path = require("path")
const session = require("express-session")
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const { LoadRouters } = require("./src/Utils/routerApiLoader");
const cors = require("cors");
// Middlewares
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: function (req, callback) {
        callback(null, { origin: true })
    }      
}));
app.use(express.urlencoded({extended: true}))
app.use("/images", express.static(path.join(__dirname, "/images")))

// initialize database
require("./src/DB")

// session
const Session = process.Session = session({
    secret: "Yummy",
    cookie: {maxAge: (24 * (60 * (60 * 1000)))},
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        collectionName: "sessions",
        stringify: false,
        autoRemove: "interval",
        autoRemoveInterval: 1,
    })
})


// load routers
LoadRouters(app, path.join(__dirname, "/src/Routers"), Session)


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("listening on port " + port);
})