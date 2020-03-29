let mongoose = require("mongoose"); //initialize mongoose
let Joi = require("@hapi/Joi"); //initialize hapi/joi for data validation

//create schema
let productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    stocks: { type: Number, required: true },
    price: { type: Number, required: true }
});

//create model
let productModel = mongoose.model("product", productSchema);
function productValidationerror(error) {
    let Schema = Joi.object({
        name: Joi.string().required(),
        category: Joi.string().required() ,
        stocks: Joi.number().required(),
        price: Joi.number().required()
    });
    return Schema.validate(error);
};

//export model
module.exports = { productSchema,productValidationerror, productModel };