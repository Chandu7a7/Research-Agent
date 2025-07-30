import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchInterface from './components/SearchInterface';
import Dashboard from './components/Dashboard';
import PaperViewer from './components/PaperViewer';
import ReportGenerator from './components/ReportGenerator';
import { SearchProvider } from './contexts/SearchContext';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedPaper, setSelectedPaper] = useState(null);

  const handleViewChange = (view, data = null) => {
    setCurrentView(view);
    if (view === 'paper' && data) {
      setSelectedPaper(data);
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'search':
        return <SearchInterface onViewChange={handleViewChange} />;
      case 'paper':
        return <PaperViewer paper={selectedPaper} onBack={() => setCurrentView('search')} />;
      case 'reports':
        return <ReportGenerator onBack={() => setCurrentView('dashboard')} />;
      default:
        return <Dashboard onViewChange={handleViewChange} />;
    }
  };

  return (
    <SearchProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header currentView={currentView} onViewChange={handleViewChange} />
        <main className="container mx-auto px-4 py-6">
          {renderCurrentView()}
        </main>
      </div>
    </SearchProvider>
  );
}

export default App;