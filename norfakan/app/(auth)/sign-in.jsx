import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Dimensions} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Spinner from 'react-native-loading-spinner-overlay';

import { Link, Redirect, router } from 'expo-router';

import { handleLogin } from '../../lib/auth';
import { images } from '../../constants';
import { CustomButton, FormField } from '../../components';
import { useAuth } from '../../context/AuthProvider';

const { height } = Dimensions.get('window');

const SignIn = () => {
    const { setIsLoggedIn, loading, setLoading, isLoggedIn } = useAuth();
    const [form, setForm] = useState({
        username: 'barbara74',
        password: '1234'
    });

    const submit = async () => {
        setLoading(true);
        const { username, password } = form;
        try {
            const result = await handleLogin(username, password)
            setIsLoggedIn(true);
            if (result) router.replace('/home');
 
        } catch (error) {
            throw new Error(error);
        } finally {
            setLoading(false);
        }
    }

    if (isLoggedIn) return <Redirect href="/home" />;

    return (
        <SafeAreaView style={{height: '100%', backgroundColor: '#F4FDFF'}}>
                  <Spinner
                    visible={loading}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
            <ScrollView>
                <View style={styles.container}>
                    <View style={{alignItems: 'center'}}>
                        <Image 
                            source={images.logo}
                            style={styles.center_logo}
                            resizeMode='contain'
                        />
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>LOGIN</Text>
                    </View>
                    <FormField 
                        title='Username'
                        otherStyles={{marginTop: 20}}
                        value= {form.username}
                        placeholder='Enter username'
                        handleChangeText={(e) => setForm({ ...form, username: e})}
                    />
                    <FormField 
                        title='Password'
                        otherStyles={{marginTop: 20}}
                        value= {form.password}
                        placeholder='Enter Password'
                        handleChangeText={(e) => setForm({ ...form, password: e})}
                    />
                    
                    <View style={{
                        flex: 1/4, 
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        marginTop: 10
                        }}>
                        <Link href={'/forgot-password'} style={{fontSize: 20, fontWeight: 'bold'}}>Forgot Password</Link>
                    </View>
                    <CustomButton 
                        title='Login'
                        containerStyles={{width: '100%', marginTop: 28,}}
                        handlePress={submit}
                    />
                </View>
        </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4FDFF',
        justifyContent: 'center',
        paddingHorizontal: 16,
        minHeight: height * 0.83
    },
    center_logo: {
        width: 160,
        height: 160
    },
    
})