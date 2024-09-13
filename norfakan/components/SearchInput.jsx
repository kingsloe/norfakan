import { TextInput, StyleSheet, View } from "react-native"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { mainBackgroundColor } from "../constants/colors";
const SearchInput = () => {
    return (
        <View style = {styles.container}>
            <TextInput 
                style = {styles.inputField}
            />
            <FontAwesome name="search" size={24} color="black"/>
        </View>
    )
}

export default SearchInput

const styles = StyleSheet.create({
    container: {
        width: '90%',
        paddingHorizontal: 16,
        flexDirection: 'row',
        height: 64,
        alignItems: 'center',
        borderRadius: 24,
        borderWidth: 2,
        backgroundColor: mainBackgroundColor
        
    },
    inputField: {
        height: 40,
        width: '100%',
        flex: 1,
        fontSize: 18
    }
})