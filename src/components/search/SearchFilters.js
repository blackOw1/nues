import { useDispatch, useSelector } from 'react-redux';

import classes from 'styles/search/SearchFilters.module.css';
import Button from 'components/ui/Button';
import languagesDB from 'db/languages';
import { filtersActions } from 'store/filters-slice';
import { newsActions } from 'store/news-slice';
import { queryActions } from 'store/query-slice';
import SearchFiltersList from 'components/search/SearchFiltersList';

const SearchFilters = () => {
  const dispatch = useDispatch();
  const { isVisible, category, optionsCounter } = useSelector((state) => state.filters);
  const { query: userQuery } = useSelector((state) => state.query);
  const filterCategories = Object.values(category);

  const searchWithFiltersHandler = (e) => {
    e.preventDefault();

    dispatch(newsActions.resetState());

    let queryString = '';

    filterCategories.forEach((category) => {
      const { name, selectedValue } = category;

      if (!selectedValue) return;

      if (name === 'language') {
        const isoCode = languagesDB.get(selectedValue).isoCode;
        queryString = `${queryString}&lang=${isoCode}`;
      }

      if (name === 'pageSize') queryString = `${queryString}&page_size=${selectedValue}`;
    });

    dispatch(newsActions.setPageNumber(1));
    dispatch(newsActions.clearCachedNews());

    const newQueryString = `query=${userQuery}${queryString}`;

    dispatch(queryActions.setIsNewSearch(true));

    dispatch(queryActions.setUrlQueryString(newQueryString));

    if (isVisible) dispatch(filtersActions.toggleVisibility());

    dispatch(filtersActions.setReset(true));
  };

  const resetFiltersHandler = (e) => {
    e.preventDefault();

    dispatch(filtersActions.resetFilters());

    filterCategories.forEach((category) =>
      dispatch(
        filtersActions.setCategoryListVisibility({ category: category.name, option: 'hide' })
      )
    );
  };

  return (
    <form onSubmit={searchWithFiltersHandler} className={classes['filters-list']}>
      {filterCategories.map((filterCategory, idx) => (
        <SearchFiltersList filterCategory={filterCategory} key={idx} />
      ))}

      <div className={classes['filters-list-buttons']}>
        <Button className={classes['filters-list-button-apply']} disabled={optionsCounter < 1}>
          Apply filters
        </Button>
        {optionsCounter >= 1 && (
          <Button className={classes['filters-list-button-reset']} onClick={resetFiltersHandler}>
            Reset
          </Button>
        )}
      </div>
    </form>
  );
};

export default SearchFilters;
