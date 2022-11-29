import { createSlice } from '@reduxjs/toolkit';
import languagesDB from 'db/languages';

const initialFiltersState = {
  isVisible: false,

  category: {
    language: {
      name: 'language',
      isVisible: false,
      options: [...languagesDB.values()].map((entry) => entry.name),
      selectedValue: '',
      defaultValue: 'Select a language',
    },

    pageSize: {
      name: 'pageSize',
      isVisible: false,
      options: ['5', '10', '15', '20', '25'],
      selectedValue: '',
      defaultValue: 'Select a page size',
    },
  },

  optionsCounter: 0,

  reset: false,
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: initialFiltersState,
  reducers: {
    toggleVisibility(state) {
      state.isVisible = !state.isVisible;
    },

    setCategoryListVisibility(state, action) {
      const { category, option } = action.payload;
      let targetValue = null;

      if (option === 'show') targetValue = true;
      if (option === 'hide') targetValue = false;
      if (option === 'toggle') targetValue = !state.category[category].isVisible;

      state.category[category].isVisible = targetValue;
    },

    setUserSelectedFilter(state, action) {
      state.category[action.payload.category].selectedValue = action.payload.option;
    },

    setOptionsCounter(state) {
      if (state.optionsCounter > 0) return;
      state.optionsCounter += 1;
    },

    resetFilters(state) {
      state.category.language.selectedValue = null;
      state.category.pageSize.selectedValue = null;
      state.optionsCounter = 0;
    },

    setReset(state, action) {
      state.reset = action.payload;
    },
  },
});

export const filtersActions = filtersSlice.actions;
