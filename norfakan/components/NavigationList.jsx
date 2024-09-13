import { StyleSheet, Text, View, SectionList, SafeAreaView } from 'react-native';

const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];

const NavigationList = () => {
	return (
		<SafeAreaView style={styles.container}>
		<SectionList
			sections = {DATA}
			keyExtractor = {(item, index) => item + index}
			renderItem={({item}) => (
		        <View style={styles.item}>
		          <Text style={styles.title}>{item}</Text>
		        </View>
		      )}
		      renderSectionHeader={({section: {title}}) => (
		        <Text style={styles.header}>{title}</Text>
		      )}
		/>
		</SafeAreaView>
		)
}
export default NavigationList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 18,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});