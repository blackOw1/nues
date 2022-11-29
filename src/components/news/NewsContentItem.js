import { useRef } from 'react';

import classes from 'styles/news/NewsContentItem.module.css';
import Card from 'components/ui/Card';
import dateFormatter from 'utilities/dateFormatter';
import fallbackImage from 'assets/fallback-image.svg';

const NewsContentItem = (props) => {
  const { article } = props;
  const imageRef = useRef();

  // const imageFallbackHandler = (e) => {
  //   e.target.src = fallbackImage;
  // };

  return (
    <li className={classes['news-list-item']}>
      <a href={article.link} target="_blank" rel="noreferrer">
        <Card className={classes['news-list-card']}>
          <div className={classes['news-list-image-container']}>
            <div
              className={classes['news-list-image']}
              ref={imageRef}
              style={{ backgroundImage: `url(${article.media || fallbackImage})` }}
            ></div>
            {/* <img src={article.media} alt="" width="200" height="" onError={imageFallbackHandler} /> */}
          </div>
          <div className={classes['news-list-content']}>
            <h2 className={classes['news-list-title']}>{`${article.title.slice(0, 145)}${
              (article.title.length > 145 && '...') || ''
            }`}</h2>
            <p className={classes['news-list-date']}>{dateFormatter(article.published_date)}</p>
            <p className={classes['news-list-summary']}>
              {article.summary.slice(0, 300) + `${(article.summary.length > 350 && '...') || ''}`}
            </p>
          </div>
        </Card>
      </a>
    </li>
  );
};

export default NewsContentItem;
