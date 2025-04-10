const ensureAuthorization = require("../Middleware/ProductAuth");

const router = require("express").Router();



router.get("/", ensureAuthorization,  (req, res)=>{
    // this is for user are super admin or decision bases then use the req.user from database
    // console.log("----- User are logged in---", req.user);
    
res.status(200).json([
    {
        name: "Mobile",
        price: 20000
    },
    {
        name:"Tv",
        price:4500
    }
])
})

module.exports = router