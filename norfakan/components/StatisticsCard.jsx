import React, { useEffect, useState } from 'react';

import { Text, View, StyleSheet, FlatList } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import axiosInstance from '../lib/axiosInstance';

import { ENDPOINTS } from '../constants/urls';
import { mainButtonColor } from '../constants/colors';

import fetchDataFromApi from '../lib/api';

const getFamiliyMembersList = () => fetchDataFromApi(
    ENDPOINTS.getFamilyMembersListUrl, 
    'Error fetching family members list: '
    );

const getAmountTaken = () => fetchDataFromApi(
    ENDPOINTS.getTotalFuneralFeeUrl, 
    'Error fetching total amount taken: '
    );

const formatTitle = (key) => {
    return key
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

const getIconForKey = (key) => {
    const iconMap = {
        alive_family_members: <MaterialIcons name="family-restroom" size={36} color="white" />,
        committee_members: <MaterialIcons name="family-restroom" size={36} color="white" />,
        deceased_family_members: <MaterialCommunityIcons name="emoticon-dead-outline" size={36} color="white" />,
    };
    return iconMap[key] || 'default-icon'; // Fallback to a default icon
};

const Item = ({title, figure, icon}) => {

    return (
    <View style={styles.container}>
        <Text style={{fontSize: 20, fontWeight: '500'}}>{title}</Text>
        <View style={styles.recordContainer}>
            <Text style={{fontSize: 36, fontWeight: '700'}}>{figure}</Text>
            {icon}
        </View>
    </View>
)}

const StatisticsCard = () => {
    const [response, setResponse] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [familyMembersResult, totalFuneralFeeResult] = await Promise.all([getFamiliyMembersList(),
                    getAmountTaken()
                    ])
                const familyMembersDataArray = Object.keys(familyMembersResult).map((key, index) => ({
                    id: String(index + 1),
                    title: formatTitle(key),
                    figure: familyMembersResult[key],
                    icon: getIconForKey(key)
                }));
                const totalFuneralFeeData = {
                    id: String(familyMembersDataArray.length + 1),
                    title: 'Total Funeral Fee',
                    figure: totalFuneralFeeResult,
                    icon: <FontAwesome6 name="cedi-sign" size={36} color="white" />
                };
                const combinedDataArray = [...familyMembersDataArray, totalFuneralFeeData];
                setResponse(combinedDataArray)
            }catch (error){
            console.log('Error rendering data: ', error)
            }
        };
        fetchData(); 
    }, []);
    return (
        <FlatList 
            data={response}
            horizontal
            renderItem={({item}) => <Item title={item.title} figure={item.figure} icon={item.icon} />}
            keyExtractor={item => item.id}
        />
    )
}
export default StatisticsCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: mainButtonColor,
        borderRadius: 36,
        paddingHorizontal: 36,
        paddingVertical: 20,
        margin: 18,
        height: 180,
        elevation: 20,
        shadowColor: '#52006A',
        justifyContent: 'space-between'
    },
    recordContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textStyle: {
        fontSize: 20, 
        fontWeight: '500'
    }
})