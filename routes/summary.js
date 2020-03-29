//initializing express and router.
let express = require("express");
let router = express.Router();
//initializing fawn
let fawn = require("fawn");
//importing all the required models from db.
let summaryModel = require("../db/summary/summary");
let users = require("../db/user/user");
let categorys = require("../db/category/category");
let product = require("../db/product/product");

//creating summary 
router.post("/api/createsummary", async (req, res) => {
    let { error } = summaryModel.summaryValidationError(req.body);
    if (error) { return res.status(400).send({ message: error.details[0].message }) };

    let user = await users.userModel.findById(req.body.userId);
    if (!user) { return res.status(403).send({ message: "Incorrect User ID" }) }

    let category = await categorys.categoryModel.findById(req.body.categoryId);
    if (!category) { return res.status(403).send({ message: "Incorrect Category ID" }) }

    let p = await product.productModel.findById(req.body.productId);
    if (p.stocks === 0) { return res.status(403).send({ message: "OUT OF STOCK" }) };
    
//reference of data of model to be displayed in summary.
    let summary = new summaryModel.summaryModel({
        name: req.body.name,
        userId: {
            firstname: user.firstname,
            lastname: user.lastname,
            emailId: user.emailId,
            password: user.password

        },
        categoryId: {
            name: category.name

        },
        productId: {

            name: p.name,
            category: p.category,
            stocks: p.stocks,
            price: p.price
        }
    });
    //fawn is a promise based library in MongoDB that implements transaction using two phase commit.
    await fawn
        .Task() //create a task
        .save("summarys", summary) //save the task
        //update the product stock after each transaction is completed successfully.
        .update("products", { _id:product._id}, {      
            $inc: {  //inc-increment
                stocks: -1
            }
        }).run(); //run the task
    res.send(summary);
        
});
module.exports = router; //exporting module