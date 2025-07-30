import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import searchRoutes from './routes/search.js';
import summarizeRoutes from './routes/summarize.js';
import citationRoutes from './routes/citation.js';
import hypothesisRoutes from './routes/hypothesis.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/search', searchRoutes);
app.use('/api/summarize', summarizeRoutes);
app.use('/api/citation', citationRoutes);
app.use('/api/hypothesis', hypothesisRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Research Agent API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Research Agent server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});