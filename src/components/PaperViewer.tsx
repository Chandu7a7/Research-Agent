import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, Star, Share, Brain, FileText, Users, Calendar, ExternalLink } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

interface PaperViewerProps {
  paper: any;
  onBack: () => void;
}

const PaperViewer: React.FC<PaperViewerProps> = ({ paper, onBack }) => {
  const [summary, setSummary] = useState('');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (paper) {
      generateSummary();
    }
  }, [paper]);

  const generateSummary = async () => {
    setIsGeneratingSummary(true);
    try {
      const response = await fetch('http://localhost:3001/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: paper.abstract,
          paperId: paper.id,
          type: 'abstract'
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        setSummary(data.summary);
      }
    } catch (error) {
      console.error('Error generating summary:', error);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  if (!paper) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'summary', label: 'AI Summary', icon: Brain },
    { id: 'citations', label: 'Citations', icon: Users },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-800 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Search</span>
        </button>

        <div className="flex items-center space-x-2">
          <button className="p-2 text-slate-400 hover:text-yellow-500 transition-colors">
            <Star className="w-5 h-5" />
          </button>
          <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors">
            <Share className="w-5 h-5" />
          </button>
          <button className="p-2 text-slate-400 hover:text-green-500 transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Paper Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">{paper.title}</h1>
        
        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 mb-6">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>{paper.authors?.join(', ')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>{paper.year}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>{paper.journal}</span>
          </div>
          <div className="flex items-center space-x-2">
            <ExternalLink className="w-4 h-4" />
            <span>{paper.citations} citations</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {paper.keywords?.map((keyword: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                    isActive
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Abstract</h3>
                <p className="text-slate-600 leading-relaxed">{paper.abstract}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Publication Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-700">DOI</p>
                    <p className="text-slate-600">{paper.doi || 'Not available'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Publication Type</p>
                    <p className="text-slate-600">{paper.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">URL</p>
                    <a href={paper.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      View Paper
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Citation Count</p>
                    <p className="text-slate-600">{paper.citations} citations</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'summary' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800">AI-Generated Summary</h3>
                <button
                  onClick={generateSummary}
                  disabled={isGeneratingSummary}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {isGeneratingSummary ? 'Generating...' : 'Regenerate Summary'}
                </button>
              </div>

              {isGeneratingSummary ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner />
                </div>
              ) : summary ? (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-slate-700 leading-relaxed">{summary}</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Brain className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">Click "Generate Summary" to create an AI summary</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'citations' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800">Citation Formats</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">APA Style</h4>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <p className="text-sm text-slate-600">
                      {paper.authors?.join(', ')} ({paper.year}). {paper.title}. <em>{paper.journal}</em>. 
                      {paper.doi && ` https://doi.org/${paper.doi}`}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-700 mb-2">MLA Style</h4>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <p className="text-sm text-slate-600">
                      {paper.authors?.join(', ')}. "{paper.title}" <em>{paper.journal}</em>, {paper.year}.
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Chicago Style</h4>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <p className="text-sm text-slate-600">
                      {paper.authors?.join(', ')}. "{paper.title}" <em>{paper.journal}</em> ({paper.year}).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaperViewer;