import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import styles from 'styles/pages/NotFoundView.module.css';
import Button from 'components/ui/Button';

const NotFoundView = () => {
  const navigate = useNavigate();

  const goToHomeHandler = () => {
    navigate('/');
  };

  return (
    <Fragment>
      <Helmet>
        <title>Page Not Found - nues</title>
      </Helmet>

      <section className={styles['not-found']}>
        <h1>404</h1>
        <p>The page you were looking for does not exist.</p>

        <Button onClick={goToHomeHandler}>Start over</Button>
      </section>
    </Fragment>
  );
};

export default NotFoundView;
