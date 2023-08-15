import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput } from 'react-native';

import ClothingTile from '../Components/item';

const Start = ({ navigation, route }) => {
  // State variables for clothing data, search query, and filtered clothing
  const [clothing, setItems] = useState([]); // Store all clothing items
  const [searchQuery, setSearchQuery] = useState(''); // Store user's search input
  const [filteredClothing, setFilteredClothing] = useState([]); // Store filtered clothing items

  // Function to fetch clothing items from API
  const getItems = async () => {
    try {
      const response = await fetch(
        "https://studio-orbyq.com/wp-json/wp/v2/posts?categories=41",
        {}
      );

      const json = await response.json();
      setItems(json); // Set all clothing items
      setFilteredClothing(json); // Initialize filteredClothing with all items
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch clothing items when the component loads
  useEffect(() => {
    getItems();
  }, []);

  // Update filteredClothing based on searchQuery and clothing changes
  useEffect(() => {
    // Filter items based on the search query
    const filteredItems = clothing.filter(item =>
      item.title.rendered.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredClothing(filteredItems); // Update filtered clothing
  }, [searchQuery, clothing]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        placeholderTextColor="#797979"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <ClothingTile data={filteredClothing} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#050505',
    flex: 1,
  },
  searchInput: {
    alignSelf: 'center',
    backgroundColor: '#343434',
    color: '#F5F5F5',
    borderRadius: 2,
    width: 384,
    fontFamily: 'Body',
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
});

export default Start;