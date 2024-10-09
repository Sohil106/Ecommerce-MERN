require("dotenv").config();

const express = require("express");
const cors = require("cors"); // to allow origin access
const server = express();
const mongoose = require("mongoose");
//import router variables
const productsRouter = require("./routes/product");
const categoriesRouter = require("./routes/category");
const brandsRouter = require("./routes/brand");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");

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
server.use("/users", userRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", cartRouter.router);
server.use("/orders", orderRouter.router);

server.listen(process.env.PORT, () => {
  console.log("server started");
});
