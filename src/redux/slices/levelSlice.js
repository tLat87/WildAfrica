import { createSlice } from '@reduxjs/toolkit';

const levelSlice = createSlice({
    name: 'levels',
    initialState: {
        completedLevels: [],
    },
    reducers: {
        completeLevel: (state, action) => {
            const level = action.payload;
            if (!state.completedLevels.includes(level)) {
                state.completedLevels.push(level);
            }
        },
        // New reducer to clear all completed levels
        clearLevels: (state) => {
            state.completedLevels = []; // Reset the completedLevels array to empty
        },
    },
});

export const { completeLevel, clearLevels } = levelSlice.actions; // Export the new action
export default levelSlice.reducer;
