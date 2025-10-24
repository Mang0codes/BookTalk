import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors({
     origin: 'http://localhost:5173',
     credentials: true,
}));
app.use(express.json());

app.use('/auth', authRoutes)
app.use('/book', bookRoutes);
app.use('/comment', commentRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB connected!!');
}).catch((err) =>{ 
    console.log('Connection to MongoDb Failed');
})

app.get('/' , (req, res) => {
    res.json({ ok: true, msg: 'Book Review API' })
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json({message: err.message || 'server error'});
});

app.listen(port, () => {
    console.log("Server is running on port 3000!")
});
