let mongoose = require("mongoose"); //initialize mongoose
let Joi = require("@hapi/Joi"); //initialize hapi/joi for data validation
//initialize models
let users = require("../user/user");
let categorys = require("../category/category");   
let product = require("../product/product");
//create schema
let summarySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    userId: {type: users.userSchema, required:true},
    categoryId: {type: categorys.categorySchema, required:true},
    productId: {type: product.productSchema, required:true }

});

//create model
let summaryModel = mongoose.model("summary", summarySchema);
//validate data
function summaryValidationError(error) {
    let Schema = Joi.object({
        name: Joi.string().required(),
        userId: Joi.string().required(),
        categoryId: Joi.string().required(),
        productId: Joi.string().required()
    });
    return Schema.validate(error);
}

//export model
module.exports = {summaryModel, summaryValidationError}; 
