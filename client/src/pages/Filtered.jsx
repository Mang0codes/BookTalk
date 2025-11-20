import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Card from "../components/Card";
import Header from "../components/Header";
const API = import.meta.env.VITE_API_URL;


const Filtered = () => {
  const { genre  } = useParams();
  const [books, setBooks] = useState([]);

    useEffect(() => {
    axios.get(`${API}/book?genre=${genre}`)
      .then(res => setBooks(res.data.books || res.data))
      .catch(err => console.error(err));
  }, [genre]);


  return (
    <div>
      <Header/>
<div className="px-8 py-6">
      {/* Page Heading */}
      <h1 className="text-3xl libertinus-sans-bold font-bold text-white mb-6">
        Books in <span className="text-3xl">{genre}</span>
      </h1>

      {/* Book Grid */}
      {books.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {books.map((book) => (
            <div key={book._id}>
              <Card book={book} />
            </div>
          ))}
        </div>
      ) : (
        // Empty State
        <div className=" text-white libertinus-sans-bold text-center text-2xl">
          <p className="font-medium">No books found</p>
          <p className=" mt-2">
            We couldn’t find any books in the “{genre}” category.
          </p>
        </div>
      )}
    </div>
    </div>
  )
}

export default Filtered