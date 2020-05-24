// Routes
const express = require("express");
const router = express.Router();
const mkdirp = require("mkdirp");
const fs = require("fs-extra");
const resizeImg = require("resize-img")
var Products = require("../models/products");
var Category = require("../models/category");

/**
 * GET products index
 */
router.get("/", (req, res) => {

    var count;
    Products.count((err, numberProduct) => {
        count = numberProduct;
    });
    Products.find((err, products) => {
        res.render("admin/products", {
            products: products,
            count: count
        })

    });
});


/**
 * GET add Product
 */
router.get("/add-product", (req, res) => {

    let title = "";
    let desc = "";
    let price = "";


    Category.find((err, cats) => {
        res.render("admin/add_product", {
            title: title,
            desc: desc,
            categories: cats,
            price: price,
        });
    })
})

/**
 * POST add product
 */
router.post("/add-product", (req, res) => {
    var imageFile = typeof req.files.image !== "undefined" ? req.files.image.name : "";

    //save to DB  
    var productDB = new Products({
        title: req.body.title,
        slug: req.body.title,
        desc: req.body.desc,
        price: parseFloat(req.body.price).toFixed(2),
        category: req.body.category,
        image: imageFile
    });



    productDB.save(err => {
        if (err) return console.log(err);
        req.flash("success", "Product added!");
        res.redirect("/admin/products");
    })

})


/**
 * POST reoder page 
 */
router.post("/reorder-pages", (req, res) => {
    var ids = req.body['id[]'];

    /*loop the ids and change the sorting*/
    var count = 0;

    for (let i = 0; i < ids.length; i++) {
        var id = ids[i];
        count++;

        saveSorting(count);
        function saveSorting(value) {
            Page.findById(id).exec((err, page) => {
                page.sorting = value;
                page.save(err => {
                    if (err) return console.log(`Error bei POST reorder page ${err}`);
                });
            })
        };
    }
});


/**
 * GET edit page
 */
router.get("/edit-page/:slug", (req, res) => {

    Page.findOne({ slug: req.params.slug }, (err, page) => {
        if (err) return console.log(`Get edit page error ${err}`);

        res.render("admin/edit_page", {
            title: page.title,
            slug: page.slug,
            content: page.content,
            id: page._id
        });
    })

})


/**
 * POST edit page
router.post("/edit-page/:slug", (req, res) => {

    Page.findOne({ slug: req.params.slug }, (err, page) => {
        if (page) {
            req.flash("danger", "Page already exists.");
            res.render("admin/add_page", {
                title: page.title,
                slug: page.slug,
                content: page.content,
                id: page._id
            });
        } else {
            //   save to DB  
            var pageDB = new Page({
                title: req.body.title[0],
                slug: req.body.slug,
                content: req.body.title[1],
                sorting: 100
            });

            pageDB.save((err) => {
                if (err) return console.log(err);
                req.flash("success", "Page added!");
                res.redirect("/admin/pages");
            })
        }  
})  
*/


/**
 * Delete Product
 */
router.get("/delete-product/:id", (req, res) => {
    Products.findByIdAndRemove(req.params.id, (err) => {
        if (err) return console.log(err);
        req.flash("success", "Product deleted!")
        res.redirect("/admin/products")
    })
})


module.exports = router;