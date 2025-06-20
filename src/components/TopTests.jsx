import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Award } from 'lucide-react';
import LoadingSpinner from './ui/LoadingSpinner';
import {
  selectTopTests,
  selectFetchTestsStatus,
  selectTestError,
  selectTests,
} from '../store/slices/testSelectors';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const TopTests = ({ isDarkMode }) => {
  const topTests = useSelector(selectTopTests);
  const tests = useSelector(selectTests);
  const fetchTestsStatus = useSelector(selectFetchTestsStatus);
  const error = useSelector(selectTestError);

  useEffect(() => {
    // console.log(
    //   'TopTests - Raw Tests:',
    //   tests,
    //   'Top Tests:',
    //   topTests,
    //   'Status:',
    //   fetchTestsStatus,
    //   'Error:',
    //   error
    // );
    if (error && fetchTestsStatus === 'failed') {
      toast.error(error || 'Failed to load tests');
    }
  }, [tests, topTests, fetchTestsStatus, error]);

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Award className="w-5 h-5 text-purple-500" />
        أفضل الاختبارات
      </h3>
      {fetchTestsStatus === 'loading' ? (
        <LoadingSpinner size="sm" />
      ) : topTests.length > 0 ? (
        topTests.map((test) => (
          <Link
            key={test._id}
            to={`/tests/${test._id}`}
            className="block p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 mb-2"
          >
            <p className="text-sm font-medium line-clamp-2">{test.title}</p>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {test.averageGrade?.toFixed(1) || '0.0'} ({test.attempts || 0}{' '}
              محاولة)
            </span>
          </Link>
        ))
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          لا توجد اختبارات بعد
        </p>
      )}
    </div>
  );
};

export default TopTests;
