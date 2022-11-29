import { createSlice } from '@reduxjs/toolkit';

const initialNewsState = {
  news: [],

  cachedNews: [],

  newsFound: null,

  errorMessage: null,

  pageNumber: 1,

  totalPages: null,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState: initialNewsState,
  reducers: {
    storeNews(state, action) {
      const { data } = action.payload.data;
      const { cachedNews } = action.payload;
      const newResults = [...cachedNews, ...data.articles];

      state.news = newResults;
      state.newsFound = data.total_hits;
      state.totalPages = data.total_pages;
    },

    cacheNews(state, action) {
      state.cachedNews = action.payload;
    },

    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },

    setPageNumber(state, action) {
      state.pageNumber = action.payload;
    },

    clearCachedNews(state) {
      state.cachedNews = [];
    },

    resetState(state) {
      state.news = [];
      state.cachedNews = [];
      state.newsFound = null;
      state.errorMessage = null;
      state.totalPages = null;
      state.pageNumber = 1;
    },
  },
});

export const newsActions = newsSlice.actions;
