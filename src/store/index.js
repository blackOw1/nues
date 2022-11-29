import { configureStore } from '@reduxjs/toolkit';

import { pageSlice } from './page-slice';
import { querySlice } from './query-slice';
import { themeSlice } from './theme-slice';
import { newsSlice } from './news-slice';
import { filtersSlice } from './filters-slice';

const store = configureStore({
  reducer: {
    page: pageSlice.reducer,
    query: querySlice.reducer,
    theme: themeSlice.reducer,
    news: newsSlice.reducer,
    filters: filtersSlice.reducer,
  },
});

export default store;
