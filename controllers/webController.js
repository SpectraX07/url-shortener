import Url from '../models/urlModel.js';

export const renderHome = (req, res) => {
    res.render('index');
};

export const shortenUrl = async (req, res) => {
    const { originalUrl } = req.body;
    console.log('Request body:', req.body); // Log the request body

    try {
        // Check if the URL already exists in the database
        let url = await Url.findOne({ originalUrl });
        if (!url) {
            // If the URL doesn't exist, create a new one
            url = new Url({ originalUrl });
            console.log('URL data before saving:', url); // Log before saving
            await url.save();
            console.log('URL data after saving:', url); // Log after saving
        }

        // Send back the shortened URL
        res.json({ shortUrl: `${req.headers.host}/${url.shortUrl}` });
    } catch (error) {
        console.error('Error saving URL:', error); // Log the error
        res.status(500).json({ error: 'Error generating shortened URL' });
    }
};


export const redirectToOriginal = async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const url = await Url.findOne({ shortUrl });
        if (url) {
            return res.redirect(url.originalUrl);
        }
        res.status(404).render('index', { error: 'URL not found' });
    } catch (error) {
        res.status(500).render('index', { error: 'Server error' });
    }
};
