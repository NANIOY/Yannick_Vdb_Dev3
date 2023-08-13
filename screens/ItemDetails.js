import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { useCartItem } from '../Components/CartItemContext';

const ItemDetails = ({ navigation, route }) => {
  const { cartItems, dispatch } = useCartItem();

  // Find the cartItem based on itemId
  const cartItem = cartItems.find(item => item.itemId === route.params.itemId);

  // Local state to manage the counter
  const [counter, setCounter] = useState(cartItem ? cartItem.selectedAmount : 0);

  const increase = () => {
    console.log('Increasing counter');
    setCounter(prevCounter => prevCounter + 1);
    dispatch({ type: 'INCREMENT', itemId: route.params.itemId });
  };
  
  const decrease = () => {
    console.log('Decreasing counter');
    if (counter > 0) {
      setCounter(prevCounter => prevCounter - 1);
      dispatch({ type: 'DECREMENT', itemId: route.params.itemId });
    }
  };

  const cleanDescription = route.params.itemDescription
    .replace(/<p.*?>/g, '')
    .replace(/<\/p>/g, '')
    .replace(/€.{5}/g, '')
    .trim();

  return (
    <View style={styles.container}>
      <Image source={{ uri: route.params.imageUrl }} style={styles.clothingImage} />

      <View style={styles.textContainer}>
        <Text style={styles.clothingTitle}>{route.params.itemTitle}</Text>
        <Text style={styles.description}>{cleanDescription.substring(0, 230)}</Text>
        <Text style={styles.itemPrice}>{route.params.itemPrice}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <Pressable style={[styles.button, styles.buttonPlus]} onPress={increase}>
            <Text style={[styles.buttonText, styles.plusText]}>+</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.buttonMinus]} onPress={decrease}>
            <Text style={[styles.buttonText, styles.minusText]}>-</Text>
          </Pressable>
        </View>
        <Pressable
          style={[styles.button, styles.buttonCart]}
          onPress={() =>
            navigation.navigate("Cart", {
              itemTitle: route.params.itemTitle,
              itemDescription: route.params.itemDescription,
              imageUrl: route.params.imageUrl,
              itemPrice: route.params.itemPrice, // Make sure to use "itemPrice" instead of "price"
              selectedAmount: counter, // Use the "counter" value
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
    marginTop: -32,
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
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
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
    width: '100%',
  },
  cartText: {
    color: '#f5f5f5',
    fontSize: 20,
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
