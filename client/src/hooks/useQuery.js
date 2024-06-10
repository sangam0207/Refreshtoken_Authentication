import { useEffect, useState } from "react";
import useAxiosWithTokenRefresh from "./useAxiosWithTokenRefresh";
const useQuery = (apiFunction, { onSuccess, onError } = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const axiosPrivate = useAxiosWithTokenRefresh();
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setError("");
      try {
        const res = await apiFunction();
        setData(res.data);
        if (onSuccess) {
          onSuccess(res.data);
        }
      } catch (error) {
        setIsError(true);
        setError(error.message || "An error occurred");
        if (onError) {
          onError(error);
        }
      }
    };
    fetchData();
  }, [axiosPrivate]);

  return { data, isError, error };
};

export default useQuery;
