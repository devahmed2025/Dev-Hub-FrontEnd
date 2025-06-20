import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Trophy,
  Calendar,
  Clock,
  Award,
  TrendingUp,
  BookOpen,
} from 'lucide-react';
import { loadTestGrades } from '../store/slices/testSlice';
import { useDarkMode } from '../features/darkMode/useDarkMode';

const StudentGrades = () => {
  const { data } = useLoaderData();
  const { student, grades } = data;
  const { isDarkMode } = useDarkMode();
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Calculate statistics
  const stats =
    grades.length > 0
      ? {
          totalTests: grades.length,
          averageScore: Math.round(
            grades.reduce(
              (sum, grade) => sum + (grade.score / grade.totalPoints) * 100,
              0
            ) / grades.length
          ),
          bestScore: Math.max(
            ...grades.map((grade) =>
              Math.round((grade.score / grade.totalPoints) * 100)
            )
          ),
          totalPoints: grades.reduce((sum, grade) => sum + grade.score, 0),
          maxPossiblePoints: grades.reduce(
            (sum, grade) => sum + grade.totalPoints,
            0
          ),
        }
      : {
          totalTests: 0,
          averageScore: 0,
          bestScore: 0,
          totalPoints: 0,
          maxPossiblePoints: 0,
        };

  // Sort grades
  const sortedGrades = [...grades].sort((a, b) => {
    const modifier = sortOrder === 'asc' ? 1 : -1;
    switch (sortBy) {
      case 'score':
        return (a.score / a.totalPoints - b.score / b.totalPoints) * modifier;
      case 'title':
        return a.testTitle.localeCompare(b.testTitle) * modifier;
      case 'date':
      default:
        return (new Date(a.startTime) - new Date(b.startTime)) * modifier;
    }
  });

  const getGradeColor = (score, totalPoints) => {
    const percentage = (score / totalPoints) * 100;
    if (percentage >= 90)
      return isDarkMode ? 'text-green-400' : 'text-green-600';
    if (percentage >= 80) return isDarkMode ? 'text-blue-400' : 'text-blue-600';
    if (percentage >= 70)
      return isDarkMode ? 'text-yellow-400' : 'text-yellow-600';
    if (percentage >= 60)
      return isDarkMode ? 'text-orange-400' : 'text-orange-600';
    return isDarkMode ? 'text-red-400' : 'text-red-600';
  };

  const getGradeBadge = (score, totalPoints) => {
    const percentage = (score / totalPoints) * 100;
    if (percentage >= 90) return { label: 'Excellent', color: 'bg-green-500' };
    if (percentage >= 80) return { label: 'Good', color: 'bg-blue-500' };
    if (percentage >= 70) return { label: 'Average', color: 'bg-yellow-500' };
    if (percentage >= 60)
      return { label: 'Below Average', color: 'bg-orange-500' };
    return { label: 'Poor', color: 'bg-red-500' };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div
        className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm shadow-lg`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1
              className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
            >
              Academic Performance
            </h1>
            <p
              className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              {student?.name || 'Student'}
            </p>
          </div>
          <div
            className={`p-3 rounded-full ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'}`}
          >
            <BookOpen className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm shadow-lg`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
              >
                Total Tests
              </p>
              <p
                className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
              >
                {stats.totalTests}
              </p>
            </div>
            <Award
              className={`h-8 w-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`}
            />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm shadow-lg`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
              >
                Average Score
              </p>
              <p
                className={`text-2xl font-bold ${getGradeColor(stats.averageScore, 100)}`}
              >
                {stats.averageScore}%
              </p>
            </div>
            <TrendingUp
              className={`h-8 w-8 ${isDarkMode ? 'text-green-400' : 'text-green-500'}`}
            />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm shadow-lg`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
              >
                Best Score
              </p>
              <p
                className={`text-2xl font-bold ${getGradeColor(stats.bestScore, 100)}`}
              >
                {stats.bestScore}%
              </p>
            </div>
            <Trophy
              className={`h-8 w-8 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`}
            />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm shadow-lg`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
              >
                Total Points
              </p>
              <p
                className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
              >
                {stats.totalPoints}/{stats.maxPossiblePoints}
              </p>
            </div>
            <Clock
              className={`h-8 w-8 ${isDarkMode ? 'text-purple-400' : 'text-purple-500'}`}
            />
          </div>
        </motion.div>
      </div>

      {/* Grades Table */}
      <div
        className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm shadow-lg`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
          >
            Test Results
          </h2>
          <div className="flex space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-3 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
            >
              <option value="date">Sort by Date</option>
              <option value="score">Sort by Score</option>
              <option value="title">Sort by Title</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className={`px-3 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition`}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>

        {grades.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                >
                  <th
                    className={`text-left py-3 px-4 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Test
                  </th>
                  <th
                    className={`text-left py-3 px-4 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Score
                  </th>
                  <th
                    className={`text-left py-3 px-4 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Grade
                  </th>
                  <th
                    className={`text-left py-3 px-4 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Duration
                  </th>
                  <th
                    className={`text-left py-3 px-4 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedGrades.map((grade, index) => {
                  const percentage = Math.round(
                    (grade.score / grade.totalPoints) * 100
                  );
                  const badge = getGradeBadge(grade.score, grade.totalPoints);

                  return (
                    <motion.tr
                      key={grade.testId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`border-b ${isDarkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}
                    >
                      <td className="py-4 px-4">
                        <div>
                          <p
                            className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                          >
                            {grade.testTitle}
                          </p>
                          <p
                            className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                          >
                            ID: {grade.testId}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`text-lg font-bold ${getGradeColor(grade.score, grade.totalPoints)}`}
                          >
                            {grade.score}/{grade.totalPoints}
                          </span>
                          <span
                            className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                          >
                            ({percentage}%)
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium text-white ${badge.color}`}
                        >
                          {badge.label}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span
                            className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                          >
                            {grade.duration} min
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span
                            className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                          >
                            {new Date(grade.startTime).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen
              className={`mx-auto h-16 w-16 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'} mb-4`}
            />
            <h3
              className={`text-lg font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}
            >
              No grades available yet
            </h3>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Grades will appear here once you complete some tests.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default StudentGrades;
