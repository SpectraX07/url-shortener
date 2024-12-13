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
        res.json({ shortUrl: `${req.headers.host}/${url.shortUrl}` });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const redirectToOriginal = async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const url = await Url.findOne({ shortUrl });
        if (url) {
            return res.redirect(url.originalUrl);
        }
        res.status(404).send('URL not found');
    } catch (error) {
        res.status(500).send('Server error');
    }
};
