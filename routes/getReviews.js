import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello, you get to REVIEWS route");
});

router.post('/', async (req, res) => {
    try {
        const collection = await db.collection("reviews");
        const newReview = req.body;
        const result = await collection.insertOne(newReview);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// GET all reviews
router.get("/all", async (req, res) => {
    try {
        const collection = await db.collection("reviews");
        const users = await collection.find({}).toArray();

        let htmlResponse = `
            <html>
            <head>
                <title>All Users</title>
                <link rel="stylesheet" type="text/css" href="/reviewsStyle.css">
            </head>
            <body>
                <h1>All reviews</h1>
                <div class="user-list">
        `;

        users.forEach(user => {
            htmlResponse += `
                <div class="user">
                    <h2>Who read the book: ${user.userWhoRead}</h2>
                    <p>Name of the book: ${user.bookWhatUserRead}</p>
                    <p>Reviews: ${user.reviews}</p>
                </div>
            `;
        });

        htmlResponse += `
                </div>
            </body>
            </html>
        `;

        res.send(htmlResponse).status(200);
    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});
// GET  book  by id /books/:id
router.get("/:id", async (req, res) => {
    try {
        const collection = await db.collection("reviews");
        const query = { _id: new ObjectId(req.params.id) };
        const review = await collection.findOne(query);

        if (!review) {
            res.status(404).json({ message: "Review not found" });
        } else {
            res.status(200).json(review);
        }
    } catch (error) {
        console.error("Error retrieving review:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.get("/seeReviewOf/:userWhoRead", async (req, res) => {
    try {
        const collection = await db.collection("reviews");
        const userWhoRead = req.params.userWhoRead; 
        const user = await collection.findOne({ userWhoRead });

        if (!user) {
            res.status(404).json({ message: " not found" });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        console.error("Error retrieving reviews:", error); 
        res.status(500).json({ message: "Internal server error" });
    }
});


// Update  by ID
router.put("/:id", async (req, res) => {
    try {
        const collection = await db.collection("reviews");
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
    
    const collection = await db.collection("reviews");
    const userId = req.params.id;
    const query = { _id: new ObjectId(userId) };

    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });

});






export default router;
