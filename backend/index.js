import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import formRoutes from './routes/form.routes.js';
import libraryRoutes from './routes/library.routes.js';
import templateRoutes from './routes/template.routes.js'; // Import template routes
import notesRoutes from './routes/notes.routes.js'; // Import notes routes
import referenceRoutes from './routes/reference.routes.js'; // Import reference routes
import imageRoutes from './routes/image.routes.js'; // Import image routes

dotenv.config();


const app = express();

// Use CORS middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175','https://relearn-frontend.vercel.app', 'https://relearn-admin.vercel.app','http://localhost:5176','http://localhost:5177',], // Allow both origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent with requests
}));

// Increase payload size limits to handle base64 images
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then(() => { console.log("Connected to database"); })
    .catch((err) => {
        console.error("Error connecting to database:", err);
        process.exit(1);
    });

app.use('/api/users', userRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/templates', templateRoutes); // Use template routes
app.use('/api', notesRoutes); // Use notes routes
app.use('/api', referenceRoutes); // Use reference routes
app.use('/api/images', imageRoutes); // Use image routes

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});