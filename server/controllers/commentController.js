// server/controllers/commentController.js
import Comment from '../models/Comment.js';
import Book from '../models/Book.js';

// Add comment to a book
export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const bookId = req.params.id;
    if (!content) return res.status(400).json({ message: 'Content required' });

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const comment = await Comment.create({
      user: req.user._id,
      book: book._id,
      content
    });

    const populated = await comment.populate('user', 'name email');

    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: 'Add comment failed', error: err.message });
  }
};

// Reply to a comment
export const addReply = async (req, res) => {
  try {
    const { content } = req.body;
    const { id: bookId, commentId } = req.params;
    if (!content) return res.status(400).json({ message: 'Content required' });

    const comment = await Comment.findOne({ _id: commentId, book: bookId });
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    comment.replies.push({ user: req.user._id, content });
    await comment.save();

    const populated = await Comment.findById(comment._id)
      .populate('user', 'name email')
      .populate('replies.user', 'name email');

    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: 'Add reply failed', error: err.message });
  }
};

// Get comments for a book
export const getComments = async (req, res) => {
  try {
    const bookId = req.params.id;
    const comments = await Comment.find({ book: bookId })
      .populate('user', 'name email')
      .populate('replies.user', 'name email')
      .sort({ date: -1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Get comments failed', error: err.message });
  }
};
