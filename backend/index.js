import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/BooksRoute.js";
import cors from "cors";


const app = express();

// Middleware for parsing request body 
app.use(express.json())

// Middleware for handling CORS policy 
// option1: Allow all origins with default of cors 
app.use(cors());

// option2: Allow custom origin 
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }))

app.get("/", (req, res)=>{
    console.log(req);
    return res.status(234).send("Welcome to MERN Stack Tutorial")
})

app.use("/books", booksRoute)

// // Route for save a new Book 
// app.post("/books", async(req, res)=>{
//     try{
//         if(
//             !req.body.title ||
//             !req.body.author ||
//             !req.body.publishYear
//         ){
//             return res.status(400).send({
//                 message: "Send all required fields: title, author, publishYear",
//             })
//         }
//         const newBook = {
//             title: req.body.title,
//             author: req.body.author,
//             publishYear: req.body.publishYear,
//         }

//         const book = await Book.create(newBook)

//         return res.status(201).send(book)
//     }
//     catch(err){
//         console.log(err.message);
//         res.status(500).send({message: err.message})
//     }
// })

// // Route for get all Books from database 
// app.get("/books", async(req, res)=>{
//     try{
//         const books = await Book.find({});

//         return res.status(200).json({
//             count: books.length,
//             data: books
//         });
//     }
//     catch(err){
//         console.log(err.message);
//         res.status(500).send({message: err.message})
//     }
// })

// // Route for get one Book from database by id 
// app.get("/books/:id", async(req, res)=>{
//     try{

//         const {id} = req.params;
//         const book = await Book.findById(id);
//         return res.status(200).json(book);
//     }
//     catch(err){
//         console.log(err.message);
//         res.status(500).send({message: err.message})
//     }
// })

// // Route for update a Book
// app.put("/books/:id", async(req, res)=>{
//     try{
//         if(
//             !req.body.title ||
//             !req.body.author ||
//             !req.body.publishYear
//         ){
//             return res.status(400).send({
//                 message: "Send all required fields: title, author, publishYear",
//             })
//         }

//         const {id} = req.params;

//         const result = await Book.findByIdAndUpdate(id, req.body);

//         if(!result){
//             return res.status(404).json({message: "Book not found"});
//         }
        
//         return res.status(200).send({message: "Book updated successfully"})
//     }
//     catch(err){
//         console.log(err.message);
//         res.status(500).send({message: err.message})
//     }
// })

// // Route for deleting a book 
// app.delete("/books/:id", async(req, res)=>{
//     try{

//         const {id} = req.params;
//         const result = await Book.findByIdAndDelete(id);
        
//         if(!result){
//             return res.status(400).json({message: "Book not found"})
//         }

//         return res.status(200).send({message: "Book deleted Successfully"})
//     }
//     catch(err){
//         console.log(err.message);
//         res.status(500).send({message: err.message})
//     }
// })

// app.listen(PORT, ()=>{
//     console.log(`App is listening to port ${PORT}`);
// })

mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("Server connected to database ")
    app.listen(PORT, ()=>{
        console.log(`App is listening to port ${PORT}`);
    })
}).catch((err)=>{
    console.log("Server failed ")
})