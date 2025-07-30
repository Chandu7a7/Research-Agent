import express from 'express';
import { formatCitation } from '../utils/citationFormatter.js';

const router = express.Router();

router.post('/format', async (req, res) => {
  try {
    const { papers, style = 'APA' } = req.body;
    
    if (!papers || !Array.isArray(papers)) {
      return res.status(400).json({ error: 'Papers array is required' });
    }

    const citations = papers.map(paper => formatCitation(paper, style));
    
    res.json({
      success: true,
      style,
      citations,
      count: citations.length
    });
  } catch (error) {
    console.error('Citation formatting error:', error);
    res.status(500).json({ 
      error: 'Failed to format citations',
      message: error.message 
    });
  }
});

router.get('/styles', (req, res) => {
  const styles = ['APA', 'MLA', 'Chicago', 'IEEE', 'Vancouver', 'Harvard'];
  res.json({
    success: true,
    styles
  });
});

export default router;