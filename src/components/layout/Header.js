import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import classes from 'styles/layout/Header.module.css';
import { pageActions } from 'store/page-slice';
import { queryActions } from 'store/query-slice';
import { newsActions } from 'store/news-slice';

const Header = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.page);

  const setCurrentPageHandler = () => {
    dispatch(pageActions.setPage('home'));
    dispatch(queryActions.resetQuery());
    dispatch(newsActions.resetState());
  };

  return (
    <header className={classes.header}>
      {!isLoading && (
        <nav>
          <Link to="/" className={classes.logo} onClick={setCurrentPageHandler}>
            nues
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
