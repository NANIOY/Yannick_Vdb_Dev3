import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { useCartItem } from '../Components/CartItemContext';

const ItemDetails = ({ navigation, route }) => {
  // Access cartItems and dispatch function from CartItemContext
  const { cartItems, dispatch } = useCartItem();

  // Find the cartItem based on itemId in route.params
  const cartItem = cartItems.find(item => item.itemId === route.params.itemId);

  // State to manage the quantity of the selected item
  const [counter, setCounter] = useState(cartItem ? cartItem.selectedAmount : 0);

  // Function to increase the quantity
  const increase = () => {
    setCounter(prevCounter => prevCounter + 1);
    dispatch({ type: 'INCREMENT', itemId: route.params.itemId });
  };

  // Function to decrease the quantity, preventing negative values
  const decrease = () => {
    if (counter > 0) {
      setCounter(prevCounter => prevCounter - 1);
      dispatch({ type: 'DECREMENT', itemId: route.params.itemId });
    }
  };

  // Remove HTML tags and currency symbol from item description
  const cleanDescription = route.params.itemDescription
    .replace(/<p.*?>/g, '')
    .replace(/<\/p>/g, '')
    .replace(/€.{5}/g, '')
    .trim();

  // Extract numeric price from itemPrice and calculate total price
  const priceMatch = route.params.itemPrice.match(/[\d.,]+/);
  const originalItemPrice = priceMatch ? parseFloat(priceMatch[0].replace(',', '.')) : 0;
  const totalPrice = originalItemPrice * counter;

  return (
    <View style={styles.container}>
      {/* Display item image */}
      <Image source={{ uri: route.params.imageUrl }} style={styles.clothingImage} />

      <View style={styles.textContainer}>
        {/* Display item title */}
        <Text style={styles.clothingTitle}>{route.params.itemTitle}</Text>
        {/* Display truncated item description */}
        <Text style={styles.description}>{cleanDescription.substring(0, 230)}</Text>
        {/* Display item price */}
        <Text style={styles.itemPrice}>{route.params.itemPrice}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          {/* Button to increase item quantity */}
          <Pressable style={[styles.button, styles.buttonPlus]} onPress={increase}>
            <Text style={[styles.buttonText, styles.plusText]}>+</Text>
          </Pressable>
          {/* Button to decrease item quantity */}
          <Pressable style={[styles.button, styles.buttonMinus]} onPress={decrease}>
            <Text style={[styles.buttonText, styles.minusText]}>-</Text>
          </Pressable>
        </View>
        {/* Button to go to cart */}
        <Pressable
          style={[styles.button, styles.buttonCart]}
          onPress={() =>
            navigation.navigate("Cart", {
              itemTitle: route.params.itemTitle,
              itemDescription: route.params.itemDescription,
              imageUrl: route.params.imageUrl,
              itemPrice: totalPrice.toFixed(2), // Pass the calculated total price
              selectedAmount: counter,
            })
          }>
          <Text style={[styles.buttonText, styles.cartText]}>Items in cart: {counter}</Text>
        </Pressable>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#050505',
  },
  clothingImage: {
    width: 384,
    height: 368,
    borderRadius: 2,
    marginTop: -200,
  },
  textContainer: {
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  clothingTitle: {
    fontFamily: 'Header',
    fontSize: 32,
    color: '#F5F5F5',
    marginBottom: 10,
  },
  description: {
    color: '#F5F5F5',
  },
  itemPrice: {
    fontFamily: 'Body',
    fontWeight: 'bold',
    color: '#07F52C',
    fontSize: 24,
    marginTop: 16,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: -180,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 56,
    height: 56,
    borderRadius: 2,
  },
  buttonText: {
    fontFamily: 'Body',
    fontWeight: 'bold',
  },
  buttonPlus: {
    backgroundColor: '#07F52C',
    marginLeft: 132,
  },
  buttonMinus: {
    backgroundColor: '#4A21ED',
    marginRight: 128,
  },

  buttonCart: {
    position: 'absolute',
    bottom: -4,
    backgroundColor: '#4A21ED',
    width: 360,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  cartText: {
    color: '#F5F5F5',
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'uppercase',
  },
  plusText: {
    fontSize: 40,
  },
  minusText: {
    fontSize: 56,
    marginTop: -12,
    color: '#f5f5f5'
  }
});

export default ItemDetails;