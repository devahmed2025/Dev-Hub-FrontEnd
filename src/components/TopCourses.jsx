import { Book, Link } from 'lucide-react';
import LoadingSpinner from './ui/LoadingSpinner';

function TopCourses({ courses, status }) {
  // console.log('courses');
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Book className="w-5 h-5 text-green-500" />
        Top Courses
      </h3>
      {status === 'loading' ? (
        <LoadingSpinner size="sm" />
      ) : courses?.length > 0 ? (
        courses.map((course) => (
          <Link
            key={course._id}
            to={`/courses/${course._id}`}
            className="block p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 mb-2"
          >
            <p className="text-sm font-medium line-clamp-2">{course.title}</p>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {course.ratingsAverage?.toFixed(1) || '0.0'} (
              {course.ratingsQuantity || 0})
            </span>
          </Link>
        ))
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No courses yet
        </p>
      )}
    </div>
  );
}

export default TopCourses;
