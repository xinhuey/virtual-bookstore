import express, { request } from "express";
import {PORT, mongoDBURL} from "./config.js"
import mongoose from "mongoose";
import {Book} from './models/bookModel.js';

const app = express();

//Middleware for parsing request body 
app.use(express.json());

//get resource from the server
app.get('/', (request, response)=>{
    console.log(request);
    return response.status(234).send('Welcome to MERN Stack Tutorial');
});

//Route for Save a new book
app.post('/books', async(request, response) =>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const newBook ={
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);

        return response.status(201).send(book);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: 'Error in Saving Book'});
    }
    
});

//Route for get all books from database
app.get('/books', async(request, response) =>{
    try{
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: 'Error in Fetching Books'});
    }
})

//Route for get one book from database
app.get('/books/:id', async(request, response) =>{
    try{
        const {id} = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: 'Error in Fetching Book'});
    }
})

//Route to update the book 
app.put('/books/:id', async(request, response) =>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const {id}= request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result){
            return response(404).json({message:'Book not found'});
        }

        return response.status(200).send({message:'Book Updated Successfully'});

    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: 'Error in Updating Book'});
    }
})

//Route to delete the book 
app.delete('/books/:id', async(request, response) => {
    try{
        const{id} = request.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message: 'Book not found'});
        }

        return response.status(200).send({message:'Book deleted successfully'});
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App connected to database');
        app.listen(PORT,() =>{
            console.log(`App is listening to port: ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    });