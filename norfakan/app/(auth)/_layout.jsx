import { Stack } from 'expo-router'
import React from 'react'

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{headerShown: false}} />
      <Stack.Screen name='forgot-password' options={{headerShown: false}} />
      <Stack.Screen name='editProfile' options={{headerShown: true, headerTitle: ''}} />
      <Stack.Screen name='changePassword' options={{headerShown: true, headerTitle: ''}} />
    </Stack>
  )
}

export default AuthLayout