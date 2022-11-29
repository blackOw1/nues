import { useEffect, useCallback } from 'react';
import { Routes, Route, useLocation, Navigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Layout from 'components/layout/Layout';
import HomeView from 'pages/HomeView';
import SearchView from 'pages/SearchView';
import NotFoundView from 'pages/NotFoundView';
import { pageActions } from 'store/page-slice';
import { themeActions } from 'store/theme-slice';

const App = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const location = useLocation().pathname;
  const currentTheme = useSelector((state) => state.theme);
  const searchParamQuery = searchParams.get('query');
  const { isFirstRun } = useSelector((state) => state.page);

  const getCurrentPage = useCallback(() => {
    const home = '/';
    const results = '/results';
    const notFound = 'notFound';

    if (location === home) return 'home';
    if (location === results) return 'results';

    return notFound;
  }, [location]);

  useEffect(() => {
    const currentPage = getCurrentPage();
    const theme = (currentPage === 'home' && 'dark') || 'light';

    dispatch(pageActions.setPage(currentPage));
    dispatch(themeActions.setTheme(theme));
  }, [dispatch, getCurrentPage]);

  useEffect(() => {
    if (isFirstRun) dispatch(pageActions.setIsFirstRunStatus(false));
  }, [isFirstRun, dispatch]);

  return (
    <div className="App" data-theme={currentTheme.theme}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route
            path="/results"
            element={(searchParamQuery && <SearchView />) || <Navigate replace to="/" />}
          />
          <Route path="*" element={<NotFoundView />} replace />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
