import React, { useState } from 'react';
import { ArrowLeft, FileText, Brain, Download, Sparkles } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

interface ReportGeneratorProps {
  onBack: () => void;
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({ onBack }) => {
  const [reportConfig, setReportConfig] = useState({
    title: '',
    topic: '',
    sections: {
      introduction: true,
      literatureReview: true,
      methodology: false,
      results: false,
      conclusion: true
    },
    style: 'academic',
    length: 'medium'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState('');
  const [hypotheses, setHypotheses] = useState([]);

  const handleSectionToggle = (section: string) => {
    setReportConfig(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: !prev.sections[section]
      }
    }));
  };

  const generateReport = async () => {
    setIsGenerating(true);
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const sampleReport = `
# ${reportConfig.title || 'Research Report'}

🔍 Executive Summary

This research report explores ${reportConfig.topic || 'the specified research area'} through comprehensive analysis of current literature and emerging trends. Our findings indicate significant opportunities for advancement in this field.

${reportConfig.sections.introduction ? `
🚀 Introduction

The field of ${reportConfig.topic || 'this research area'} has experienced rapid growth and evolution in recent years. This report synthesizes current knowledge and identifies key research directions for future investigation.

Key research questions addressed include:
- What are the current state-of-the-art approaches?
- What gaps exist in current knowledge?
- What opportunities exist for innovation?
` : ''}

${reportConfig.sections.literatureReview ? `
📰 Literature Review

Our comprehensive review of existing literature reveals several important themes:

 Methodological Approaches
Recent studies have employed diverse methodological frameworks, with increasing emphasis on interdisciplinary approaches and data-driven methods.

  Key Findings
The literature consistently demonstrates the importance of rigorous experimental design and reproducible research practices.

 Research Gaps
Despite significant progress, several areas require further investigation, particularly in real-world applications and long-term impact assessment.
` : ''}

${reportConfig.sections.conclusion ? `
🖊️Conclusion

This analysis reveals both significant progress and important opportunities in ${reportConfig.topic || 'the research area'}. Future research should focus on addressing identified gaps while building upon established findings.

 Recommendations
1. Increase focus on reproducible research practices
2. Develop standardized evaluation metrics
3. Foster interdisciplinary collaboration
4. Invest in long-term longitudinal studies

 Future Directions
The field is poised for significant advancement through the integration of emerging technologies and innovative methodological approaches.
` : ''}
      `;
      
      setGeneratedReport(sampleReport);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateHypotheses = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/hypothesis/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: reportConfig.topic,
          context: reportConfig.title
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        setHypotheses(data.hypothesis);
      }
    } catch (error) {
      console.error('Error generating hypotheses:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-800 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          <h2 className="text-2xl font-bold text-slate-800">Research Report Generator</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Report Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Report Title</label>
                <input
                  type="text"
                  value={reportConfig.title}
                  onChange={(e) => setReportConfig(prev => ({...prev, title: e.target.value}))}
                  placeholder="Enter report title"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Research Topic</label>
                <input
                  type="text"
                  value={reportConfig.topic}
                  onChange={(e) => setReportConfig(prev => ({...prev, topic: e.target.value}))}
                  placeholder="Enter research topic"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Sections to Include</label>
                <div className="space-y-2">
                  {Object.entries(reportConfig.sections).map(([section, enabled]) => (
                    <label key={section} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={() => handleSectionToggle(section)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700 capitalize">
                        {section.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Writing Style</label>
                <select
                  value={reportConfig.style}
                  onChange={(e) => setReportConfig(prev => ({...prev, style: e.target.value}))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="academic">Academic</option>
                  <option value="professional">Professional</option>
                  <option value="technical">Technical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Report Length</label>
                <select
                  value={reportConfig.length}
                  onChange={(e) => setReportConfig(prev => ({...prev, length: e.target.value}))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="short">Short (2-3 pages)</option>
                  <option value="medium">Medium (5-8 pages)</option>
                  <option value="long">Long (10+ pages)</option>
                </select>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={generateReport}
                disabled={isGenerating || !reportConfig.topic}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>{isGenerating ? 'Generating...' : 'Generate Report'}</span>
              </button>

              <button
                onClick={generateHypotheses}
                disabled={!reportConfig.topic}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                <Brain className="w-4 h-4" />
                <span>Generate Hypotheses</span>
              </button>
            </div>
          </div>

          {/* Hypotheses Panel */}
          {hypotheses.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <span>Generated Hypotheses</span>
              </h3>
              
              <div className="space-y-4">
                {hypotheses.map((hypothesis, index) => (
                  <div key={index} className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <p className="text-sm font-medium text-purple-800 mb-2">
                      Hypothesis {index + 1}
                    </p>
                    <p className="text-purple-700 text-sm leading-relaxed">
                      {hypothesis.statement}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Report Preview */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 h-full">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800">Report Preview</h3>
                {generatedReport && (
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                )}
              </div>
            </div>

            <div className="p-6">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <LoadingSpinner />
                  <p className="text-slate-500 mt-4">Generating your research report...</p>
                </div>
              ) : generatedReport ? (
                <div className="prose prose-slate max-w-none">
                  <div 
                    className="text-slate-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: generatedReport.replace(/\n/g, '<br>').replace(/#{1,6}\s(.+)/g, '<h3 class="text-lg font-semibold text-slate-800 mt-6 mb-3">$1</h3>')
                    }}
                  />
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-slate-600 mb-2">No Report Generated</h4>
                  <p className="text-slate-500">Configure your report settings and click "Generate Report" to begin</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;