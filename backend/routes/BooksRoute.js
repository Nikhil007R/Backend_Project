import express, { Router } from "express"
import { Book } from "../models/bookModel.js"

const router = express.Router();

// Route for save a new Book 
router.post("/", async(req, res)=>{
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message: "Send all required fields: title, author, publishYear",
            })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }

        const book = await Book.create(newBook)

        return res.status(201).send(book)
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message})
    }
})

// Route for get all Books from database 
router.get("/", async(req, res)=>{
    try{
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        });
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message})
    }
})

// Route for get one Book from database by id 
router.get("/:id", async(req, res)=>{
    try{

        const {id} = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message})
    }
})

// Route for update a Book
router.put("/:id", async(req, res)=>{
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message: "Send all required fields: title, author, publishYear",
            })
        }

        const {id} = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).json({message: "Book not found"});
        }
        
        return res.status(200).send({message: "Book updated successfully"})
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message})
    }
})

// Route for deleting a book 
router.delete("/:id", async(req, res)=>{
    try{

        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);
        
        if(!result){
            return res.status(400).json({message: "Book not found"})
        }

        return res.status(200).send({message: "Book deleted Successfully"})
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message})
    }
})

export default router;