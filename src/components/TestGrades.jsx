// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { loadTestGrades } from '../store/slices/testSlice';

// const TestGrades = () => {
//   const dispatch = useDispatch();
//   const { testId } = useParams();
//   const { grades, test, status, error } = useSelector((state) => state.test);

//   useEffect(() => {
//     dispatch(loadTestGrades(testId));
//   }, [dispatch, testId]);

//   if (status === 'loading') return <div>Loading grades...</div>;
//   if (status === 'error') return <div>Error: {error}</div>;

//   return (
//     <div className="test-grades">
//       <h2>Grades for {test?.title || 'Test'}</h2>

//       <div className="grades-table">
//         <table>
//           <thead>
//             <tr>
//               <th>Student</th>
//               <th>Email</th>
//               <th>Score</th>
//               <th>Time Taken (min)</th>
//               <th>Completed At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {grades.map((grade) => (
//               <tr key={grade._id}>
//                 <td>{grade.name}</td>
//                 <td>{grade.email}</td>
//                 <td>{grade.score}</td>
//                 <td>{(grade.timeTaken / 60).toFixed(2)}</td>
//                 <td>{new Date(grade.completedAt).toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {grades.length === 0 && <p>No grades available for this test yet.</p>}
//       </div>
//     </div>
//   );
// };

// export default TestGrades;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadTestGrades } from '../store/slices/testSlice';

const TestGrades = () => {
  const dispatch = useDispatch();
  const { testId } = useParams();
  const {
    grades = [],
    test,
    status,
    error,
  } = useSelector((state) => state.test);

  useEffect(() => {
    dispatch(loadTestGrades(testId));
  }, [dispatch, testId]);

  if (status === 'loading') return <div>Loading grades...</div>;
  if (status === 'error') return <div>Error: {error}</div>;

  return (
    <div className="test-grades">
      <h2>Grades for {test?.title || 'Test'}</h2>

      <div className="grades-table">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Email</th>
              <th>Score</th>
              <th>Time Taken (min)</th>
              <th>Completed At</th>
            </tr>
          </thead>
          <tbody>
            {grades?.length > 0 ? (
              grades.map((grade) => (
                <tr key={grade._id}>
                  <td>{grade.name}</td>
                  <td>{grade.email}</td>
                  <td>{grade.score}</td>
                  <td>{(grade.timeTaken / 60).toFixed(2)}</td>
                  <td>{new Date(grade.completedAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No grades available for this test yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestGrades;
