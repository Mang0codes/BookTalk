import { MongoClient } from "mongodb";
import axios from 'axios';
import 'dotenv/config';

const client = new MongoClient(process.env.MONGO_URI);

async function fetchBooks(){
    try {
        await  client.connect();
        const db = client.db("Booksdb");
        const collection = db.collection("books");

        const res = await axios.get("https://www.googleapis.com/books/v1/volumes?q=subject:thriller&maxResults=40");
        const books = res.data.items
        .filter(book => book.volumeInfo.imageLinks)
        .map(book => ({
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors || [],
            description: book.volumeInfo.description || "",
            categories: book.volumeInfo.categories || [],
            publishedDate: book.volumeInfo.publishedDate || [],
            image: book.volumeInfo.imageLinks?.thumbnail || "",
            rating: book.volumeInfo.averageRating || 3.5, // ⭐ Store rating here
            ratingsCount: book.volumeInfo.ratingsCount || 0, // Optional: number of ratings
        }));

        await collection.insertMany(books, {ordered: false});
        console.log("Books saved to MongoDB");
    }

    catch(err) {
        console.log(err);
    }
    finally{
        await client.close();
    }
}

fetchBooks();