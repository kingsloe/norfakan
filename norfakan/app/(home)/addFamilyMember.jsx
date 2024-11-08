import { useState, useEffect } from 'react';
import { Text, ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import { CustomButton, FormField, PickerField } from '../../components';
import { ENDPOINTS } from '../../constants/urls';
import { SafeAreaView } from 'react-native-safe-area-context';
import useFetchData from '../../hooks/useFetchData';

const { height } = Dimensions.get('window');

const STATUS = [
    { value: 'alive', label: 'Alive' },
    { value: 'dead', label: 'Dead' },
];

const GENDER = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
];

const AddFamilyMember = () => {
    const [subFamilyList, setSubFamilyList] = useState([]);
    const [positionList, setPositionList] = useState([]);
    const [statusList, setStatusList] = useState(STATUS);
    const [genderList, setGenderList] = useState(GENDER);

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        subFamily: '',
        position: '',
        status: '',
        gender: '',
        contact: ''
    });

    const { data: getSubFamilyList } = useFetchData(ENDPOINTS.getSubFamilyListUrl);
    const { data: getPositionList } = useFetchData(ENDPOINTS.getPositionListUrl);

    useEffect(() => {
        // Only update the lists if the data is defined and is an array
        if (Array.isArray(getSubFamilyList)) {
            setSubFamilyList(getSubFamilyList);
        }
        if (Array.isArray(getPositionList)) {
            setPositionList(getPositionList);
        }
    }, [getSubFamilyList, getPositionList]);

    const handleSubmit = async () => {
        console.log(form);
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <FormField 
                        title='First Name'
                        otherStyles={{ marginTop: 20 }}
                        value={form.firstName}
                        placeholder='Enter First name'
                        handleChangeText={(e) => setForm({ ...form, firstName: e })}
                    />
                    <FormField 
                        title='Last name'
                        otherStyles={{ marginTop: 20 }}
                        value={form.lastName}
                        placeholder='Enter Last name'
                        handleChangeText={(e) => setForm({ ...form, lastName: e })}
                    />
                    <FormField 
                        title='Username'
                        otherStyles={{ marginTop: 20 }}
                        value={form.username}
                        placeholder='Enter username'
                        handleChangeText={(e) => setForm({ ...form, username: e })}
                    />
                    <FormField 
                        title='Password'
                        otherStyles={{ marginTop: 20 }}
                        value={form.password}
                        placeholder='Enter Password'
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                    />
                    <PickerField 
                        title="Sub Family"
                        value={form.subFamily}
                        items={subFamilyList || []}  // Default to empty array
                        handleChangeText={(value) => setForm({ ...form, subFamily: value })}
                    />
                    <PickerField 
                        title="Position"
                        value={form.position}
                        items={positionList || []}  // Default to empty array
                        handleChangeText={(value) => setForm({ ...form, position: value })}
                    />
                    <PickerField 
                        title="Status"
                        value={form.status}
                        items={statusList}
                        handleChangeText={(value) => setForm({ ...form, status: value })}
                    />
                    <PickerField 
                        title="Gender"
                        value={form.gender}
                        items={genderList}
                        handleChangeText={(value) => setForm({ ...form, gender: value })}
                    />
                    <FormField 
                        title='Contact'
                        otherStyles={{ marginTop: 20 }}
                        value={form.contact}
                        placeholder='Enter Contact'
                        handleChangeText={(e) => setForm({ ...form, contact: e })}
                    />
                    <CustomButton
                        title='Add Member'
                        handlePress={handleSubmit}
                        containerStyles={{ marginTop: 20 }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
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
});
