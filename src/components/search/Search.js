import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import classes from 'styles/search/Search.module.css';
import Input from 'components/ui/Input';
import Icon from 'components/ui/Icon';
import { queryActions } from 'store/query-slice';
import { newsActions } from 'store/news-slice';
import { filtersActions } from 'store/filters-slice';
import { modifyQueryString } from 'utilities/textFormatter';

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isVisible: isFiltersVisible } = useSelector((state) => state.filters);
  const { query: storedUserQuery } = useSelector((state) => state.query);

  const submitFormHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    let userQuery = formData.get('query');

    if (!userQuery) return;

    userQuery = modifyQueryString(userQuery);

    dispatch(newsActions.resetState());

    dispatch(filtersActions.setReset(true));

    dispatch(queryActions.setIsNewSearch(true));

    dispatch(queryActions.setQuery(userQuery));

    dispatch(queryActions.setUrlQueryString(`query=${userQuery}`));

    navigate(`/results?query=${userQuery.replaceAll(' ', '+')}`);

    if (isFiltersVisible) dispatch(filtersActions.toggleVisibility());

    dispatch(filtersActions.resetFilters());

    e.target.firstChild.value = userQuery;
    e.target.firstChild.blur();
  };
  return (
    <div className={classes['search-container']}>
      <div className={classes.search}>
        <Icon className="icon-search" icon="search" />
        <form onSubmit={submitFormHandler}>
          <Input
            className={classes['search-input']}
            id="input"
            type="text"
            placeholder="Search"
            autoComplete="off"
            name="query"
            defaultValue={storedUserQuery || ''}
          />
        </form>
      </div>
    </div>
  );
};

export default Search;
