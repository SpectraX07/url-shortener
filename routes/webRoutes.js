import express from 'express';
import { renderHome, shortenUrl, redirectToOriginal } from '../controllers/webController.js';

const router = express.Router();

router.get('/', renderHome);
router.post('/shorten-url', shortenUrl);
router.get('/:shortUrl', redirectToOriginal);


export default router;
