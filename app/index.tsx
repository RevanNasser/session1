import React from 'react';
import { SafeAreaView, FlatList, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
const products= [
  { id: 1, name: 'Iphone 11', image: '/assets/images/phone11.png' },
  { id: 2, name: 'Iphone 12', image: '/assets/images/phone2.png' },
  { id: 3, name: 'Iphone 13', image: '/assets/images/phone5.png' },
  { id: 4, name: 'Iphone 14', image: '/assets/images/phone4.png' },
  { id: 5, name: 'Iphone 14', image: '/assets/images/phone4.png' }
];

const ShoppingView= () => {
  const items = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Image source={  item.image } style={styles.image} />
      <Text style={styles.title}> {item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 24 , textAlign: 'center'}}>Rifan's Store </Text>
      <FlatList
        data={products}
        renderItem={items}
        numColumns={2} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    flex: 1,
    margin: 10,
    backgroundColor: '#E2EAF4',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});

export default ShoppingView;
