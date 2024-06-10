const mongoose=require('mongoose');
const dotenv=require('dotenv').config();
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Connected Successfully')
})
.catch(()=>{
    console.log('Connection Failed');
})