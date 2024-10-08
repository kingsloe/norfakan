import { useState, useEffect } from 'react';
import { Text, ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import { CustomButton, FormField, PickerField } from '../../components';
import { ENDPOINTS } from '../../constants/urls';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';
import fetchDataFromApi from '../../lib/api';

const { height } = Dimensions.get('window');

const getSubFamilyList = () => fetchDataFromApi(ENDPOINTS.getSubFamilyListUrl)
const getPositionList = () => fetchDataFromApi(ENDPOINTS.getPositionListUrl)

const STATUS = [
    { value: 'alive', label: 'Alive' },
    { value: 'dead', label: 'Dead' },
];

const GENDER = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
];

const AddFamilyMember = () => {
    const [selectedSubFamily, setSelectedSubFamily] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedGender, setSelectedGender] = useState(null);

    const [subFamilyList, setSubFamilyList] = useState([]);
    const [positionList, setPositionList] = useState([]);
    const [statusList, setStatusList] = useState([]);
    const [genderList, setGenderList] = useState([]);
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
            try {
                const fetchedSubFamilyList = await getSubFamilyList();
                setSubFamilyList(fetchedSubFamilyList);
            } catch (error){
                console.log('Error fetching Sub Family List: ', error);
            }
        };

        const fetchPositionList = async () => {
            try {
                const fetchedPositionList = await getPositionList();
                setPositionList(fetchedPositionList)
            } catch (error) {
                console.log('Error fetching Position List: ', error)
            }
        };
        setStatusList(STATUS)
        setGenderList(GENDER)
        fetchPositionList();
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
                value={selectedSubFamily}
                items={subFamilyList}
                handleChangeText={(value) => setSelectedSubFamily(value)}
            />
            <PickerField 
            	title="Position"
			    value={selectedPosition}
			    items={positionList}
			    handleChangeText={(value) => setSelectedPosition(value)}
            />
            <PickerField 
            	title="Status"
                value={selectedStatus}
                items={statusList}
                handleChangeText={(value) => setSelectedStatus(value)}
            />
            <PickerField 
            	title="Gender"
			    value={selectedGender}
			    items={genderList}
			    handleChangeText={(value) => setSelectedGender(value)}
            />
            <FormField 
                title='Contact'
                otherStyles={{marginTop: 20}}
                value= {form.contact}
                placeholder='Enter Contact'
                handleChangeText={(e) => setForm({ ...form, contact: e})}
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