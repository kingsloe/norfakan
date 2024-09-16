import * as SecureStore from 'expo-secure-store';

const storeData = async (key, value) => {
	try {
		const stringifiedData = JSON.stringify(value);
		await SecureStore.setItemAsync(key, stringifiedData);
		console.log(`successfully stored ${key}`)
	}catch (error) {
		console.log(`Error storing ${key}: `, error);
	}
};

const retrieveData = async (key) => {
	try {
		const response = await SecureStore.getItemAsync(key);
		if (response) {
			console.log(`successfully retrieved ${key}`)
			return JSON.parse(response);
		}
		
		console.log(`No data found for key: ${key}`);
        return null;
	}catch (error) {
		console.log(`Error retriving ${key}: `, error);
		return null;
	}
};

export { storeData, retrieveData }