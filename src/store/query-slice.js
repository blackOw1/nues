import { createSlice } from '@reduxjs/toolkit';

import { lowerCase } from 'utilities/textFormatter';

const initialQueryState = {
  query: null,

  urlQueryString: null,

  isNewSearch: false,
};

export const querySlice = createSlice({
  name: 'query',
  initialState: initialQueryState,
  reducers: {
    setQuery(state, action) {
      let query = lowerCase(action.payload);
      state.query = query;
    },

    setUrlQueryString(state, action) {
      state.urlQueryString = action.payload.replace('query', 'q');
    },

    setIsNewSearch(state, action) {
      state.isNewSearch = action.payload;
    },

    resetQuery(state) {
      state.query = null;
    },
  },
});

export const queryActions = querySlice.actions;
