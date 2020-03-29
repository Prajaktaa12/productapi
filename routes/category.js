let express = require("express"); //initialize express
let router = express.Router(); //initialize router using express methods
let categorys = require("../db/category/category"); //import category model

//create category
router.post("/api/category", async (req, res) => {
    let { error } = categorys.categoryValidationerror(req.body);
    if (error) { return res.status(400).send({ message: error.details[0].message }) };
    let data = new categorys.categoryModel({
        name: req.body.name
    });
    let result = await data.save();
    res.send({ item: result });

});

//export module router
module.exports = router;