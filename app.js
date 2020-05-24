const express = require("express");
const path = require("path");
const db = require("mongoose");
const config = require("./config/database");
const bodyParser = require("body-parser");
const session = require('express-session');
const expressValidator = require("express-validator");

const fileUpload = require("express-fileupload");

//init APP
let app = express();


// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Express Session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
    //  cookie: { secure: true }
}))

// Express Validator middleware
/*app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));
*/

// express messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// expree fileupload middleware
app.use(fileUpload());

// connect to DB
db.connect(process.env.MONGODB_ECOMMERCE || config.database,
    { useNewUrlParser: true }, () => {
        console.log("DB Connected...")
    })


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set public folder
app.use(express.static(path.join(__dirname, "public")));


//set routes//
const pages = require("./routes/pages.js");
app.use("/", pages);

const adminPages = require("./routes/admin_pages.js")
app.use("/admin/pages", adminPages);

const adminCategory = require("./routes/admin_categories")
app.use("/admin/categories", adminCategory);

const adminProducts =  require("./routes/admin_products")
app.use("/admin/products", adminProducts);


port = 5000;
app.listen(process.env.PORT || port, () => {

    console.log("Server running on port", port);

})

