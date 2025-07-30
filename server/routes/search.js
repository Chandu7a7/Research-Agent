import express from 'express';
import { searchPapers } from '../utils/fetchPapers.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { query, filters = {} } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const papers = await searchPapers(query, filters);
    
    res.json({
      success: true,
      query,
      results: papers,
      count: papers.length
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ 
      error: 'Failed to search papers',
      message: error.message 
    });
  }
});

router.get('/trending', async (req, res) => {
  try {
    // Simulate trending topics
    const trendingTopics = [
      'Machine Learning',
      'Climate Science',
      'Quantum Computing',
      'Biotechnology',
      'Artificial Intelligence',
      'Renewable Energy'
    ];

    res.json({
      success: true,
      trending: trendingTopics
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trending topics' });
  }
});

export default router;