import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv/config';
import path from 'path';


import apiRoutes from './routes/apiRoutes.js';
import webRoutes from './routes/webRoutes.js';

// const __dirname = path.dirname(new URL(import.meta.url).pathname);
const __dirname = path.resolve(); // If using ES modules

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.use('/public', express.static(path.join(__dirname, 'public')));


// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


// Routes
app.use('/api', apiRoutes);
app.use('/', webRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
