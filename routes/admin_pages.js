// Routes
const express = require("express");
const router = express.Router();
var Page = require("../models/page");
/**
 * GET pages index
 */
router.get("/", (req, res) => {
    Page.find({}).sort({ sorting: 1 }).exec((err, pages) => {
        res.render("admin/pages", {
            pages: pages
        })
    })
});


/**
 * GET add page
 */
router.get("/add-page", (req, res) => {

    let title = "";
    let slug = "";
    let content = "";

    res.render("admin/add_page", {
        title: title,
        slug: slug,
        content: content
    });

})

/**
 * POST add page
 */
router.post("/add-page", (req, res) => {
    //save to DB  
    var pageDB = new Page({
        title: req.body.title[0],
        slug: req.body.title[1],
        content: req.body.title[2],
        sorting: 100
    });

    //  if (req.body.title[0] == "" || req.body.title[1] == "" || req.body.title[0] == "") {
    //      res.redirect("/admin/pages");
    // } else {
    pageDB.save((err) => {
        if (err) return console.log(err);
        res.redirect("/admin/pages");
    });
    // }
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


module.exports = router;