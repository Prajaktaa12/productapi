//initialize all required modules
let express = require("express");
let mongoose = require("mongoose");
let app = express();
//initialize models
let user = require("./routes/user");
let auth = require("./routes/auth/user");
let category = require("./routes/category");
let product = require("./routes/product");
let summary = require("./routes/summary");
let fawn = require("fawn");  //initialize fawn
let port = process.env.PORT || 4600; //initialize port used
app.use(express.json()); //initialize json using express 
app.use("/api/users", user);
app.use("/api/login", auth);
app.use("/category", category);
app.use("/product", product);
app.use("/summary", summary);

//initialize mongoose connection
mongoose.connect("mongodb://localhost/pra", { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("connected to db"))
.catch(error => console.log(`something went wrong ${error.message}`));
fawn.init(mongoose); //fawn initialization with mongoose
app.listen(port, () => console.log(`port is working on ${port}`));