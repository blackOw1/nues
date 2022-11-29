import { useSelector, useDispatch } from 'react-redux';

import classes from 'styles/news/NewsContent.module.css';
import Button from 'components/ui/Button';
import NewsContentItem from './NewsContentItem';
import { newsActions } from 'store/news-slice';
import { queryActions } from 'store/query-slice';
import { pageActions } from 'store/page-slice';
import { filtersActions } from 'store/filters-slice';
import { replacePageNumber } from 'utilities/urlFormatter';

const NewsContent = () => {
  const dispatch = useDispatch();
  const {
    news: newsData,
    newsFound,
    pageNumber,
    totalPages: lastPageNumber,
  } = useSelector((state) => state.news);
  const { urlQueryString } = useSelector((state) => state.query);
  const { isVisible: isFiltersSectionIsVisible } = useSelector((state) => state.filters);
  const nextPageNumber = pageNumber + 1;

  const loadMoreContentHandler = (e) => {
    e.preventDefault();

    dispatch(newsActions.cacheNews(newsData));
    dispatch(newsActions.setPageNumber(nextPageNumber));

    const newUrlQueryString = replacePageNumber(urlQueryString, nextPageNumber);

    dispatch(queryActions.setIsNewSearch(true));
    dispatch(queryActions.setUrlQueryString(newUrlQueryString));
    dispatch(pageActions.setScrollPosition());

    if (isFiltersSectionIsVisible) dispatch(filtersActions.toggleVisibility());
  };

  const hasMoreThanTenNews = newsFound > 10;
  const hasNoMorePages = nextPageNumber > lastPageNumber;

  return (
    <>
      <ul className={classes['news-list']}>
        {newsData.map((article, idx) => (
          <NewsContentItem key={idx} article={article} />
        ))}
      </ul>

      {hasMoreThanTenNews && !hasNoMorePages && (
        <Button onClick={loadMoreContentHandler}>Load more</Button>
      )}
    </>
  );
};

export default NewsContent;
