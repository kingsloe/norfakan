import { Text, StyleSheet } from 'react-native';
const Avatar = ({otherStyles}) => {
    return (
        <Text style={[styles.avatar, otherStyles]}>NY</Text>
    )
}
export default Avatar;

const styles = StyleSheet.create({
    avatar: {
        borderWidth: 1,
        backgroundColor: '#283033',
        color: '#F4FDFF'
      }
})