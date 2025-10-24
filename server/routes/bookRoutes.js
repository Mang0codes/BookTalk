// server/routes/bookRoutes.js
import express from 'express';
import {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook
} from '../controllers/bookController.js';
import { protect } from '../middleware/authMiddleware.js';
import Book from '../models/Book.js';

const router = express.Router();


router.get('/', getBooks);               // GET /books?genre=...
router.get('/:id', getBook);             // GET /books/:id
router.post('/', protect, createBook);   // POST /books (protected)
router.put('/:id', protect, updateBook); // PUT /books/:id (protected)
router.delete('/:id', protect, deleteBook); // DELETE /books/:id (protected)

export default router;
