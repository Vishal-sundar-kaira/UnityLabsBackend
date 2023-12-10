const express=require('express')
const mongoose=require('mongoose');
const cookieParser = require('cookie-parser');
const cors =require("cors")
const dotenv=require('dotenv')
const app=express();
dotenv.config();
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
app.use(express.json())//first middleware allowing to send json from client side to server
app.use(cookieParser())//second middleware for cookie for storing jwt token.
app.use(cors({origin:"Enter your frontend origin",credentials:true}))
app.use((err,req,res,next)=>{
  const errorStatus=err.status||500
  const errorMessage=err.message||"something went wrong"
  return res.status(errorStatus).send(errorMessage);
})


app.listen(5000,()=>{
    console.log("backend server is running")
})