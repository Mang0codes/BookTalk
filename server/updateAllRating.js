import Book from './models/Book.js'; // Your Book model

const OMDB_API_KEY = "d1fd5a42"; // your key

async function updateAllBookRatings() {
  try {
    const books = await Book.find();

    for (const book of books) {
      // Skip if rating already exists
      if (book.rating) continue;

      const res = await fetch(
        `https://www.omdbapi.com/?t=${encodeURIComponent(book.title)}&apikey=${OMDB_API_KEY}`
      );
      const data = await res.json();

      if (data && data.imdbRating && data.imdbRating !== "N/A") {
        book.rating = parseFloat(data.imdbRating);
        await book.save();
        console.log(`✅ Updated rating for: ${book.title}`);
      } else {
        console.log(`⚠ No rating found for: ${book.title}`);
      }
    }
  } catch (err) {
    console.error("Error updating ratings:", err);
  }
}

// Run once manually or as a cron job
updateAllBookRatings();
