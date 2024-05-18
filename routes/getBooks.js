import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello, you get to BOOKS route");
});

router.post('/', async (req, res) => {
    try {
        const collection = await db.collection("books");
        const newBook = req.body;
        const result = await collection.insertOne(newBook);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//  GET all books  by id /books/all
router.get("/all", async(req,res)=>{
    try{
        const collection = await db.collection("books");
        const books = await collection.find({}).toArray();
        res.send(books).status(200);
    } catch {
        console.error("Error retrieving users:" ,error);
        res.status(500).json({message: "Internav server error."})
    }
})

// GET  book  by id /books/:id
router.get("/:id", async(req,res) => {
    try{
        const collection = await db.collection("books");
        const query = {_id: new ObjectId(req.params.id)};
        const user = await collection.findOne(query);

        if(!user){
            res.status(404).json({message: "User not found"});
        } else {
            res.status(200).json(user)
        }

    } catch {
        console.error("Error retrieving user:" , error);
        res.status(500).json({message: "Interna server error"});
    }
});


// GET book by author /books/author
router.get("/author/:author", async (req, res) => {
    try {
        const collection = await db.collection("books");
        const author = req.params.author; 
        const book = await collection.findOne({ author }); 

        if (!book) {
            res.status(404).json({ message: "Book not found" });
        } else {
            res.status(200).json(book);
        }
    } catch (error) {
        console.error("Error retrieving book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Update a book by userWhoRead
router.put("/:userWhoRead", async (req, res) => {
    try {
        const collection = await db.collection("books");
        const userWhoRead = req.params.userWhoRead;
        const updatedBookData = req.body;

        const query = { userWhoRead }; 

        const existingBook = await collection.findOne(query);
        if (!existingBook) {
            res.status(404).json({ message: "Book not found" });
            return; 
        }

        const result = await collection.updateOne(query, { $set: updatedBookData });

        if (!result.modifiedCount) {
            res.status(500).json({ message: "Failed to update book" });
            return; 
        }

        res.status(200).json({ message: "Book updated successfully" });
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Delete a book by userWhoRead
router.delete("/:userWhoRead", async (req, res) => {
    try {
        const collection = await db.collection("books");
        const userWhoRead = req.params.userWhoRead; 
        const query = { userWhoRead }; 

        const result = await collection.deleteOne(query);

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});










export default router;
