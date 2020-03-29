let express = require("express"); //initialize express
let router = express.Router(); //initialize router using express methods
let users = require("../db/user/user"); //import user model

//create user
router.post("/api/user", async (req, res) => {
    let { error } = users.UserValidationerror(req.body);
    if (error) { return res.status(400).send({ message: error.details[0].message }) };
    let data = new users.userModel({
       firstname: req.body.firstname,
       lastname: req.body.lastname,
       emailId: req.body.emailId,
       password: req.body.password

    });
    let result = await data.save();
    res.send({ item: result });

});


//export module router
module.exports = router;