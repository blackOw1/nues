import { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import classes from 'styles/pages/HomeView.module.css';
import Search from 'components/search/Search';

const HomeView = () => {
  return (
    <Fragment>
      <Helmet>
        <title>nues</title>
      </Helmet>
      <h1 className={classes.title}>
        What will you <span className={classes['title-highlight']}>search</span> for today?
      </h1>
      <Search />
    </Fragment>
  );
};

export default HomeView;
