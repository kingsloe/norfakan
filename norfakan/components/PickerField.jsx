import { useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

import {Picker} from '@react-native-picker/picker';

const { height } = Dimensions.get('window');

const PickerField = ({title, value, items, handleChangeText, ...props}) => {

	return (
		<View style={styles.container}>
		    <Text style={{fontSize: 18}}>{title}</Text>
		    <View style={styles.picker}>
			    <Picker
			    	selectedValue={value}
			    	onValueChange={handleChangeText}>
			    	{items.map((item) => (
                        <Picker.Item key={item.value} label={item.label} value={item.value} />
                    ))}
			    </Picker>
		    </View>
        </View>
	)
}

export default PickerField;

const styles = StyleSheet.create({
    container: {
    	marginTop: 28,
    },
    picker: {
    	borderWidth: 2,
    	borderRadius: 16,
    	
    },
    
})