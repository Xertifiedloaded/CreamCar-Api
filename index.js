const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const userRouter = require("./src/routes/app.routes")
const bodyParser=require("body-parser")
dotenv.config();
PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json())
app.use('/api/user/v1', userRouter)

connectDB();

// console.log(bodyParser)
app.get("/", (req, res) => {
  res.send("This is our application Home Page!!!!😁😁😁");
});



app.listen(PORT, async () => {
  console.log(`listening on http://localhost:${PORT}`);
});
