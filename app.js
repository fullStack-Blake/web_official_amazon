const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const session = require("express-session");
const path = require("path");

// Use dotenv to secure important data
require("dotenv").config({ path: "./config/keys.env" });

// Create Controller
const generalRoutes = require("./controllers/general");
const userRoutes = require("./controllers/user");
const productRoutes = require("./controllers/product");

// Create app object
const app = express();

// BodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Express static middleware
app.use(express.static("public"));

// Handlebars middleware
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Custom middleware functions to submit PUT, DELETE request

app.use((req, res, next) => {
  if (req.query.method == "PUT") {
    req.method = "PUT";
  } else if (req.query.method == "DELETE") {
    req.method = "DELETE";
  }

  next();
});

app.use(fileUpload());

// Create secret session string
app.use(
  session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: true
  })
);

//custom middleware functions
app.use((req, res, next) => {
  // res.locals.user is a global handlebars variable.
  // This means that every handlebars files can now access that user variable
  res.locals.user = req.session.user;
  next();
});
// const generalRoutes = require("./controllers/General");
// const userRoutes = require("./controllers/User");
// const productRoutes = require("./controllers/Product");

app.use("/", generalRoutes);
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/", (req, res) => {
  res.render("General/404");
});

// Connect to mongoose
mongoose
  .connect(process.env.MONGO_DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`Connected to MongoDB Database`);
  })
  .catch(err =>
    console.log(`Error occured when connecting to database ${err}`)
  );

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Your Web Server has been connected`);
});
