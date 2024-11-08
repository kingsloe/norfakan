import { createContext, useContext, useState, useEffect } from 'react';
import { retrieveToken } from '../lib/auth';


const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Function to load tokens from storage synchronously before state is initialized
    const initializeAuth = async () => {
        try {
            const retrievedAccessToken = await retrieveToken('accessToken');
            const retrievedRefreshToken = await retrieveToken('refreshToken');
            
            if (retrievedAccessToken) {
                setAccessToken(retrievedAccessToken);
                setRefreshToken(retrievedRefreshToken);
                setIsLoggedIn(true);
            } else {
                setAccessToken(null);
                setRefreshToken(null);
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error('Error retrieving token from secure store', error);
            setIsLoggedIn(false);
        } finally {
            setLoading(false);
        }
    };

    // Run initializeAuth function once
    useEffect(() => {
        initializeAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                accessToken,
                setIsLoggedIn,
                setAccessToken,
                loading,
                setLoading,
                refreshToken,
                setRefreshToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
