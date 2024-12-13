import express from 'express';
import { shortenUrl, redirectToOriginal } from '../controllers/apiController.js';

const router = express.Router();

router.post('/shorten', shortenUrl);
router.get('/:shortUrl', redirectToOriginal);

export default router;
