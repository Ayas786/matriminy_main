// import axiosInstance from "./RefreshTokenAxios";
import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url, options = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // const res = await axiosInstance.get(url, options); // Pass options to axios.get
        const res = await axios.get(url, options); // Pass options to axios.get
        setData(res.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const reFetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url, options); // Pass options to axios.get
      setData(res.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetchData };
};

export default useFetch;
