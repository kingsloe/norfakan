import { Stack } from 'expo-router'
import React from 'react'

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="addFamilyMember" options={{headerShown: false}} />
      <Stack.Screen name="viewFamilyMembers" options={{headerShown: false}} />
    </Stack>
  )
}

export default HomeLayout