import express from 'express';
import { generateSummary } from '../utils/graniteAPI.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { text, paperId, type = 'abstract' } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text content is required' });
    }

    const summary = await generateSummary(text, type);
    
    res.json({
      success: true,
      paperId,
      type,
      summary,
      originalLength: text.length,
      summaryLength: summary.length
    });
  } catch (error) {
    console.error('Summarization error:', error);
    res.status(500).json({ 
      error: 'Failed to generate summary',
      message: error.message 
    });
  }
});

router.post('/batch', async (req, res) => {
  try {
    const { papers } = req.body;
    
    if (!papers || !Array.isArray(papers)) {
      return res.status(400).json({ error: 'Papers array is required' });
    }

    const summaries = await Promise.all(
      papers.map(async (paper) => {
        try {
          const summary = await generateSummary(paper.abstract || paper.content, 'abstract');
          return {
            id: paper.id,
            title: paper.title,
            summary,
            status: 'success'
          };
        } catch (error) {
          return {
            id: paper.id,
            title: paper.title,
            error: error.message,
            status: 'error'
          };
        }
      })
    );

    res.json({
      success: true,
      summaries,
      processed: summaries.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process batch summaries' });
  }
});

export default router;