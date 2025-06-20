// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import {
//   fetchTestDetails,
//   startTest,
//   submitTest,
//   createTest,
//   updateTest,
//   deleteTest,
//   fetchTestGrades,
//   fetchCategories,
//   createCategory,
//   fetchTests,
// } from '../../api/api.js';

// const TEST_STATE_KEY = 'testState';

// // Load persisted state from localStorage
// const loadPersistedState = () => {
//   try {
//     const serializedState = localStorage.getItem(TEST_STATE_KEY);
//     if (serializedState) {
//       const state = JSON.parse(serializedState);
//       console.log('Loaded Persisted State:', state);
//       if (
//         state.test &&
//         Array.isArray(state.answers) &&
//         typeof state.currentQuestionIndex === 'number' &&
//         ['idle', 'loading', 'started', 'submitted', 'error'].includes(
//           state.status
//         )
//       ) {
//         return state;
//       }
//     }
//   } catch (err) {
//     console.error('Failed to load persisted state:', err);
//   }
//   return undefined;
// };

// const initialState = loadPersistedState() || {
//   test: null,
//   currentQuestionIndex: 0,
//   answers: [],
//   status: 'idle', // 'idle' | 'loading' | 'started' | 'submitted' | 'error'
//   error: null,
//   timer: 0,
//   startTime: null,
//   results: null,
//   categories: [],
//   tests: [],
//   grades: [],
//   createTestStatus: 'idle',
//   createCategoryStatus: 'idle',
//   updateTestStatus: 'idle',
//   deleteTestStatus: 'idle',
//   fetchTestsStatus: 'idle', // New field for fetching all tests
// };

// // Save state to localStorage
// const saveState = (state) => {
//   try {
//     const stateToPersist = {
//       test: state.test,
//       currentQuestionIndex: state.currentQuestionIndex,
//       answers: state.answers,
//       timer: state.timer,
//       startTime: state.startTime,
//       status: state.status,
//     };
//     console.log('Saving State:', stateToPersist);
//     localStorage.setItem(TEST_STATE_KEY, JSON.stringify(stateToPersist));
//   } catch (err) {
//     console.error('Failed to save state:', err);
//   }
// };

// // Thunks
// export const loadTest = createAsyncThunk(
//   'test/loadTest',
//   async (testId, { rejectWithValue }) => {
//     try {
//       const response = await fetchTestDetails(testId);
//       return response.test; // Adjusted for API response: response.data.test
//     } catch (err) {
//       return rejectWithValue(err.message || 'Failed to load test');
//     }
//   }
// );

// export const beginTest = createAsyncThunk(
//   'test/beginTest',
//   async (testId, { rejectWithValue }) => {
//     try {
//       const response = await startTest(testId);
//       console.log('beginTest Response:', response.data);
//       return {
//         remainingTime: response.data.remainingTime * 60, // Convert minutes to seconds
//         startTime: response.data.startTime,
//       };
//     } catch (err) {
//       return rejectWithValue(err.message || 'Failed to start the test');
//     }
//   }
// );

// export const finalizeTest = createAsyncThunk(
//   'test/finalizeTest',
//   async ({ testId, answers }, { rejectWithValue }) => {
//     try {
//       const response = await submitTest(testId, answers);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.message || 'Failed to submit test');
//     }
//   }
// );

// export const loadCategories = createAsyncThunk(
//   'test/loadCategories',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetchCategories();
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.message || 'Failed to load categories');
//     }
//   }
// );

// export const addCategory = createAsyncThunk(
//   'test/addCategory',
//   async (categoryData, { rejectWithValue }) => {
//     try {
//       const response = await createCategory(categoryData);
//       return response.data.data || response.data; // Handle both response structures
//     } catch (err) {
//       return rejectWithValue(err.message || 'Failed to create category');
//     }
//   }
// );

// export const addTest = createAsyncThunk(
//   'test/addTest',
//   async (testData, { rejectWithValue }) => {
//     try {
//       const response = await createTest(testData);
//       return response.data.data || response.data; // Handle both response structures
//     } catch (err) {
//       return rejectWithValue(err.message || 'Failed to create test');
//     }
//   }
// );

// export const editTest = createAsyncThunk(
//   'test/editTest',
//   async ({ testId, testData }, { rejectWithValue }) => {
//     try {
//       const response = await updateTest(testId, testData);
//       return { testId, test: response.data.test };
//     } catch (err) {
//       return rejectWithValue(err.message || 'Failed to update test');
//     }
//   }
// );

// export const removeTest = createAsyncThunk(
//   'test/removeTest',
//   async (testId, { rejectWithValue }) => {
//     try {
//       await deleteTest(testId);
//       return testId;
//     } catch (err) {
//       return rejectWithValue(err.message || 'Failed to delete test');
//     }
//   }
// );

// export const loadTestGrades = createAsyncThunk(
//   'test/loadTestGrades',
//   async (testId, { rejectWithValue }) => {
//     try {
//       const response = await fetchTestGrades(testId);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.message || 'Failed to load grades');
//     }
//   }
// );

// // Thunks
// export const fetchAllTests = createAsyncThunk(
//   'test/fetchTests',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetchTests();
//       return response.data.data || response.data; // Handle both response structures
//     } catch (err) {
//       return rejectWithValue(err.message || 'Failed to fetch tests');
//     }
//   }
// );

// const testSlice = createSlice({
//   name: 'test',
//   initialState,
//   reducers: {
//     setTest: (state, action) => {
//       state.test = action.payload;
//       if (state.status !== 'started') {
//         state.status = 'idle';
//         state.currentQuestionIndex = 0;
//         state.timer = 0;
//         state.startTime = null;
//         state.results = null;
//       }
//       state.answers =
//         state.answers ||
//         Array(action.payload.questions?.length || 0).fill(null);
//       saveState(state);
//     },
//     setAnswer: (state, action) => {
//       const { questionIndex, selectedOptionIndex } = action.payload;
//       if (!state.answers) state.answers = [];
//       if (
//         questionIndex >= 0 &&
//         questionIndex < (state.test?.questions?.length || 0)
//       ) {
//         state.answers[questionIndex] = {
//           questionIndex,
//           selectedOptionIndex,
//         };
//         saveState(state);
//       }
//     },
//     nextQuestion: (state) => {
//       if (state.currentQuestionIndex < state.test.questions.length - 1) {
//         state.currentQuestionIndex += 1;
//         saveState(state);
//       }
//     },
//     prevQuestion: (state) => {
//       if (state.currentQuestionIndex > 0) {
//         state.currentQuestionIndex -= 1;
//         saveState(state);
//       }
//     },
//     updateTimer: (state) => {
//       if (state.timer > 0) {
//         state.timer -= 1;
//         saveState(state);
//       }
//     },
//     resetTest: (state) => {
//       localStorage.removeItem(TEST_STATE_KEY);
//       state.test = null;
//       state.currentQuestionIndex = 0;
//       state.answers = [];
//       state.status = 'idle';
//       state.error = null;
//       state.timer = 0;
//       state.startTime = null;
//       state.results = null;
//     },
//     resetCreateStatus: (state) => {
//       state.createTestStatus = 'idle';
//       state.createCategoryStatus = 'idle';
//       state.updateTestStatus = 'idle';
//       state.deleteTestStatus = 'idle';
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loadTest.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(loadTest.fulfilled, (state, action) => {
//         state.status = 'idle';
//         state.test = action.payload;
//         state.answers =
//           state.answers ||
//           Array(action.payload.questions?.length || 0).fill(null);
//         saveState(state);
//       })
//       .addCase(loadTest.rejected, (state, action) => {
//         state.status = 'error';
//         state.error = action.payload;
//       })
//       .addCase(beginTest.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(beginTest.fulfilled, (state, action) => {
//         state.status = 'started';
//         state.timer = action.payload.remainingTime;
//         state.startTime = action.payload.startTime;
//         saveState(state);
//       })
//       .addCase(beginTest.rejected, (state, action) => {
//         state.status = 'error';
//         state.error = action.payload;
//       })
//       .addCase(finalizeTest.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(finalizeTest.fulfilled, (state, action) => {
//         state.status = 'submitted';
//         state.results = action.payload;
//         state.timer = 0;
//         state.startTime = null;
//         localStorage.removeItem(TEST_STATE_KEY);
//       })
//       .addCase(finalizeTest.rejected, (state, action) => {
//         state.status = 'error';
//         state.error = action.payload;
//       })
//       .addCase(loadCategories.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(loadCategories.fulfilled, (state, action) => {
//         state.status = 'idle';
//         state.categories = action.payload;
//       })
//       .addCase(loadCategories.rejected, (state, action) => {
//         state.status = 'error';
//         state.error = action.payload;
//       })
//       .addCase(addCategory.pending, (state) => {
//         state.createCategoryStatus = 'loading';
//       })
//       .addCase(addCategory.fulfilled, (state, action) => {
//         state.createCategoryStatus = 'succeeded';
//         state.categories = Array.isArray(state.categories)
//           ? state.categories
//           : [];
//         state.categories.push(action.payload);
//       })
//       .addCase(addCategory.rejected, (state, action) => {
//         state.createCategoryStatus = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(addTest.pending, (state) => {
//         state.createTestStatus = 'loading';
//         state.error = null;
//       })
//       .addCase(addTest.fulfilled, (state, action) => {
//         state.createTestStatus = 'succeeded';
//         state.tests = Array.isArray(state.tests) ? state.tests : [];
//         state.tests.push(action.payload);
//       })
//       .addCase(addTest.rejected, (state, action) => {
//         state.createTestStatus = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(editTest.pending, (state) => {
//         state.updateTestStatus = 'loading';
//       })
//       .addCase(editTest.fulfilled, (state, action) => {
//         state.updateTestStatus = 'succeeded';
//         if (Array.isArray(state.tests)) {
//           const index = state.tests.findIndex(
//             (t) => t._id === action.payload.testId
//           );
//           if (index !== -1) {
//             state.tests[index] = action.payload.test;
//           } else {
//             state.tests.push(action.payload.test);
//           }
//         } else {
//           state.tests = [action.payload.test];
//         }
//       })
//       .addCase(editTest.rejected, (state, action) => {
//         state.updateTestStatus = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(removeTest.pending, (state) => {
//         state.deleteTestStatus = 'loading';
//       })
//       .addCase(removeTest.fulfilled, (state, action) => {
//         state.deleteTestStatus = 'succeeded';
//         state.tests =
//           state.tests?.filter((t) => t._id !== action.payload) || [];
//       })
//       .addCase(removeTest.rejected, (state, action) => {
//         state.deleteTestStatus = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(loadTestGrades.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(loadTestGrades.fulfilled, (state, action) => {
//         state.status = 'idle';
//         state.grades = action.payload.grades;
//       })
//       .addCase(loadTestGrades.rejected, (state, action) => {
//         state.status = 'error';
//         state.error = action.payload;
//       }) .addCase(fetchTests.pending, (state) => {
//         state.fetchTestsStatus = 'loading';
//       })
//       .addCase(fetchTests.fulfilled, (state, action) => {
//         state.fetchTestsStatus = 'succeeded';
//         state.tests = action.payload;
//       })
//       .addCase(fetchTests.rejected, (state, action) => {
//         state.fetchTestsStatus = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export const {
//   setAnswer,
//   setTest,
//   nextQuestion,
//   prevQuestion,
//   updateTimer,
//   resetTest,
//   resetCreateStatus,
// } = testSlice.actions;

// export default testSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';

import {
  fetchTestDetails,
  startTest,
  submitTest,
  createTest,
  updateTest,
  deleteTest,
  fetchTestGrades,
  fetchCategories,
  createCategory,
  fetchTests,
} from '../../api/api.js';

const TEST_STATE_KEY = 'testState';

// Load persisted state from localStorage
const loadPersistedState = () => {
  try {
    const serializedState = localStorage.getItem(TEST_STATE_KEY);
    if (serializedState) {
      const state = JSON.parse(serializedState);
      // console.log('Loaded Persisted State:', state);
      if (
        state.test &&
        Array.isArray(state.answers) &&
        typeof state.currentQuestionIndex === 'number' &&
        ['idle', 'loading', 'started', 'submitted', 'error'].includes(
          state.status
        )
      ) {
        // Initialize answers array if length doesn't match questions
        if (
          state.test.questions &&
          state.answers.length !== state.test.questions.length
        ) {
          state.answers = Array(state.test.questions.length).fill(null);
        }
        return state;
      }
    }
  } catch (err) {
    console.error('Failed to load persisted state:', err);
  }
  return undefined;
};

const initialState = loadPersistedState() || {
  test: null,
  currentQuestionIndex: 0,
  answers: [],
  status: 'idle', // 'idle' | 'loading' | 'started' | 'submitted' | 'error'
  error: null,
  timer: 0,
  startTime: null,
  results: null,
  categories: [],
  tests: [],
  grades: [],
  createTestStatus: 'idle',
  createCategoryStatus: 'idle',
  updateTestStatus: 'idle',
  deleteTestStatus: 'idle',
  fetchTestsStatus: 'idle',
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const stateToPersist = {
      test: state.test,
      currentQuestionIndex: state.currentQuestionIndex,
      answers: state.answers,
      timer: state.timer,
      startTime: state.startTime,
      status: state.status,
    };
    // console.log('Saving State:', stateToPersist);
    localStorage.setItem(TEST_STATE_KEY, JSON.stringify(stateToPersist));
  } catch (err) {
    console.error('Failed to save state:', err);
  }
};

// Thunks (defined before createSlice)
export const loadTest = createAsyncThunk(
  'test/loadTest',
  async (testId, { rejectWithValue }) => {
    try {
      const response = await fetchTestDetails(testId);
      return response.data.test; // Adjusted for API response structure
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load test');
    }
  }
);

export const beginTest = createAsyncThunk(
  'test/beginTest',
  async (testId, { rejectWithValue }) => {
    try {
      const response = await startTest(testId);
      // console.log('beginTest Response:', response.data);
      return {
        remainingTime: response.data.remainingTime * 60, // Convert minutes to seconds
        startTime: response.data.startTime,
      };
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to start the test');
    }
  }
);

export const finalizeTest = createAsyncThunk(
  'test/finalizeTest',
  async ({ testId, answers }, { rejectWithValue }) => {
    try {
      const response = await submitTest(testId, answers);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to submit test');
    }
  }
);

export const loadCategories = createAsyncThunk(
  'test/loadCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCategories();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load categories');
    }
  }
);

export const addCategory = createAsyncThunk(
  'test/addCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await createCategory(categoryData);
      return response.data.data || response.data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to create category');
    }
  }
);

export const addTest = createAsyncThunk(
  'test/addTest',
  async (testData, { rejectWithValue }) => {
    try {
      const response = await createTest(testData);
      return response.data.data || response.data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to create test');
    }
  }
);

export const editTest = createAsyncThunk(
  'test/editTest',
  async ({ testId, testData }, { rejectWithValue }) => {
    try {
      const response = await updateTest(testId, testData);
      return { testId, test: response.data.test };
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to update test');
    }
  }
);

export const removeTest = createAsyncThunk(
  'test/removeTest',
  async (testId, { rejectWithValue }) => {
    try {
      await deleteTest(testId);
      return testId;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to delete test');
    }
  }
);

export const loadTestGrades = createAsyncThunk(
  'test/loadTestGrades',
  async (testId, { rejectWithValue }) => {
    try {
      const response = await fetchTestGrades(testId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load grades');
    }
  }
);

export const fetchAllTests = createAsyncThunk(
  'test/fetchAllTests',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchTests();
      // console.log('fetchAllTests Response:', response);
      return response.data; // Return the test array: [{ _id, title, ... }, ...]
    } catch (err) {
      // console.error('fetchAllTests Error:', err.message);
      return rejectWithValue(err.message || 'Failed to fetch tests');
    }
  }
);

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setTest: (state, action) => {
      state.test = action.payload;
      if (state.status !== 'started') {
        state.status = 'idle';
        state.currentQuestionIndex = 0;
        state.timer = 0;
        state.startTime = null;
        state.results = null;
      }
      state.answers = Array(action.payload.questions?.length || 0).fill(null);
      saveState(state);
    },
    setAnswer: (state, action) => {
      const { questionIndex, selectedOptionIndex } = action.payload;
      if (
        questionIndex >= 0 &&
        questionIndex < (state.test?.questions?.length || 0)
      ) {
        state.answers[questionIndex] = {
          questionIndex,
          selectedOptionIndex,
        };
        saveState(state);
      }
    },
    nextQuestion: (state) => {
      if (
        state.currentQuestionIndex <
        (state.test?.questions?.length || 0) - 1
      ) {
        state.currentQuestionIndex += 1;
        saveState(state);
      }
    },
    prevQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
        saveState(state);
      }
    },
    updateTimer: (state) => {
      if (state.timer > 0) {
        state.timer -= 1;
        saveState(state);
      }
    },
    resetTest: (state) => {
      localStorage.removeItem(TEST_STATE_KEY);
      state.test = null;
      state.currentQuestionIndex = 0;
      state.answers = [];
      state.status = 'idle';
      state.error = null;
      state.timer = 0;
      state.startTime = null;
      state.results = null;
    },
    resetCreateStatus: (state) => {
      state.createTestStatus = 'idle';
      state.createCategoryStatus = 'idle';
      state.updateTestStatus = 'idle';
      state.deleteTestStatus = 'idle';
      state.fetchTestsStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadTest.fulfilled, (state, action) => {
        state.status = 'idle';
        state.test = action.payload;
        state.answers = Array(action.payload.questions?.length || 0).fill(null);
        saveState(state);
      })
      .addCase(loadTest.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(beginTest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(beginTest.fulfilled, (state, action) => {
        state.status = 'started';
        state.timer = action.payload.remainingTime;
        state.startTime = action.payload.startTime;
        saveState(state);
      })
      .addCase(beginTest.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(finalizeTest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(finalizeTest.fulfilled, (state, action) => {
        state.status = 'submitted';
        state.results = action.payload;
        state.timer = 0;
        state.startTime = null;
        localStorage.removeItem(TEST_STATE_KEY);
      })
      .addCase(finalizeTest.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(loadCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(addCategory.pending, (state) => {
        state.createCategoryStatus = 'loading';
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.createCategoryStatus = 'succeeded';
        state.categories = Array.isArray(state.categories)
          ? state.categories
          : [];
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.createCategoryStatus = 'failed';
        state.error = action.payload;
      })
      .addCase(addTest.pending, (state) => {
        state.createTestStatus = 'loading';
        state.error = null;
      })
      .addCase(addTest.fulfilled, (state, action) => {
        state.createTestStatus = 'succeeded';
        state.tests = Array.isArray(state.tests) ? state.tests : [];
        state.tests.push(action.payload);
      })
      .addCase(addTest.rejected, (state, action) => {
        state.createTestStatus = 'failed';
        state.error = action.payload;
      })
      .addCase(editTest.pending, (state) => {
        state.updateTestStatus = 'loading';
      })
      .addCase(editTest.fulfilled, (state, action) => {
        state.updateTestStatus = 'succeeded';
        if (Array.isArray(state.tests)) {
          const index = state.tests.findIndex(
            (t) => t._id === action.payload.testId
          );
          if (index !== -1) {
            state.tests[index] = action.payload.test;
          } else {
            state.tests.push(action.payload.test);
          }
        } else {
          state.tests = [action.payload.test];
        }
      })
      .addCase(editTest.rejected, (state, action) => {
        state.updateTestStatus = 'failed';
        state.error = action.payload;
      })
      .addCase(removeTest.pending, (state) => {
        state.deleteTestStatus = 'loading';
      })
      .addCase(removeTest.fulfilled, (state, action) => {
        state.deleteTestStatus = 'succeeded';
        state.tests =
          state.tests?.filter((t) => t._id !== action.payload) || [];
      })
      .addCase(removeTest.rejected, (state, action) => {
        state.deleteTestStatus = 'failed';
        state.error = action.payload;
      })
      .addCase(loadTestGrades.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadTestGrades.fulfilled, (state, action) => {
        state.status = 'idle';
        state.grades = action.payload.grades;
      })
      .addCase(loadTestGrades.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(fetchAllTests.pending, (state) => {
        state.fetchTestsStatus = 'loading';
      })
      .addCase(fetchAllTests.fulfilled, (state, action) => {
        state.fetchTestsStatus = 'succeeded';
        state.tests = action.payload;
      })
      .addCase(fetchAllTests.rejected, (state, action) => {
        state.fetchTestsStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export const {
  setAnswer,
  setTest,
  nextQuestion,
  prevQuestion,
  updateTimer,
  resetTest,
  resetCreateStatus,
} = testSlice.actions;

export default testSlice.reducer;

//selectors

const selectTestState = (state) => state.test || {};

// Basic selectors
export const selectTests = (state) => selectTestState(state).tests || [];
export const selectFetchTestsStatus = (state) =>
  selectTestState(state).fetchTestsStatus || 'idle';
export const selectTestError = (state) => selectTestState(state).error || null;

// Derived selector for top tests
export const selectTopTests = createSelector([selectTests], (tests) => {
  if (!Array.isArray(tests)) return [];
  return [...tests]
    .sort((a, b) => (b.averageGrade || 0) - (a.averageGrade || 0))
    .slice(0, 3);
});
