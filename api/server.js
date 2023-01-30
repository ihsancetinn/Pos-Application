const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const logger = require("morgan");


//routes
const categoryRoute = require("./routes/categories.js");
const productRoute = require("./routes/products.js");
const billRoute = require("./routes/bills.js");
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/users.js");

dotenv.config();

const connect = async () => {
  try {
    await mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB'ye başarıyla bağlanmıştır.");
  } catch (error) {
    throw error;
  }
};

//middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use("/categories", categoryRoute);
app.use("/products", productRoute);
app.use("/bills", billRoute);
app.use("/auth", authRoute);
app.use("/users", userRoute);

app.listen(process.env.PORT || 5000, () => {
  connect();
  console.log(process.env.PORT, "Portu dinleniyor..");
});
