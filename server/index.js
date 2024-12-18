import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
dotenv.config();


import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'
import commentRoute from './routes/comments.js'


const app = express()

app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))

//Routes
app.use('/routes/auth', authRoute)
app.use('/routes/posts', postRoute)
app.use('/routes/comments', commentRoute)


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