import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDB_URL } from "./config.js";
import { Book } from "./models/bookModel.js";
const app = express();

app.use(express.json());

app.get('/',(request,response) =>{
    console.log(request)
    return response.status(234).send('Hello world')
});

app.post('/books/create',async(request,response) =>{
    try{
        if(!request.body.title ||
            !request.body.author||
            !request.body.publishyear)
            {
                response.status(400).send({
                    message:"please fill all the necessaries"
                });
            }
            const newBook = {
                title: request.body.title,
                author: request.body.author,
                publishyear: request.body.publishyear,
            };
            const book = await Book.create(newBook);
            return response.status(201).send("Success");
    }
    catch(error){
        console.log(error.message)
        return response.status(500).send({message: error.message})
    }

})

app.get('/books', async(request,response)=>{
    try{
        const books = await Book.find({});
        response.status(200).json(books); 
    }catch(error){
        console.log(error.message)
        response.status(500).send({message: error.message});
    }
})

mongoose.connect(mongoDB_URL).then(() =>{
    console.log("Connected to mongodb successfully");
    app.listen(PORT, () => {
        console.log(`App is working at PORT ${PORT}`);
    });
}).catch((err) => {
    console.log(err.message);
});