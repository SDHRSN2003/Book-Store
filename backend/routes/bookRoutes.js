import express from "express";
import { Book } from '../models/bookModel.js';

const router = express.Router();


router.get('/', async(request,response)=>{
    try{
        const books = await Book.find({});
        response.status(200).json({data:books,count:books.length}); 
    }catch(error){
        console.log(error.message)
        response.status(500).send({message: error.message});
    }
});

router.get('/:id', async(request,response)=>{
    try{
        const bookId = request.params.id;
        const book = await Book.findById(bookId);
        return response.status(200).json(book);
    }catch(error){
        console.log(error.message);
        return response.status(500).send({message: error.message});
    }
});

router.delete('/:id',async(request,response)=>{
        try{
            const bookid = request.params.id;
            const book = await Book.findById(bookid);
            if(!book)
            {
                response.status(500).send({messsage: 'Book not found'});
            } else {
                await Book.deleteOne({_id : bookid});
                response.status(200).send({message: 'Book deleted successfully'});
            }
        }catch(error){
            console.log(error.message);
            return response.status(500).send({message: error.message});
        }
});

router.post('/create',async(request,response) =>{
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

});

router.put('/:id/update',async(request,response)=>{
    try{
        const bookid = request.params.id;
        const book = await Book.findById(bookid);
        if(!book)
        {
            return response.status(404).send({message: 'The book is not found'});
        }
        else{
            const {title,author,publishyear} = request.body;
            book.title = title;
            book.author = author;
            book.publishyear = publishyear;
            await Book.updateOne({_id:bookid},book);
            return response.status(200).send({message: 'The book is updated'});

        }
    }catch(error){
        console.log(error.message);
        return response.status(500).send({message: error.message});
    }
})

export default router;