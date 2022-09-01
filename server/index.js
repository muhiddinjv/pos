import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5000;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/testbase").then(()=>{
    console.log('connected to DB')
}).catch((err)=>{
    console.log(err.message);
})

const usersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
   
})

const adminModel = mongoose.model("users", usersSchema)

; (async () => {
    try {

        // await mongo()

        app.use(express.json())
        app.use(cors())
        app.use(bodyParser.urlencoded({extended:true}))
       
        app.get('/getuser',async (_, res)=>{
            await res.send(adminModel.find)
        })
        
        app.post('/adduser',(req, res)=>{
            const { username, userage } = req.body;
            users.push({
                id: users.length + 1,
                username: username,
                userage: userage,
            })
            res.send(users);
        })
        
        // app.put('/:id', (req,res)=>{
        //     const {id} = req.params
        //     const { name, age} = req.body;
        //     users.filter(user => user.id === id ? user.name = name : user)
        //     console.log(users);
        //     res.send("update")
        // })
        
        // app.delete('/:id', (req, res)=>{
        //     const {id} = req.params;
        //     res.send('deleted')
        // })
    } finally {
        app.listen(PORT, console.log(`server running on port: ${PORT}`))
    }
})()
