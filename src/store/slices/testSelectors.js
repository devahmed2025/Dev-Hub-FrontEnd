//selectors
import { createSelector } from '@reduxjs/toolkit';

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
