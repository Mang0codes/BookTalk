import Header from '../components/Header'
import Search from '../components/Search'
import Card from '../components/Card'
import Genre from '../components/Genre'
import { useEffect, useState } from 'react';
import axios from 'axios';
const API = import.meta.env.VITE_API_URL;


const Home = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser) setCurrentUser(JSON.parse(storedUser));
    if (storedToken) setToken(storedToken);
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${API}/book`, {
          params: search ? { q: search } : {}, // only send q if searching
        });
        if (Array.isArray(res.data)) {
          setBooks(res.data);
        } else if (Array.isArray(res.data.books)) {
          setBooks(res.data.books);
        } else {
          setBooks([]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchBooks();
  }, [search]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await axios.delete(`${API}/book/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooks(books.filter(book => book._id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div>
        <Header />
        <div className='flex items-center justify-center m-2'>
        <p className='libertinus-sans-bold text-white text-2xl
         text-center p-2 w-3/4'>
          A sleek web application that allows users to search for books, 
          view detailed information, and rate them based on their reading 
          experience. It provides features like 
          live search, user ratings, and personalized 
          book lists.
        </p>
          
        </div >
        <Search value={search} onChange={setSearch} />
        <div className='flex justify-start items-start gap-4 px-28'>
        <Genre name="Mystery"/>
        <Genre name="Drama"/>
        <Genre name="Romance"/>
        <Genre name="Fiction"/>
        <Genre name="Horror"/>
        <Genre name="Thriller"/>
        <Genre name="Science Fiction"/>
        <Genre name="Self Help"/>
        <Genre name="Comics" />
        </div>
        
        <div className="flex flex-col lg:flex-row mt-4 px-24">
          <div className="w-full lg:w-full grid grid-cols md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
          {books.map(book => (
            <Card key={book._id} book={book}
            currentUser={currentUser} 
            handleDelete={handleDelete}/>
          ))}
        </div>
          </div>
    </div>
  )
}

export default Home