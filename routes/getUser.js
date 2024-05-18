import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello, you get to USERS route");
});

// POST  - create a new user
router.post('/', async (req, res) => {
    try {
        const collection = await db.collection("users");
        const newUser = req.body;
        const result = await collection.insertOne(newUser);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }


});

// GET all users
router.get("/all", async(req,res)=>{
    try{
        const collection = await db.collection("users");
        const users = await collection.find({}).toArray();

        let htmlResponse = '<h1>All Users</h1>';
        htmlResponse += '<div class="user-list">';
        users.forEach(user => {
           
            const passwordLength = user.password.length;
            const visibleChars = Math.max(passwordLength - 4, 0);
            const visiblePart = '*'.repeat(visibleChars) + user.password.slice(visibleChars);

            htmlResponse += `
            <html>
            <head>
            <link rel="stylesheet" type="text/css" href="/userStyle.css">
            </head>
            <body>
                <div class="user">
                    <h2>Name: ${user.name}</h2>
                    <p>Email: ${user.email}</p>
                    <p>Password: ${visiblePart}</p>
                </div>
            `;
        });

        htmlResponse += '</div>';


        res.send(htmlResponse).status(200);
    } catch {
        console.error("Error retrieving users:" ,error);
        res.status(500).json({message: "Internav server error."})
    }
})


// GET  user by id /users/:id
router.get("/:id", async(req,res) => {
    try{
        const collection = await db.collection("users");
        const query = {_id: new ObjectId(req.params.id)};
        const user = await collection.findOne(query);

        if(!user){
            res.status(404).json({message: "User not found"});
        } else {
            res.status(200).json(user)
        }

    } catch {
        // console.error("Error retrieving user:" , error);
        res.status(500).json({message: "Interna server error"});
    }
});

// GET user by email    /users/email/:email
router.get("/email/:email", async (req, res) => {
    try {
        const collection = await db.collection("users");
        const email = req.params.email; 
        const user = await collection.findOne({ email }); 

        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Update a user by ID
router.put("/:id", async (req, res) => {
    try {
        const collection = await db.collection("users");
        const userId = req.params.id;
        const updatedUserData = req.body;

        const query = { _id: new ObjectId(userId) };

        const existingUser = await collection.findOne(query);
        if (!existingUser) {
            res.status(404).json({ message: "User not found" });
        }

        const result = await collection.updateOne(query, { $set: updatedUserData });

        if (!result.modifiedCount) {
            res.status(500).json({ message: "Failed to update user" });
        }

        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
    
    const collection = await db.collection("users");
    const userId = req.params.id;
    const query = { _id: new ObjectId(userId) };

    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });

});


export default router;
