import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { ENDPOINTS } from '../constants/urls';
import { mainButtonColor } from '../constants/colors';
import useFetchData from '../hooks/useFetchData';

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
        total_funeral_fee: <FontAwesome6 name="cedi-sign" size={36} color="white" />,
    };
    return iconMap[key] || <MaterialIcons name="family-restroom" size={36} color="white" />; // Fallback to a default icon
};

const Item = ({ title, figure, icon }) => {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, fontWeight: '500' }}>{title}</Text>
            <View style={styles.recordContainer}>
                <Text style={{ fontSize: 36, fontWeight: '700' }}>{figure}</Text>
                {icon}
            </View>
        </View>
    );
};

const StatisticsCard = () => {
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const { data: familyMembersData } = useFetchData(ENDPOINTS.getFamilyMembersListUrl);
    const { data: totalFuneralFee } = useFetchData(ENDPOINTS.getTotalFuneralFeeUrl);

    useEffect(() => {
            setLoading(true);
            setError(null);  // Reset errors on each fetch attempt

            try {
                // Ensure the data is not null or undefined
                if (familyMembersData || totalFuneralFee) {
                    const familyMembersDataArray = Object.keys(familyMembersData).map((key, index) => ({
                        id: String(index + 1),
                        title: formatTitle(key),
                        figure: familyMembersData[key],
                        icon: getIconForKey(key),
                    }));

                    const totalFuneralFeeData = {
                        id: String(familyMembersDataArray.length + 1),
                        title: 'Total Funeral Fee',
                        figure: totalFuneralFee,
                        icon: getIconForKey('total_funeral_fee'),
                    };

                    setResponse([...familyMembersDataArray, totalFuneralFeeData]);
                } else {
                    setError('Data not available');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
    }, [familyMembersData, totalFuneralFee]);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>{`Error: ${error}`}</Text>;
    }

    return (
        <FlatList 
            data={response}
            horizontal
            renderItem={({ item }) => <Item title={item.title} figure={item.figure} icon={item.icon} />}
            keyExtractor={item => item.id}
        />
    );
};

export default StatisticsCard;

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
        justifyContent: 'space-between',
    },
    recordContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textStyle: {
        fontSize: 20, 
        fontWeight: '500',
    },
});
