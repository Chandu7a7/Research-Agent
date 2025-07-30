import express from 'express';
import { generateHypothesis } from '../utils/graniteAPI.js';

const router = express.Router();

router.post('/generate', async (req, res) => {
  try {
    const { topic, context = '', papers = [] } = req.body;
    
    if (!topic) {
      return res.status(400).json({ error: 'Research topic is required' });
    }

    const hypothesis = await generateHypothesis(topic, context, papers);
    
    res.json({
      success: true,
      topic,
      hypothesis,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Hypothesis generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate hypothesis',
      message: error.message 
    });
  }
});

router.post('/suggestions', async (req, res) => {
  try {
    const { researchArea, existingFindings = [] } = req.body;
    
    // Simulate research suggestions
    const suggestions = [
      {
        type: 'Research Gap',
        description: `Limited studies on ${researchArea} in emerging markets`,
        priority: 'High',
        feasibility: 'Medium'
      },
      {
        type: 'Methodology',
        description: `Apply machine learning approaches to ${researchArea} data analysis`,
        priority: 'Medium',
        feasibility: 'High'
      },
      {
        type: 'Cross-disciplinary',
        description: `Investigate ${researchArea} from a multidisciplinary perspective`,
        priority: 'Medium',
        feasibility: 'Medium'
      }
    ];

    res.json({
      success: true,
      researchArea,
      suggestions,
      count: suggestions.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate research suggestions' });
  }
});

export default router;