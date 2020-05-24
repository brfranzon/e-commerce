// Routes
const express = require("express");
const router = express.Router();
var Category = require("../models/category");
/**
 * GET Category index
 */
router.get("/", (req, res) => {
    Category.find().exec((err, cat) => {
        res.render("admin/categories", {
            categories: cat
        })
    })
});

/**
 * GET add Category
 */
router.get("/add-category", (req, res) => {

    let title = "";
    res.render("admin/add_category", {
        title: title
    });
})

/**
 * POST add Category
 */
router.post("/add-category", (req, res) => {
    //save to DB  
    var categoryDB = new Category({
        title: req.body.title,
        slug: req.body.title,
    });

    categoryDB.save((err) => {
        if (err) return console.log(err);
        req.flash("sucess", "Category Added!")
        res.redirect("/admin/categories");
    });
})

/**
 * GET edit Category
 */
router.get("/edit-category/:id", (req, res) => {

    Category.findById(req.params.id, (err, category) => {
        if (err) return console.log(`Get edit page error ${err}`);

        res.render("admin/edit_category", {
            title: category.title,
            id: category._id
        });
    })

})


/* POST edit Category */
router.post("/edit-category/:id", (req, res) => {
    Category.findOne({_id: req.params.id}, (err, cat) => {
        if (cat) {
            req.flash("danger", "Page already exists.");
            res.render("admin/add_category", {
                title: cat.title,
                id: cat._id
            });
        } else {
            //   save to DB  
            var pageDB = new Category({
                title: req.body.title,
                slug: req.body.title,
            });

            pageDB.save((err) => {
                if (err) return console.log(err);
                req.flash("success", "Category added!");
                res.redirect("/admin/categories");
            })
        }  
    })
})  



/**
 * Delete Category
 */
router.get("/delete-category/:id", (req, res) => {
    Category.findByIdAndRemove(req.params.id, (err) => {
        if (err) return console.log(err);
        req.flash("success", "Category deleted!")
        res.redirect("/admin/categories")
    })
})


module.exports = router;