import Url from '../models/urlModel.js';

export const shortenUrl = async (req, res) => {
    const { originalUrl } = req.body;

    try {
        // Check if the URL already exists
        let url = await Url.findOne({ originalUrl });
        if (!url) {
            url = new Url({ originalUrl });
            await url.save();
        }
        res.json({ success: true, shortUrl: `${req.headers.host}/${url.shortUrl}` });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

export const redirectToOriginal = async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const url = await Url.findOne({ shortUrl });
        if (url) {
            return res.status(200).json({ success: true, originalUrl: url.originalUrl });
        }
        res.status(404).json({ success: false, error: 'URL not found' });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};
