// server/controllers/bookController.js
import Book from '../models/Book.js';
import Comment from '../models/Comment.js';

export const createBook = async (req, res) => {
  try {
    const { coverImage, title, author, description, publishedOn, genre } = req.body;
    if (!title || !author) return res.status(400).json({ message: 'Title and author required' });

    const book = await Book.create({
      coverImage,
      title,
      author,
      description,
      publishedOn: publishedOn ? new Date(publishedOn) : undefined,
      genre,
      createdBy: req.user ? req.user._id : undefined
    });

    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Create book failed', error: err.message });
  }
};

export const getBooks = async (req, res) => {
  try {
    const { genre, q, page = 1, limit = 200 } = req.query;
    const query = {};
    
   if (genre) {
      query.categories = { $regex: genre, $options: 'i' }; // partial match, case-insensitive
    }
    if (q) query.$or = [
      { title: new RegExp(q, 'i') },
      { author: new RegExp(q, 'i') },
      { description: new RegExp(q, 'i') }
    ];

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Book.countDocuments(query);
    const books = await Book.find(query)
      .populate('createdBy', '_id')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .lean();

    res.json({ total, page: Number(page), limit: Number(limit), books });
  } catch (err) {
    res.status(500).json({ message: 'Get books failed', error: err.message });
  }
};

export const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).lean();
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // optionally return comments
    const comments = await Comment.find({ book: book._id })
      .populate('user', 'name email')
      .populate('replies.user', 'name email')
      .sort({ date: -1 })
      .lean();

    res.json({ book, comments });
  } catch (err) {
    res.status(500).json({ message: 'Get book failed', error: err.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const update = req.body;
    const book = await Book.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    if (book.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to delete this book' });
    }
    await Book.findByIdAndDelete(book._id);
    await Comment.deleteMany({ book: book._id });

    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
};

