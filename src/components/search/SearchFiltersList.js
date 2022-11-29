import { useDispatch, useSelector } from 'react-redux';

import classes from 'styles/search/SearchFiltersList.module.css';
import Icon from 'components/ui/Icon';
import { lowerCase, upperCaseFirstCharacter } from 'utilities/textFormatter';
import { filtersActions } from 'store/filters-slice';
import SearchFiltersListItem from './SearchFiltersListItem';

const SearchFiltersList = (props) => {
  const dispatch = useDispatch();
  const filterCategories = useSelector((state) => state.filters.category);
  const { filterCategory } = props;
  const { name, isVisible: isFilterCategoryVisible, options, defaultValue } = filterCategory;
  const categoryName = lowerCase(name);
  const labelName = upperCaseFirstCharacter(`${name[0]}${name.slice(1)}`).replace('Page', 'Page ');
  const selectedValue =
    filterCategory.selectedValue && upperCaseFirstCharacter(filterCategory.selectedValue);

  const toggleOptionsList = (e) => {
    const selectedElement = e.target.closest('div');

    Object.values(filterCategories).forEach((category) => {
      if (selectedElement.id === lowerCase(category.name)) return;

      dispatch(
        filtersActions.setCategoryListVisibility({ category: category.name, option: 'hide' })
      );
    });

    dispatch(filtersActions.setCategoryListVisibility({ category: name, option: 'toggle' }));
  };

  return (
    <fieldset className={classes['filters-list-section']}>
      <label>{labelName}</label>

      <div id={categoryName} className={classes.box} onClick={toggleOptionsList}>
        <span data-category={categoryName}>{selectedValue || defaultValue}</span>
        <Icon icon="chevron-down" className={classes['icon-down-arrow']} />
      </div>

      {isFilterCategoryVisible && (
        <div className={classes['filters-list-section-list-container']}>
          <ul className={classes['filters-list-section-list']}>
            {options.map((option, idx) => (
              <SearchFiltersListItem categoryName={name} option={option} key={idx} />
            ))}
          </ul>
        </div>
      )}
    </fieldset>
  );
};

export default SearchFiltersList;
