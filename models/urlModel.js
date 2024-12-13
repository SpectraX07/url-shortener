import mongoose from 'mongoose';
import shortid from 'shortid';

// Define the schema
const urlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true, default: shortid.generate },
    createdAt: { type: Date, default: Date.now },
});

// Pre-save hook for generating shortUrl
urlSchema.pre('save', function (next) {
    console.log('Pre-save invoked for:', this);
    this.shortUrl = shortid.generate();
    console.log('Generated shortUrl:', this.shortUrl);
    next();
});

// Create the model
const Url = mongoose.model('Url', urlSchema);

export default Url;
