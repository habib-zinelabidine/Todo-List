require('dotenv').config();
const bodyparser = require('body-parser')
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const userRouting = require('./routes/userRouting');
const todoRouting = require('./routes/todoRouting');
const app = express();

const list = [
    {id : "1" , text : "Complete online JavaScript coursedqsdqsdqsd" , isComplete : true},
    {id : "2" , text : "Jog around the park", isComplete : false},
    {id : "3" , text : "10 minutes mediatation", isComplete : false},
    {id : "4" , text : "Read for an hour", isComplete : false},
    {id : "5" , text : "Pick up groceries", isComplete : false},
    {id : "6" , text : "Complete Todo app", isComplete : false}
  
  ]

const Port = process.env.Port || 4000 ;
app.use(cors())
app.use(morgan('dev'));
app.use(bodyparser.json());

app.use(userRouting);
app.use('/todos', todoRouting);

app.get("/list",(req,res)=>{
    res.json(list)
})




mongoose.connect(process.env.DB_Connect)
.then(() =>{console.log('Connected To MongoDB')})
.catch(error=>{console.log(error.message)});




app.listen(Port,console.log(`Server is runnig at http://localhost:${Port}`));