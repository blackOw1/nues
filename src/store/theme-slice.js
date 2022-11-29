import { createSlice } from '@reduxjs/toolkit';

const initialThemeState = {
  theme: null,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState: initialThemeState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

export const themeActions = themeSlice.actions;
