const express=  require("express");
require("dotenv").config()


const morgan  =require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator")
const cors = require("cors")


const app = express();



//midelwares

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator())
app.use(cors())

const authRoutes = require("./routes/auth")
const categoryRoutes = require("./routes/category")
const spaceRoutes = require("./routes/space")
const todoRoutes = require("./routes/todo")


//routes midelware
app.use("/api",authRoutes)
app.use("/api",categoryRoutes)
app.use("/api",spaceRoutes)
app.use("/api",todoRoutes)

const port  = process.env.PORT || 8000;

app.listen(port, ()=>{
console.log(`server is runnig on port ${port}`)
})