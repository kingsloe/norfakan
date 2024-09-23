import axios from 'axios';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store'
import { ENDPOINTS } from '../constants/urls';

const validateCredentials = (username, password) => {
    if (!username || username.trim() === '') {
        Alert.alert('Username is required');
        return false;
    }
    if (!password || password.trim() === '' || password.length < 4) {
        Alert.alert('Invalid Input', 'Password must be at least 4 characters long');
        return false;
    }
    return true;
}


const handleLogin  = async (username, password) => {
    if (!validateCredentials(username, password)) return;
    const baseUrl = ENDPOINTS.getTokenUrl;
    try {
        const response = await axios.post(baseUrl, {
            username: username,
            password: password
        },{ 
            timeout: 10000,
        });
        await storeToken('accessToken', response.data.access);
        await storeToken('refreshToken', response.data.refresh);
        return response.data
    } catch (error) {
        Alert.alert('Login Failed', 
            'Please check your credentials or Internet Connection')
        console.log('Error Login in: ' + error)
        throw error;
    } 
}


const storeToken = async (key, value) => {
    try {
        await SecureStore.setItemAsync(key, value)
        console.log(`Successfuly saved ${key}`)
    } catch (error) {
        console.log(`Error storing ${key}: `, error)
        throw error;
    }
}


const retrieveToken = async (key) => {
    try {
        let result = await SecureStore.getItemAsync(key);
        return result;
    } catch (error) {
        console.log(`Error retrieving ${ key }: `, error)
        throw error;
    }
}

const deleteData = async (key) => {
    try {
        await SecureStore.deleteItemAsync(key)
    } catch (error) {
        console.log('Error deleting token from secure store')
        throw error;
    }
}

export { handleLogin, storeToken, retrieveToken, deleteData };