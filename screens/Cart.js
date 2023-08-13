import React from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { useCartItem } from '../Components/CartItemContext';

const Cart = ({ navigation, route }) => {
  const { cartItems } = useCartItem();

  const cartItem = cartItems.find(item => item.itemId === route.params.itemId);

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: route.params.imageUrl }} style={styles.clothingImage} />
        <View style={styles.box}>
          <View style={styles.itemInfo}>
            <Text style={styles.itemTitle}>{route.params.itemTitle}</Text>
            <Text style={styles.itemAmount}>{route.params.selectedAmount}</Text>          
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.payButton}>
          <Text style={styles.buttonText}>Pay</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#050505',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 12,
    borderRadius: 4,
    marginTop: 16,
    marginBottom: 12,
    marginRight: 16,
    marginLeft: 16,
  },
  box: {
    flex: 1,
    marginLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    flex: 0.75,
    color: '#F5F5F5',
    fontWeight: 'bold',
    fontSize: 28,
  },
  itemAmount: {
    flex: 0.2,
    color: '#07F52C',
    fontWeight: 'bold',
    fontSize: 24,
    backgroundColor: '#222',
    paddingTop: 8,
    paddingRight: 2,
    paddingBottom: 8,
    paddingLeft: 2,
    borderRadius: 2,
    textAlign: 'center',
  },
  clothingImage: {
    width: 80,
    height: 80,
    borderRadius: 2,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  payButton: {
    backgroundColor: '#4A21ED',
    width: 360,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  buttonText: {
    color: '#F5F5F5',
    fontWeight: 'bold',
    fontSize: 24,
    textTransform: 'uppercase',
  },
});

export default Cart;
