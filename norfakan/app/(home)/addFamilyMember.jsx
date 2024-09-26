import { useState } from 'react';
import { Text, ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import { CustomButton, FormField, PickerField } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';

import {Picker} from '@react-native-picker/picker';

const { height } = Dimensions.get('window');

const AddFamilyMember = () => {
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
	const [selectedPosition, setSelectedPosition] = useState('');
	const items = [
    { label: "Head of Super Family", value: "head_of_super_family" },
    { label: "Head of Sub Family", value: "head_of_sub_family" },
    { label: "Head of Committee", value: "head_of_committee" },
    { label: "Committee", value: "committee" },
    { label: "Member", value: "member" },
];
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
            	title="Position"
			    value={selectedPosition}
			    items={items}
			    handleChangeText={(value) => setSelectedPosition(value)}
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
        minHeight: height * 0.83
    },
    picker: {
    	borderWidth: 2,
    	borderRadius: 16,
    	marginVertical: 28,
    },
    
})