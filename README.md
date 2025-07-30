# Research Agent AI
https://github.com/Chandu7a7/Research-Agent/blob/main/Project%20Dashboard.png
A comprehensive AI-powered research assistant built with React, Node.js, and IBM Granite AI. This application helps researchers discover, analyze, and synthesize academic literature with advanced AI capabilities.

## Features

### 🔍 Intelligent Literature Search
- Natural language query processing
- Advanced filtering and sorting options
- Integration with academic databases
- Real-time search results with relevance scoring

### 🧠 AI-Powered Analysis
- Automatic paper summarization using IBM Granite
- Hypothesis generation and research suggestions
- Key insight extraction and trend analysis
- Citation network analysis

### 📊 Research Management
- Organized paper collections and libraries
- Citation formatting in multiple styles (APA, MLA, Chicago, etc.)
- Export capabilities (BibTeX, JSON, PDF)
- Research progress tracking

### 📝 Report Generation
- Automated research report creation
- Customizable report sections and styles
- Literature review synthesis
- Professional academic formatting

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for build tooling

### Backend
- **Node.js** with Express
- **IBM Watsonx.ai** and **Granite LLM** integration
- **RESTful API** architecture
- **CORS** enabled for cross-origin requests

### AI Integration
- **IBM Granite** for text summarization and analysis
- **Natural Language Processing** for query understanding
- **Machine Learning** for relevance scoring and recommendations

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- IBM Cloud account with Watsonx.ai access
- IBM Granite API credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Chandu7a7/Research-Agent.git
   cd Research-Agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env
   ```
   
   Fill in your IBM Cloud credentials:
   - `IBM_CLOUD_API_KEY`: Your IBM Cloud API key
   - `IBM_WATSONX_PROJECT_ID`: Your Watsonx project ID
   - `IBM_WATSONX_URL`: Your Watsonx service URL

4. **Start the application**
   ```bash
   npm run dev
   ```

   This starts both the React frontend (port 5173) and Node.js backend (port 3001).

### API Endpoints

#### Search
- `POST /api/search` - Search for academic papers
- `GET /api/search/trending` - Get trending research topics

#### AI Services
- `POST /api/summarize` - Generate paper summaries
- `POST /api/summarize/batch` - Batch summarization
- `POST /api/hypothesis/generate` - Generate research hypotheses
- `POST /api/hypothesis/suggestions` - Get research suggestions

#### Citations
- `POST /api/citation/format` - Format citations in various styles
- `GET /api/citation/styles` - Get available citation styles

## Project Structure

```
research-agent-ai/
├── src/                          # React frontend
│   ├── components/               # React components
│   │   ├── Header.tsx           # Navigation header
│   │   ├── Dashboard.tsx        # Main dashboard
│   │   ├── SearchInterface.tsx  # Literature search
│   │   ├── PaperViewer.tsx      # Individual paper view
│   │   ├── ReportGenerator.tsx  # Report creation
│   │   └── LoadingSpinner.tsx   # Loading component
│   ├── contexts/                # React contexts
│   │   └── SearchContext.tsx    # Search state management
│   └── App.tsx                  # Main application
├── server/                      # Node.js backend
│   ├── routes/                  # API routes
│   │   ├── search.js           # Search endpoints
│   │   ├── summarize.js        # AI summarization
│   │   ├── citation.js         # Citation formatting
│   │   └── hypothesis.js       # Hypothesis generation
│   ├── utils/                  # Utility functions
│   │   ├── fetchPapers.js      # Paper retrieval
│   │   ├── graniteAPI.js       # IBM Granite integration
│   │   └── citationFormatter.js # Citation utilities
│   └── index.js                # Server entry point
└── README.md
```

## IBM Cloud Integration

This application is designed to work with IBM Cloud services:

### Required Services
1. **IBM Watsonx.ai** - For AI model access
2. **IBM Granite** - For text processing and generation
3. **IBM Cloud Object Storage** (optional) - For document storage

### Authentication
The application uses IBM Cloud API keys for authentication. Ensure your API key has access to:
- Watsonx.ai service
- Granite LLM models
- Any additional services you plan to use

## Development

### Adding New Features
1. **Frontend Components**: Add new React components in `src/components/`
2. **API Endpoints**: Create new routes in `server/routes/`
3. **AI Integration**: Extend IBM Granite integration in `server/utils/graniteAPI.js`

### Testing
- Frontend: React Testing Library and Jest
- Backend: Node.js testing frameworks
- Integration: API endpoint testing

## Deployment

### IBM Cloud Deployment
1. Create an IBM Cloud Foundry application
2. Configure environment variables
3. Deploy using IBM Cloud CLI

### Alternative Deployment
- **Netlify/Vercel**: For frontend hosting
- **Heroku/Railway**: For full-stack deployment
- **Docker**: Containerized deployment

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Check the documentation above
- Review IBM Watsonx.ai documentation
- Create an issue in the repository

## Acknowledgments

- IBM for Watsonx.ai and Granite AI services
- The open-source community for tools and libraries
- Academic research community for inspiration and requirements
