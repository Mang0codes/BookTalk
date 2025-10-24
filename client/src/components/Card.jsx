import React from 'react'
import { Link } from 'react-router-dom'
import StarRating from '../components/StarRating'

const Card = ({ book, currentUser, handleDelete }) => {

  return (
    
    <div className='w-full max-w-xs h-auto p-4 rounded-xl backdrop-filter
         backdrop-blur-xl bg-white/10 border-2 border-white/20 shadow-lg 
        top-0 z-50 text-white transform transition duration-200 hover:scale-105 overflow-hidden'>
          <Link to={`/bookInfo/${book._id}`}>
        <div className='flex gap-3'>
            <div className='h-32 sm:block'>
              <img src={book.image} className='h-full min-w-20 object-cover rounded-lg' alt={book.title}></img>
            </div>
            <div className='flex flex-col justify-between'>
              <div>
                <p className='text-xl font-bold leading-snug libertinus-sans-bold'>{book.title}</p>
                <p className=' mb-1'>{book.authors[0]}</p>
            </div >
            <div>
                <p className='text-gray-100 text-sm text-xm'>Genre: {book.categories}</p>
                <p className='text-gray-100 text-sm font-semibold text-xm'>Published: {book.publishedDate ? new Date(book.publishedDate).getFullYear() : 'N/A'}</p>
            </div>
            </div>
        </div>
        <div className='mt-3 flex justify-start'>
          <StarRating rating={book.rating} />
        </div>
        </Link>

        <div className="flex justify-end mt-3">
          {book.createdBy && 
        (book.createdBy._id?.toString() === currentUser?._id?.toString() ||
        book.createdBy?.toString() === currentUser?._id?.toString()) && (
          <button 
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            onClick={() => handleDelete(book._id)}
          >
            Delete
          </button>
          )}
        </div>


    </div>
  )
}

export default Card