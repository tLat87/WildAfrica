import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        isMusicOn: true, // Initial state: music is on by default
        // Add other settings here if needed, e.g., sound effects volume, language, etc.
    },
    reducers: {
        toggleMusic: (state) => {
            state.isMusicOn = !state.isMusicOn; // Toggle music state
        },
        deleteData: (state) => {
            // This reducer simply acknowledges data deletion.
            // Actual data clearing (e.g., from AsyncStorage) happens in the component.
            console.log('Redux: Data deletion acknowledged.');
            // If you had any data stored directly in this slice that needs clearing, you'd do it here.
            // For now, this slice only manages settings like music state.
        },
    },
});

export const { toggleMusic, deleteData } = settingsSlice.actions;
export default settingsSlice.reducer;
