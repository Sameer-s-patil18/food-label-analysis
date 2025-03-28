import express from 'express';
import ScanHistory from '../models/ScanHistory.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { imageUrl, extractedText, analysis } = req.body;
    const scanHistory = new ScanHistory({
      userId: req.user.userId,
      imageUrl,
      extractedText,
      analysis
    });
    await scanHistory.save();
    res.status(201).json(scanHistory);
  } catch (error) {
    res.status(500).json({ message: 'Error saving scan history', error: error.message });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  try {
    const history = await ScanHistory.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching history', error: error.message });
  }
});

export default router;