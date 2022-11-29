import { Fragment } from 'react';

import classes from 'styles/layout/Layout.module.css';
import Header from './Header';

const Layout = (props) => {
  return (
    <Fragment>
      <Header />
      <main className={classes.main}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
