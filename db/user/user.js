let mongoose = require("mongoose"); //initialize mongoose
let Joi = require("@hapi/Joi"); //initialize hapi/joi for data validation

//create schema
let userSchema = new mongoose.Schema({
    firstname: {type: String, min: 4, max: 100, required: true},
    lastname: {type: String, min: 4, max: 200, required: true},
    emailId: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

//create model
let userModel = mongoose.model("user", userSchema);
//validate data
function UserValidationerror(error) {
    let Schema = Joi.object({
      firstname: Joi.string().required(), 
      lastname: Joi.string().required(),
      emailId: Joi.string().required(),
      password: Joi.string().required() 
    });
    return Schema.validate(error);
};

//export model
module.exports = {userModel, UserValidationerror, userSchema };