import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, FlatList, Pressable, Image } from 'react-native';

const ClothingTile = ({ data }) => {
  // Get navigation instance from React Navigation
  const navigation = useNavigation();

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        // Extract item price from the content using regex
        const priceMatch = item.content.rendered.match(/<p class="elementor-heading-title elementor-size-default">([^<]+)<\/p>/);
        const itemPrice = priceMatch ? priceMatch[1] : '';
        
        // Extract image URL from the content using regex
        const imageUrl = item.content.rendered.match(/<img[^>]+src="([^">]+)"/)?.[1];

        return (
          // Render each clothing tile with a Pressable for navigation
          <Pressable style={styles.container} onPress={() => navigation.navigate("Details", {
            itemId: item.id,
            itemTitle: item.title.rendered,
            itemDescription: item.excerpt.rendered,
            itemPrice: itemPrice,
            imageUrl: imageUrl,
          })}>
            <View style={styles.tile}>
              {imageUrl && (
                <Image
                  source={{ uri: imageUrl }}
                  style={styles.clothingImage}
                />
              )}
              <View style={styles.titleAndPrice}>
                <Text style={styles.tileTitle}>{item.title.rendered}</Text>
                {itemPrice !== '' && (
                  <Text style={styles.tilePrice}>{itemPrice}</Text>
                )}
              </View>
            </View>
          </Pressable>
        );
      }}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 24,
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