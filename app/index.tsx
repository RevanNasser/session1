import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, useColorScheme  } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { FlashList } from '@shopify/flash-list';

const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const ShoppingView = () => {

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const colorScheme = useColorScheme();

  const backgroundColor =  colorScheme === 'dark' ? '#333333' : '#FFFFFF';; 
  const searchBackgroundColor = colorScheme === 'dark' ? '#333333' : '#FFFFFF';
  const searchTextColor = colorScheme === 'dark' ? '#A9C7E3' : '#A9C7E3';

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then(response => response.json())
      .then (
        result => {
          setLoading(false);
          setProducts(result.results); 
        },
        error => {
          setLoading(false);
          setError(error);
        }
      );
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Image
        style={styles.image}
        source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split('/')[6]}.png` }}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>
      <View style={[styles.container, { backgroundColor: backgroundColor }]}>
        <Image
          style={styles.logo}
          source={require('../assets/images/pngwing.com.png')}
        />
        <TextInput
          style={[styles.searchInput, { backgroundColor: searchBackgroundColor, color: searchTextColor }]}
          placeholder="Search for Pokemon"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <Text style={{ color: searchTextColor }}>{error}</Text>
        ) : (
          <>
            {filteredProducts.length === 0 && (
              <Text style={[styles.noResultText, { color: searchTextColor }]}>No results found for '{searchQuery}'</Text>
            )}
            <FlashList
              data={filteredProducts}
              renderItem={renderItem}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()} 
              contentContainerStyle={styles.listContainer}
            />
          </>
        )}
      </View>
    </SafeAreaProvider>
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
    backgroundColor: '#A9C7E3',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  logo: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  noResultText: {
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 20,
  },
});

export default ShoppingView;
