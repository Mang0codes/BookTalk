import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },

    content: String,
    date: {
        type: Date,
        default: Date.now()
    },

    replies: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            content: String,
            date: {
                type: Date,
                default: Date.now()
            },
        },
        { _id: true },
    ]
});

export default mongoose.model('Comment', commentSchema);