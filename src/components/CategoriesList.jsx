
import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useDarkMode } from '../features/darkMode/useDarkMode';
import LinkButton from './ui/LinkButton';
import {
  BookOpen,
  Clock,
  Award,
  ChevronRight,
  Search,
  Grid,
  List,
  Target,
  Users,
  Trophy,
  Star,
} from 'lucide-react';

function CategoriesList() {
  const data = useLoaderData();
  const { isDarkMode } = useDarkMode();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const categories = data?.categories || [];

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGradientClass = (index) => {
    const gradients = [
      'from-purple-600 via-blue-600 to-indigo-600',
      'from-pink-600 via-rose-600 to-red-600',
      'from-emerald-600 via-teal-600 to-cyan-600',
      'from-orange-600 via-amber-600 to-yellow-600',
      'from-violet-600 via-purple-600 to-fuchsia-600',
      'from-blue-600 via-indigo-600 to-purple-600',
    ];
    return gradients[index % gradients.length];
  };

  const getCategoryIcon = (index) => {
    const icons = [BookOpen, Target, Star, Users, Trophy, Award];
    const IconComponent = icons[index % icons.length];
    return IconComponent;
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900'
          : 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900'
      } p-4 sm:p-6 lg:p-8`}
    >
      {/* Header Section */}
      <div className="relative overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-3xl"></div>
        <div className="relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                Quize Categories
              </h1>
              <p className="text-white/80 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
                Explore our comprehensive collection of Tests designed to
                accelerate your learning journey
              </p>
            </div>

            {/* Search and Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-4 rounded-2xl border transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-purple-500/20 border-purple-400/50 text-purple-300'
                      : 'bg-white/10 border-white/20 text-white/60 hover:bg-white/20'
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-4 rounded-2xl border transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-purple-500/20 border-purple-400/50 text-purple-300'
                      : 'bg-white/10 border-white/20 text-white/60 hover:bg-white/20'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16">
            <Search className="h-16 w-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No categories found
            </h3>
            <p className="text-white/60">Try adjusting your search terms</p>
          </div>
        ) : (
          <div
            className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                : 'grid-cols-1 max-w-4xl mx-auto'
            }`}
          >
            {filteredCategories.map((cat, index) => {
              const IconComponent = getCategoryIcon(index);
              return (
                <LinkButton
                  key={cat._id}
                  to={`/categories/${cat._id}`}
                  className="group block"
                >
                  <div
                    className={`relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                      viewMode === 'list' ? 'flex gap-6 p-6' : 'p-6'
                    }`}
                  >
                    {/* Background Gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${getGradientClass(index)} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                    ></div>
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 group-hover:border-white/30 rounded-3xl transition-all duration-500"></div>

                    <div className="relative flex-1">
                      {/* Category Header */}
                      <div
                        className={`flex items-start justify-between mb-4 ${viewMode === 'list' ? 'mb-2' : ''}`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-3 bg-gradient-to-br ${getGradientClass(index)} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                          >
                            <IconComponent className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                              {cat.name}
                            </h2>
                            <div className="flex items-center gap-4 mt-1 text-white/60 text-sm">
                              <span className="flex items-center gap-1">
                                <Target className="h-4 w-4" />
                                {cat.tests?.length || 0} Tests
                              </span>
                              <span className="flex items-center gap-1">
                                <Award className="h-4 w-4" />
                                {cat.tests?.reduce(
                                  (sum, test) => sum + (test.totalPoints || 0),
                                  0
                                ) || 0}{' '}
                                Points
                              </span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="h-6 w-6 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                      </div>

                      {/* Description */}
                      <p className="text-white/80 leading-relaxed mb-6">
                        {cat.description}
                      </p>

                      {/* Tests Section */}
                      {cat.tests && cat.tests.length > 0 ? (
                        <div className="space-y-3">
                          <h3 className="font-semibold text-white flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-purple-300" />
                            Available Tests
                          </h3>
                          <div
                            className={`space-y-2 ${viewMode === 'list' ? 'max-h-32 overflow-y-auto custom-scrollbar' : ''}`}
                          >
                            {cat.tests
                              .slice(0, viewMode === 'list' ? 10 : 3)
                              .map((test) => (
                                <div
                                  key={test._id}
                                  className="bg-white/5 rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-all duration-300"
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-medium text-white text-sm">
                                      {test.title}
                                    </h4>
                                    <div className="flex items-center gap-2 text-xs">
                                      <div className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full border border-emerald-400/30">
                                        {test.totalPoints}pts
                                      </div>
                                    </div>
                                  </div>
                                  {test.description && (
                                    <p className="text-white/60 text-xs mb-2">
                                      {test.description}
                                    </p>
                                  )}
                                  <div className="flex items-center gap-3 text-xs text-white/50">
                                    {test.duration && (
                                      <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {test.duration} mins
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            {cat.tests.length > 3 && viewMode === 'grid' && (
                              <div className="text-center py-2">
                                <span className="text-white/60 text-sm">
                                  +{cat.tests.length - 3} more tests
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <BookOpen className="h-12 w-12 text-white/30 mx-auto mb-3" />
                          <p className="text-white/60">
                            No tests available yet
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </LinkButton>
              );
            })}
          </div>
        )}
      </div>

      {/* <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style> */}
    </div>
  );
}

export default CategoriesList;
