import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [clientApi, setClientApi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setClientApi(result);
      } catch (error) {
        setError(error.message);
        setClientApi(null);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);
  return { clientApi, loading, error };
};

export default useFetch;
