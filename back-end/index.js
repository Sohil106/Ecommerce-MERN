require("dotenv").config();

const express = require("express");
const cors = require("cors"); // to allow origin access
const server = express();
const mongoose = require("mongoose");
//import router variables
const productsRouter = require("./routes/product");
const categoriesRouter = require("./routes/category");
const brandsRouter = require("./routes/brand");

//db connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("database Connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/trendSure');` if your database has auth enabled
}

/* All use here */
server.use(cors());
//middleware
server.use(express.json()); //to parse req.body
//use router variables
server.use("/products", productsRouter.router);
server.use("/categories", categoriesRouter.router);
server.use("/brands", brandsRouter.router);

server.listen(process.env.PORT, () => {
  console.log("server started");
});
