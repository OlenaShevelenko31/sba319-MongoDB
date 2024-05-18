import express from "express";
import dotenv from "dotenv";
import getUsers from './routes/getUser.js' // importing users from router
import getBooks from './routes/getBooks.js' // importing books from router
import getReviews from './routes/getReviews.js' // importing reviews from router
import path from "path"; 



dotenv.config();

const PORT = 9000;
const app = express();
app.use(express.json());
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// custom logger middleware
app.use((req,res,next)=>{
    console.log("Request from url: " + req.url);
    next();
})

app.get("/", (req,res)=>{
    // res.send('Welcome to API');
    res.sendFile(path.join(__dirname, "index.html"));

})

app.use('/users', getUsers);
app.use('/books', getBooks);
app.use('/reviews', getReviews);


app.use(express.static(path.join(__dirname, '/styles'))); // adding styles






// Global Middleware error handling 
app.use((err, _req, res, next)=> {
    res.status(500).send("Server Error!")
})

// PORT listerer
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});