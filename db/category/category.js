let mongoose = require("mongoose"); //initialize mongoose
let Joi = require("@hapi/Joi"); //initialize hapi/joi for data validation

//create schema
let categorySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true }
});

//create model
let categoryModel = mongoose.model("category", categorySchema);
function categoryValidationerror(error) {
    let Schema = Joi.object({
        name: Joi.string().required()
    });
    return Schema.validate(error);
};

//export model
module.exports = { categorySchema, categoryValidationerror, categoryModel};