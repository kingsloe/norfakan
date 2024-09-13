import { ENDPOINTS } from '../constants/urls';
import axiosInstance from '../lib/axiosInstance';

const fetchDataFromApi = async(url) => {
	try {
		const response = await axiosInstance.get(url);
		return response.data;
	} catch (error) {
		console.log(`${errorMessage}: `, error);
		return null;
	}
}

export default fetchDataFromApi;