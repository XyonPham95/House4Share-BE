const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const AppError = require("./utils/appError");
const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");
const productRouter = require("./routers/productRouter");
const reviewRouter = require("./routers/reviewRouter");
const categoryRouter = require("./routers/categoryRouter");
const passport = require("./auth/passport");

mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("succeessfully connect to database"))
  .catch((error) => console.log(error));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);
app.use(passport.initialize());

router.route("/").get((req, res) => {
  res.status(200).json({ status: "ok", data: [] });
});

function notFound(req, res, next) {
  next(new AppError(404, "API NOT FOUND"));
}

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/category", categoryRouter);
router.use("/products", productRouter);
router.use("/products/:pId", reviewRouter);

router.route("*").all(notFound);
const errorHandler = require("./utils/errorHandler");

app.use(errorHandler);

module.exports = app;
