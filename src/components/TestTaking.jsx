// // TestTaking.jsx
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, useNavigate } from 'react-router-dom';
// import { loadTest, beginTest } from '../store/slices/testSlice';
// import TestContainer from './TestContainer';

// function TestTaking() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { testId } = useParams();
//   const { status, error, test } = useSelector((state) => state.test);

//   useEffect(() => {
//     const initializeTest = async () => {
//       try {
//         await dispatch(loadTest(testId));
//         const result = await dispatch(beginTest(testId));

//         if (result.error) {
//           navigate('/tests', { state: { error: result.error.message } });
//         }
//       } catch (error) {
//         navigate('/tests', { state: { error: 'Failed to initialize test' } });
//       }
//     };

//     initializeTest();

//     return () => {
//       // Cleanup if needed
//     };
//   }, [dispatch, testId, navigate]);

//   if (status === 'loading') return <div>Loading test...</div>;
//   if (status === 'error') return <div>Error: {error}</div>;
//   if (!test) return <div>Test not found</div>;

//   return <TestContainer />;
// }

// export default TestTaking;
