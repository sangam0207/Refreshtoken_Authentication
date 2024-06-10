const express = require("express");
const dotenv = require("dotenv");
const cors=require('cors')
const cookieParser=require('cookie-parser')
require("./db/conn.js");
const authRouter = require("./routes/authRouter.js");
const dashRouter=require('./routes/dashBoardRoute.js')
dotenv.config();
const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser())
app.use(express.json());
const port = 8080 || process.env.PORT;
app.use(authRouter);
app.use(dashRouter)
app.get("/", (req, res) => {
  res.send("This is for testing");
});
app.listen(port, () => {
  console.log(`server is running on port number ${port}`);
});
