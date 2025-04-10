const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
require("./Models/db");
const AuthRouter = require("./routes/authrouter");
const ProductRouters = require("./routes/ProductRouter");

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", AuthRouter);
app.use("/pong", (req, res) => {
  res.send("Complete");
});
app.use("/products", ProductRouters);

app.listen(PORT, () => {
  console.log(`server are running this Port ${PORT}`);
});
