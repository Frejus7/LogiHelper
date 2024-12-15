import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();


import authRoute from './routes/auth.js'

const app = express()

app.use(cors())
app.use(express.json())

//Routes
app.use('/routes/auth', authRoute)

async function start(){
    try{
        await mongoose.connect(
            'mongodb+srv://LogiHelper:88888888@clastercr.eifw4.mongodb.net/LG?retryWrites=true&w=majority&appName=clasterCR'
        )
        app.listen(3002, () => console.log(`Server started on port: ${3002}`))
    }catch (eror){
        console.log(eror)
    }
}
start()