// server/routes/commentRoutes.js
import express from 'express';
import { addComment, addReply, getComments } from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Note: mounted in index.js as app.use('/books', commentRoutes)
// So these become:
// POST /books/:id/comments
// GET  /books/:id/comments
// POST /books/:id/comments/:commentId/replies

router.get('/:id/comments', getComments);
router.post('/:id/comments', protect, addComment);
router.post('/:id/comments/:commentId/replies', protect, addReply);

export default router;
