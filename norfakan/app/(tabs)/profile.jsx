import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';


import { useAuth } from '../../context/AuthProvider';
import { CustomButton, Avatar } from '../../components';
import { deleteData } from '../../lib/auth';

import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height } = Dimensions.get('window');

const Profile = () => {
    const {setIsLoggedIn } = useAuth();
    const handleLogout = async () => {
        try{
          await deleteData('accessToken');
          await deleteData('refreshToken');
          await deleteData('familyMembersResult');
          await deleteData('totalFuneralFeeResult');
          console.log('Successfully loggedout')
          setIsLoggedIn(false);
          router.replace('/')
        } catch (error) {
          console.log("Couldn't logout: " + error);
    }}

    // const 

  return (
      <SafeAreaView style={{height: '100%'}}>
        <View style={styles.container}>
          <View style={styles.profileInfo}>
            <Avatar 
              otherStyles = {{ padding: 45, borderRadius: 80, fontSize: 50, fontWeight: '500' }}
            />
            <Text style={{fontSize: 30, fontWeight: 'bold', color: '#283033'}}>Nana Yaw</Text>
            <Text style={{fontSize: 18, color: '#283033'}}>Head of Committee</Text>
          </View>
          <View style={{flex: 3, justifyContent: 'space-around'}}>
            <CustomButton 
                title='Edit Profile'
                containerStyles={{width: '100%', marginTop: 28, backgroundColor: '#F4FDFF'}}
                handlePress={() => router.push('/editProfile')}
              />
              <CustomButton 
                title='Change Password'
                containerStyles={{width: '100%', marginTop: 28, backgroundColor: '#F4FDFF'}}
                handlePress={() => router.push('/changePassword')}
              />
              <CustomButton 
                title='Log Out'
                containerStyles={{width: '100%', marginTop: 28}}
                handlePress={handleLogout}
              />
          </View>
        </View>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  profileInfo: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32
  }
})