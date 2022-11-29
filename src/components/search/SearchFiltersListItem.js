import { useDispatch } from 'react-redux';

import classes from 'styles/search/SearchFiltersListItem.module.css';
import { filtersActions } from 'store/filters-slice';
import { upperCaseFirstCharacter } from 'utilities/textFormatter';

const SearchFiltersListItem = (props) => {
  const dispatch = useDispatch();
  const { categoryName, option } = props;
  const selectedOption = upperCaseFirstCharacter(option);

  const setUserFiltersHandler = () => {
    dispatch(
      filtersActions.setUserSelectedFilter({
        category: categoryName,
        option,
      })
    );

    dispatch(filtersActions.setOptionsCounter());
    dispatch(filtersActions.setCategoryListVisibility({ category: categoryName, option: 'hide' }));
  };

  return (
    <li className={classes['filters-list-section-list-item']} onClick={setUserFiltersHandler}>
      {selectedOption}
    </li>
  );
};

export default SearchFiltersListItem;
