import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.ATLAS_URL);

let conn;

try{
    conn = await client.connect();
} catch(error){
    console.log(error);
}

let db= conn.db("sba319");

export default db;