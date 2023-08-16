import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, FlatList, Pressable, Image, TouchableOpacity } from 'react-native';

// Function to extract price from content
const extractPrice = (content) => {
  // Extract price string using regular expression
  const priceMatch = content.match(/<p class="elementor-heading-title elementor-size-default">([^<]+)<\/p>/);
  const priceString = priceMatch ? priceMatch[1] : '';
  const priceWithoutCurrency = priceString.replace(/[^\d.,]/g, ''); // Remove all except digits, comma, and period

  // Parse price as float
  const price = parseFloat(priceWithoutCurrency);

  return price || 0;
};

// Function to format price with currency symbol
const formatPrice = (price) => {
  const formattedPrice = `€ ${price.toFixed(2)}`;
  return formattedPrice;
};

// Main component
const ClothingTile = ({ data }) => {
  const navigation = useNavigation();

  // State to manage sorting order
  const [sortOrder, setSortOrder] = useState("ascending");

  // Function to toggle sorting order
  const toggleSort = () => {
    setSortOrder(prevOrder => (prevOrder === "ascending" ? "descending" : "ascending"));
  };

  // Sort data based on sorting order and extracted price
  const sortedData = [...data].sort((a, b) => {
    const priceA = extractPrice(a.content.rendered);
    const priceB = extractPrice(b.content.rendered);

    return sortOrder === "ascending" ? priceA - priceB : priceB - priceA;
  });

  return (
    <View style={styles.screenContainer}>
      {/* Custom-styled button for toggling sort order */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.customButton}
          onPress={toggleSort}
        >
          <Text style={styles.buttonText}>
            Sorting price: {sortOrder === "ascending" ? "Ascending" : "Descending"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* FlatList to display sorted data */}
      <FlatList
        data={sortedData}
        style={styles.flatList}
        renderItem={({ item }) => {
          const imageUrl = item.content.rendered.match(/<img[^>]+src="([^">]+)"/)?.[1];

          return (
            <Pressable style={styles.container} onPress={() => navigation.navigate("Details", {
              itemId: item.id,
              itemTitle: item.title.rendered,
              itemDescription: item.excerpt.rendered,
              itemPrice: formatPrice(extractPrice(item.content.rendered)),
              imageUrl: imageUrl,
            })}>
              {/* Individual item tile */}
              <View style={styles.tile}>
                {imageUrl && (
                  <Image
                    source={{ uri: imageUrl }}
                    style={styles.clothingImage}
                  />
                )}
                <View style={styles.titleAndPrice}>
                  <Text style={styles.tileTitle}>{item.title.rendered}</Text>
                  <Text style={styles.tilePrice}>
                    {formatPrice(extractPrice(item.content.rendered))}
                  </Text>
                </View>
              </View>
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    marginTop: 0,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  customButton: {
    backgroundColor: '#4A21ED',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 2,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Body',
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase',
    color: '#F5F5F5',
  },
  flatList: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 12,
  },
  clothingImage: {
    width: 384,
    height: 368,
    borderRadius: 2,
  },
  titleAndPrice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 12,
    paddingBottom: 4,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    backgroundColor: '#222',
  },
  tileTitle: {
    flex: 0.7,
    fontFamily: 'Header',
    fontSize: 32,
    color: '#F5F5F5',
  },
  tilePrice: {
    flex: 0.3,
    fontFamily: 'Body',
    fontWeight: 'bold',
    color: '#07F52C',
    fontSize: 24,
    textAlign: 'right',
    marginTop: 4,
  },
});

export default ClothingTile;