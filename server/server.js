import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv'
// import mongoose from 'mongoose';
// require('colors');

dotenv.config();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

//routes
app.get('/', (req, res) => {
    res.send('Hello POS!')
})

//create port
const PORT = process.env.PORT || 5000;

//listen
app.listen(PORT, ()=>{
    console.log(`server is running on port: http://localhost:${PORT}`);
})