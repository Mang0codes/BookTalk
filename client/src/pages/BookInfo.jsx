import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import  CommentThread from '../components/CommentThread';
import Header from '../components/Header';
import StarRating from '../components/StarRating'

const BookInfo = () => {

  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3000/book/${bookId}`)
      .then(res => setBook(res.data.book))
      .catch(err => console.error(err));

     fetchComments();
    }, [bookId]);

  const fetchComments = () => {
      axios.get(`http://localhost:3000/comment/${bookId}/comments`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error(err));
  };

  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to comment.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:3000/comment/${bookId}/comments`,
        { content: newComment },
        { headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
      );

      setNewComment("");
      fetchComments();
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post comment");
    }
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <Header />
    <div className="flex justify-center items-center h-screen px-6 libertinus-sans-regular">
      <div className="w-full max-w-7xl h-[90%] p-6 rounded-xl backdrop-blur-xl bg-white/10 border-2 border-white/20 shadow-lg text-white flex gap-6">
        
        {/* Left Panel - Book Info */}
        <div className="w-1/3 sticky flex flex-col items-center gap-4 border-r border-white/20 pr-6">
          <img
            src={book.image || 'https://via.placeholder.com/150'} 
            alt="Book Cover"
            className="w-48 h-72 object-cover rounded-lg shadow-md"
          />
          <div className="text-center max-w-xl mx-auto p-4 overflow-auto scrollbar-white-20">
            <p className="text-2xl font-bold mt-4">{book.title}</p>
            <p className="text-md text-gray-300">by {book.authors}</p>
            <p className="text-sm mt-2">Published: {book.publishedDate ? new Date(book.publishedDate).getFullYear() : "Unknown"}</p>
            <div className="flex justify-center mt-2">
              <StarRating rating={book.rating || 0} />
            </div>
            <p className="mt-4 text-sm text-gray-200 px-2 break-words ">
              {book.description}
            </p>
          </div>
        </div>

        {/* Right Panel - Comments */}
        <div className="flex-1 overflow-hidden flex flex-col">
        <h2 className="text-2xl font-semibold mb-6">Discussion</h2>

        <div className="mb-6">
            <textarea value={newComment}
            onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
            }}
            className="w-full p-2  border resize-none rounded-xl overflow-hidden border-white/20 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/40 scrollbar-white-20"
            onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button onClick={handlePostComment}
            className="mt-2 px-4 py-2 text-sm active:border-none bg-blue-500 rounded hover:bg-blue-600"
            >Post Comment</button>
        </div>

          <div className="flex-1 flex flex-col gap-6 overflow-y-auto custom-scroll">
            {comments.length === 0 && <p>No comments yet.</p>}
            {comments.map(c => (
            <CommentThread
              key={c._id} // ✅ backend sends _id, not id
              comment={c}
              bookId={bookId}
              refreshComments={fetchComments} />
            ))}
          </div>
          </div>


          {/* Additional comments can follow the same pattern */}
        </div>
      </div>
      </div>
  );
};


export default BookInfo