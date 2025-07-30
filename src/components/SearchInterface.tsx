import React, { useState, useContext } from 'react';
import { Search, Filter, BookOpen, Users, Calendar, ExternalLink, Star, Download } from 'lucide-react';
import { SearchContext } from '../contexts/SearchContext';
import LoadingSpinner from './LoadingSpinner';

interface SearchInterfaceProps {
  onViewChange: (view: string, data?: any) => void;
}

const SearchInterface: React.FC<SearchInterfaceProps> = ({ onViewChange }) => {
  const { searchResults, isLoading, performSearch } = useContext(SearchContext);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    year: '',
    type: '',
    sortBy: 'relevance'
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      await performSearch(query, filters);
    }
  };

  const handlePaperClick = (paper: any) => {
    onViewChange('paper', paper);
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Academic Literature Search</h2>
        <p className="text-slate-600">Discover relevant research papers powered by AI analysis</p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your research query (e.g., 'machine learning in healthcare')"
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>

            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Searching...' : 'Search Papers'}
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Year</label>
                <select
                  value={filters.year}
                  onChange={(e) => setFilters({...filters, year: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Years</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  <option value="Journal Article">Journal Article</option>
                  <option value="Review Article">Review Article</option>
                  <option value="Conference Paper">Conference Paper</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Sort By</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="relevance">Relevance</option>
                  <option value="citations">Citations</option>
                  <option value="year">Year</option>
                </select>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && !isLoading && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">
              Search Results ({searchResults.length} papers found)
            </h3>
          </div>

          <div className="grid gap-6">
            {searchResults.map((paper) => (
              <div
                key={paper.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => handlePaperClick(paper)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-slate-800 mb-2 hover:text-blue-600 transition-colors">
                      {paper.title}
                    </h4>
                    
                    <div className="flex items-center space-x-4 text-sm text-slate-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{paper.authors?.slice(0, 3).join(', ')}</span>
                        {paper.authors?.length > 3 && <span>et al.</span>}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{paper.year}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{paper.journal}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {paper.citations} citations
                    </span>
                    <button className="p-2 text-slate-400 hover:text-yellow-500 transition-colors">
                      <Star className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {paper.abstract}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {paper.keywords?.slice(0, 4).map((keyword: string, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-slate-400 hover:text-green-500 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {searchResults.length === 0 && !isLoading && query && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-600 mb-2">No papers found</h3>
          <p className="text-slate-500">Try adjusting your search query or filters</p>
        </div>
      )}
    </div>
  );
};

export default SearchInterface;