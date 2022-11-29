import { createSlice } from '@reduxjs/toolkit';

const initialPageState = {
  currentPage: null,

  isFirstRun: true,

  scrollPosition: null,

  isLoading: false,
};

export const pageSlice = createSlice({
  name: 'page',
  initialState: initialPageState,
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload;
    },

    setIsFirstRunStatus(state, action) {
      state.isFirstRun = action.payload;
    },

    setScrollPosition(state) {
      state.scrollPosition = window.scrollY;
    },

    setLoadingStatus(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const pageActions = pageSlice.actions;
