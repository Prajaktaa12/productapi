let express = require("express"); //initialize express
let router = express.Router(); //initialize router using express methods
let model = require("../../db/user/user"); //import user model

//authentication of email and password of user
router.post("/auth", async (req, res) =>{
    let user = await model.findOne({ "emailId": req.body.emailId });
    console.log(user);
    if(!user) {return res.status(404).send({message: "Invalid Email ID" }) }

    let password = await model.findOne({ "password": req.body.password });
    console.log(password);
    if(!password) {return res.status(404).send({message: " Incorrect Password "}) };
    res.send({message: "You are Logged In"});

});

//export module router
module.exports = router;