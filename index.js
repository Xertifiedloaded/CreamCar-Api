const express = require("express");
const rateLimit = require('express-rate-limit');
var cors = require('cors')
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const userRouter = require("./src/routes/app.routes")
const AdminRouter = require("./src/routes/admin.routes")
const postRouter = require("./src/routes/user.routes")

dotenv.config();
PORT = process.env.PORT || 3000;

const app = express();
app.use(cors())
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use('/api/user/v1', userRouter)
app.use('/api/admin/v1', AdminRouter)
app.use('/api/category/v1', postRouter)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);
connectDB();
app.get("/", (req, res) => {
  res.send("This is our application Home Page!!!!😁😁😁");
});



app.listen(PORT, async () => {
  console.log(`listening on http://localhost:${PORT}`);
});
