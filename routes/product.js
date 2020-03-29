let express = require("express"); //initialize express
let router = express.Router(); //initialize router using express methods
let product = require("../db/product/product"); //import product model

//create product
router.post("/api/product", async (req, res) => {
    let { error } = product.productValidationerror(req.body);
    if (error) { return res.status(400).send({ message: error.details[0].message }) };
    let data = new product.productModel({
        name: req.body.name,
        category: req.body.category,
        stocks: req.body.stocks,
        price: req.body.price
    });
    let result = await data.save();
    res.send({ item: result });

});

//export module router
module.exports = router;