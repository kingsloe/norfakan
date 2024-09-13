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
        saveToken('accessToken', response.data.access);
        saveToken('refreshToken', response.data.refresh);
        return response.data
    } catch (error) {
        Alert.alert('Login Failed', 
            'Please check your credentials or Internet Connection')
        console.log('Error Login in: ' + error)
        throw error;
    } 
}


const saveToken = async (key, value) => {
    try {
        await SecureStore.setItemAsync(key, value)
    } catch (error) {
        console.log('Error saving token to secure store')
        throw error;
    }
}


const retrieveToken = async (key) => {
    try {
        let retrievedToken = await SecureStore.getItemAsync(key);
        return retrievedToken;
    } catch (error) {
        console.log('Error retrieving token from secure store')
        throw error;
    }
}

const deleteToken = async (key) => {
    try {
        await SecureStore.deleteItemAsync(key)
    } catch (error) {
        console.log('Error deleting token from secure store')
        throw error;
    }
}

export { handleLogin, saveToken, retrieveToken, deleteToken };