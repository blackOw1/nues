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
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== 'success') throw new Error(data.message);

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
