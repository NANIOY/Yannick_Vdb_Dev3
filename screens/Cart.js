import React from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';

const Cart = ({ navigation, route }) => {
  // Display the selected item and its quantity in the cart

  return (
    <View style={styles.container}>
      {/* Display the selected item */}
      <View style={styles.itemContainer}>
        {/* Display the item image */}
        <Image source={{ uri: route.params.imageUrl }} style={styles.clothingImage} />
        {/* Container for item details */}
        <View style={styles.box}>
          <View style={styles.itemInfo}>
            {/* Display the item title */}
            <Text style={styles.itemTitle}>{route.params.itemTitle}</Text>
            {/* Display the selected quantity */}
            <Text style={styles.itemAmount}>{route.params.selectedAmount}</Text>
          </View>
        </View>
      </View>

      {/* Container for payment button */}
      <View style={styles.buttonContainer}>
        {/* Payment button */}
        <Pressable style={styles.payButton}>
          <Text style={styles.buttonText}>Pay: €{route.params.itemPrice}</Text>
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