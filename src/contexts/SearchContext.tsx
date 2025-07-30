import React, { createContext, useState, ReactNode } from 'react';

interface SearchContextType {
  searchResults: any[];
  isLoading: boolean;
  searchQuery: string;
  performSearch: (query: string, filters?: any) => Promise<void>;
  clearResults: () => void;
}

export const SearchContext = createContext<SearchContextType>({
  searchResults: [],
  isLoading: false,
  searchQuery: '',
  performSearch: async () => {},
  clearResults: () => {},
});

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const performSearch = async (query: string, filters = {}) => {
    setIsLoading(true);
    setSearchQuery(query);
    
    try {
      const response = await fetch('http://localhost:3001/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, filters }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSearchResults(data.results);
      } else {
        console.error('Search failed:', data.error);
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setSearchResults([]);
    setSearchQuery('');
  };

  const value = {
    searchResults,
    isLoading,
    searchQuery,
    performSearch,
    clearResults,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};