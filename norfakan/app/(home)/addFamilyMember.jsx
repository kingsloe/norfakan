import { useState, useEffect } from 'react';
import { Text, ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import { CustomButton, FormField, PickerField } from '../../components';
import fetchDataFromApi from '../../lib/api';
import { ENDPOINTS } from '../../constants/urls';
import { SafeAreaView } from 'react-native-safe-area-context';

import {Picker} from '@react-native-picker/picker';

const { height } = Dimensions.get('window');

const getSubFamilyList = () => fetchDataFromApi(
    ENDPOINTS.getSubFamilyListUrl,
    )

const AddFamilyMember = () => {
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [items, setItems] = useState([]);
	const [form, setForm] = useState({
		firstName: '',
		lastName: '',
		username: '',
		password: '',
		subFamily: '',
		position: 'member',
		status: 'alive',
		gender: 'male',
		contact: ''
	})
    useEffect (() => {
        const fetchSubFamilyList = async () => {
            const results= await getSubFamilyList();
            const transformedItems = results.map(item => ({
                label: item.sub_family_name,
                value: item.id
            }));
            setItems(transformedItems);
        };
        fetchSubFamilyList();
    }, []);
	

	return (
		<SafeAreaView>
			<ScrollView>
			<View style={styles.container}>
			<FormField 
                title='First Name'
                otherStyles={{marginTop: 20}}
                value= {form.firstName}
                placeholder='Enter First name'
                handleChangeText={(e) => setForm({ ...form, firstName: e})}
            />
            <FormField 
                title='Last name'
                otherStyles={{marginTop: 20}}
                value= {form.lastName}
                placeholder='Enter Last name'
                handleChangeText={(e) => setForm({ ...form, lastName: e})}
            />
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
            <PickerField 
                title="Sub Family"
                value={selectedPosition}
                items={items}
                handleChangeText={(value) => setSelectedPosition(value)}
            />
            <PickerField 
            	title="Position"
			    value={selectedPosition}
			    items={items}
			    handleChangeText={(value) => setSelectedPosition(value)}
            />
            <PickerField 
            	title="Status"
			    value={selectedPosition}
			    items={items}
			    handleChangeText={(value) => setSelectedPosition(value)}
            />
            <PickerField 
            	title="Gender"
			    value={selectedPosition}
			    items={items}
			    handleChangeText={(value) => setSelectedPosition(value)}
            />
            <FormField 
                title='Contact'
                otherStyles={{marginTop: 20}}
                value= {form.password}
                placeholder='Enter Password'
                handleChangeText={(e) => setForm({ ...form, password: e})}
            />
			</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default AddFamilyMember;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4FDFF',
        justifyContent: 'center',
        paddingHorizontal: 16,
        minHeight: height * 0.83,
        marginBottom: 10
    },
    picker: {
    	borderWidth: 2,
    	borderRadius: 16,
    	marginVertical: 28,
    },
    
})