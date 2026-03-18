const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
require("./Models/db");
const AuthRouter = require("./routes/authrouter");
const ProductRouters = require("./routes/ProductRouter");

const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: "https://mern-app-zeta-fawn.vercel.app",
})); 
app.use(bodyParser.json());

app.use("/auth", AuthRouter );

app.use("/products", ProductRouters);
app.get("/", (req, res) => {
  res.send("Complete"); 
});
app.listen(PORT, () => { 
  console.log(`server are running this Port ${PORT}`);  
});
