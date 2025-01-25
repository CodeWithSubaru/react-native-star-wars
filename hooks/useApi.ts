import { useEffect, useState } from "react";

const useApi = <T>(
  url: string,
  initialState: T | null = null,
  singleFetch: boolean = false,
  fn: any
) => {
  const [data, setData] = useState<T | null>(initialState);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (singleFetch) {
        setData(data);
        fn(data);
      } else {
        setData(data.results);
      }
    } catch (err) {
      console.log("Error: ", err);
    } finally {
      setLoading(false);
      setRefresh(false);
    }
  };

  const onRefresh = () => {
    setRefresh(true);
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return { data, fetchItems, loading, refresh, onRefresh };
};

export default useApi;
