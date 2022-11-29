import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setData(null);

    if (!url) {
      setIsLoading(false);
      return;
    }

    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch content. Please try again later.');
        return res.json();
      })
      .then((data) => {
        if (data.status === 429) throw new Error(data.data.message);
        if (data.status !== 'ok') throw new Error('No results were found for your search');

        setTimeout(() => {
          setData(data);
          setIsLoading(false);
          setError(null);
        }, 1000);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
        setData(null);
      });
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
