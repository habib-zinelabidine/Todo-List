require('dotenv').config();
const bodyparser = require('body-parser')
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const userRouting = require('./routes/userRouting');
const todoRouting = require('./routes/todoRouting');
const app = express();


const Port = process.env.Port || 5000 ;
app.use(cors())
app.use(morgan('dev'));
app.use(bodyparser.json());

app.use('/',userRouting);
app.use('/todos', todoRouting);


mongoose.connect("mongodb+srv://habib:oJWVPeGaWDC7DawU@cluster0.phbc6.mongodb.net/todo-app?retryWrites=true&w=majority")
.then(() =>{console.log('Connected To MongoDB')})
.catch(error=>{console.log(error.message)});




app.listen(Port,console.log(`Server is runnig at http://localhost:${Port}`));