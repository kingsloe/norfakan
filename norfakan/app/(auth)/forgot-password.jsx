import { StyleSheet, Text, View, Image, ScrollView, Dimensions} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import React, { useState } from 'react'

import { images } from '../../constants'
import { CustomButton, FormField } from '../../components'

const { height } = Dimensions.get('window');

const ForgotPassword = () => {

    const [form, setForm] = useState({
        username: '',
        contact: ''
    });

  return (
    <SafeAreaView style={{height: '100%', backgroundColor: '#F4FDFF'}}>
        <ScrollView>
            <View style={styles.container}>
                <View style={{alignItems: 'center'}}>
                    <Image 
                        source={images.logo}
                        style={styles.center_logo}
                        resizeMode='contain'
                    />
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Get Back Password</Text>
                </View>
                <FormField 
                    title='Username'
                    otherStyles={{marginTop: 20}}
                    value= {form.username}
                    placeholder='Enter username'
                    handleChangeText={(e) => setForm({ ...form, username: e})}
                />
                <FormField 
                    title='Contact'
                    otherStyles={{marginTop: 20}}
                    value= {form.contact}
                    placeholder='Enter Contact'
                    handleChangeText={(e) => setForm({ ...form, contact: e})}
                />
                
                <CustomButton 
                    title='Submit'
                    containerStyles={{width: '100%', marginTop: 28,}}
                />
            </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ForgotPassword

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