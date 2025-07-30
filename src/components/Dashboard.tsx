import React, { useState, useEffect } from 'react';
import { TrendingUp, BookOpen, FileText, Brain, Clock, Star, ArrowRight } from 'lucide-react';

interface DashboardProps {
  onViewChange: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewChange }) => {
  const [stats, setStats] = useState({
    totalPapers: 0,
    recentSearches: 0,
    savedReports: 0,
    hypotheses: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [trendingTopics, setTrendingTopics] = useState([]);

  useEffect(() => {
    // Simulate loading dashboard data
    setTimeout(() => {
      setStats({
        totalPapers: 1247,
        recentSearches: 23,
        savedReports: 8,
        hypotheses: 15
      });

      setRecentActivity([
        { id: 1, type: 'search', title: 'Machine Learning in Healthcare', time: '2 hours ago' },
        { id: 2, type: 'report', title: 'Climate Change Research Summary', time: '1 day ago' },
        { id: 3, type: 'hypothesis', title: 'AI Ethics Framework', time: '2 days ago' },
      ]);

      setTrendingTopics([
        'Artificial Intelligence',
        'Climate Science',
        'Quantum Computing',
        'Biotechnology',
        'Renewable Energy',
        'Space Exploration'
      ]);
    }, 1000);
  }, []);

  const statCards = [
    { label: 'Papers Analyzed', value: stats.totalPapers, icon: BookOpen, color: 'blue' },
    { label: 'Recent Searches', value: stats.recentSearches, icon: TrendingUp, color: 'green' },
    { label: 'Reports Generated', value: stats.savedReports, icon: FileText, color: 'purple' },
    { label: 'Hypotheses Created', value: stats.hypotheses, icon: Brain, color: 'orange' },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200',
      orange: 'bg-orange-50 text-orange-700 border-orange-200',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome to Research Agent</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Your AI-powered research assistant for academic literature search, analysis, and report generation.
          Discover insights, generate hypotheses, and accelerate your research process.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg hover:scale-105 ${getColorClasses(stat.color)}`}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-8 h-8" />
                <span className="text-2xl font-bold">{stat.value.toLocaleString()}</span>
              </div>
              <p className="text-sm font-medium opacity-80">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-6">Quick Actions</h3>
          <div className="space-y-4">
            <button
              onClick={() => onViewChange('search')}
              className="w-full p-4 text-left bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-slate-800">Start New Research</h4>
                  <p className="text-sm text-slate-600">Search for papers and literature</p>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button
              onClick={() => onViewChange('reports')}
              className="w-full p-4 text-left bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-slate-800">Generate Report</h4>
                  <p className="text-sm text-slate-600">Create research summaries</p>
                </div>
                <ArrowRight className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <Clock className="w-4 h-4 text-slate-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">{activity.title}</p>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Topics */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-6">Trending Research Topics</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {trendingTopics.map((topic, index) => (
            <button
              key={index}
              onClick={() => onViewChange('search')}
              className="p-3 text-sm bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-lg hover:from-slate-100 hover:to-slate-200 transition-all duration-200 hover:shadow-sm"
            >
              <div className="flex items-center space-x-2">
                <Star className="w-3 h-3 text-slate-500" />
                <span className="text-slate-700 font-medium">{topic}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;