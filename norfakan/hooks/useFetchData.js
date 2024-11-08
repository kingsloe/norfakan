// useFetchData.js
import { useEffect, useState } from 'react';
import useAxios from '../lib/axiosInstance';

const useFetchData = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const axiosInstance = useAxios(); // Get the axios instance from the hook

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(url);
                console.log('Response from useFetchData: ', response.data);
                setData(response.data);
            } catch (error) {
                setError(`Error fetching data from ${url}: ${error.message}`);
            }
        };

        fetchData();
    }, [url, axiosInstance]);

    return { data, error };
};

export default useFetchData;
