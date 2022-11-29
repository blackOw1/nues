import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import classes from 'styles/pages/SearchView.module.css';
import Button from 'components/ui/Button';
import Icon from 'components/ui/Icon';
import Search from 'components/search/Search';
import Throbber from 'components/ui/Throbber';
import useFetch from 'hooks/useFetch';
import NewsContent from 'components/news/NewsContent';
import SearchFilters from 'components/search/SearchFilters';
import { filtersActions } from 'store/filters-slice';
import { queryActions } from 'store/query-slice';
import { pageActions } from 'store/page-slice';
import { newsActions } from 'store/news-slice';
import { modifyQueryString } from 'utilities/textFormatter';

const SearchView = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const userQuery = modifyQueryString(searchParams.get('query'));
  const { isFirstRun } = useSelector((state) => state.page);
  const { urlQueryString, isNewSearch, query } = useSelector((state) => state.query);
  const BASE_URL = 'https://devgerardoortiz.com/apis/newscatcher';
  const url = (isNewSearch && `${BASE_URL}/search?${urlQueryString}`) || null;
  const { data, isLoading, error: errorMessage } = useFetch(url);
  const { newsFound: totalNewsFound, cachedNews } = useSelector((state) => state.news);
  const { isVisible, category } = useSelector((state) => state.filters);
  const { scrollPosition, isLoading: isPageLoading } = useSelector((state) => state.page);
  const filterCategories = Object.values(category);

  useEffect(() => {
    if (isNewSearch) dispatch(pageActions.setScrollPosition());
  }, [isNewSearch, dispatch]);

  const initSearch = useCallback(() => {
    dispatch(queryActions.setIsNewSearch(true));
    dispatch(queryActions.setQuery(userQuery));
    dispatch(queryActions.setUrlQueryString(`query=${userQuery}`));
    dispatch(pageActions.setIsFirstRunStatus(false));
  }, [dispatch, userQuery]);

  useEffect(() => {
    dispatch(pageActions.setLoadingStatus(isLoading));
  }, [dispatch, isLoading]);

  useEffect(() => {
    const isUserChangingPageLocation = userQuery && userQuery !== query;

    if (isUserChangingPageLocation) {
      dispatch(newsActions.resetState());
      dispatch(pageActions.setLoadingStatus(true));
      initSearch();
    }
  }, [userQuery, query, dispatch, initSearch]);

  useEffect(() => {
    if (isFirstRun) {
      initSearch();
      setSearchParams(`query=${userQuery}`);
    }
  }, [isFirstRun, dispatch, setSearchParams, userQuery, initSearch]);

  useEffect(() => {
    if (data?.status === 'ok') {
      dispatch(newsActions.storeNews({ data, cachedNews }));
      dispatch(pageActions.setLoadingStatus(false));
    }

    if (scrollPosition > 0) {
      window.scrollTo(0, scrollPosition);
    }
  }, [data, dispatch, cachedNews, scrollPosition]);

  useEffect(() => {
    if ((data && !isLoading) || (!isFirstRun && !isLoading)) {
      dispatch(queryActions.setIsNewSearch(false));
    }
  }, [dispatch, isLoading, data, isFirstRun]);

  const filtersHandler = () => {
    dispatch(filtersActions.toggleVisibility());

    filterCategories.forEach((category) => {
      dispatch(
        filtersActions.setCategoryListVisibility({ category: category.name, option: 'hide' })
      );
    });
  };

  const NewsContentMarkup = (
    <>
      <div className={classes['filters-lane']}>
        <Button className={classes['filters-button']} onClick={filtersHandler}>
          <Icon className={classes['icon-filters']} icon="filters" />
          Filters
        </Button>
      </div>
      {isVisible && <SearchFilters />}
      <NewsContent />
    </>
  );

  const resultsFound =
    totalNewsFound > 0 &&
    `${totalNewsFound} result${(totalNewsFound > 1 && 's were') || ' was'} found`;

  return (
    <>
      {!isLoading && !isPageLoading && (
        <div className={classes['search-tab']}>
          <Search />
          <div className={classes['results-lane']}>
            {!isLoading && !errorMessage && (
              <p className={classes['search-results-text']}>{resultsFound}</p>
            )}
            {errorMessage && <p className={classes['search-results-text']}>{errorMessage}</p>}
          </div>
        </div>
      )}

      {(isLoading || isPageLoading) && <Throbber />}

      {!isLoading && !errorMessage && totalNewsFound && !isPageLoading && NewsContentMarkup}
    </>
  );
};

export default SearchView;
