import React from 'react';

import { StyleSheet, View, Image, ScrollView, SectionList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { images} from '../../constants';
import { ENDPOINTS } from '../../constants/urls';
import { Avatar, SearchInput, StatisticsCard, CustomButton} from '../../components';

import axiosInstance from '../../lib/axiosInstance'

import { router } from 'expo-router'


const DATA = [
  {
    title: 'Family Information',
    data: [
      { title: 'Add Family Member',  link: 'addFamilyMember'},
      { title: 'View Family Members',  link: 'viewFamilyMembers'}
    ],
  },
];

const Home = () => {

  return (
    <SafeAreaView>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <CustomButton 
          containerStyles={styles.customButtonStyle}
          title = {item.title}
          icon = <FontAwesome5 name="arrow-right" size={24} color="black" />
          handlePress={() => router.push(item.link)}
          />
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}

        ListHeaderComponent = {() => (
          <View style={styles.container}>
            <View style={styles.topBar}>
              <Image 
                style={styles.logoOnlyStyle}
                source = {images.logoOnly}
              />
              <Avatar 
                otherStyles={styles.avatar}
              />
            </View>
            <SearchInput />
            <View style={styles.dashboardStyle}>
              <StatisticsCard />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBar: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  logoOnlyStyle: {
    width: 54,
    height: 54,
  },
  avatar: {
    padding: 12,
    borderRadius: 50,
    fontWeight: '500',
    fontSize: 18,
  },
  dashboardStyle: {
    paddingVertical: 10,
    flex: 1,
  },
  customButtonStyle: {
    marginHorizontal: 18, 
    marginVertical: 12, 
    borderRadius: 30,
    paddingHorizontal: 20,
    justifyContent: 'space-between'
  },
  header: {
    marginHorizontal: 18,
    fontSize: 20,
    fontWeight: '500',
  }
  
});