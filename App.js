import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './screens/Start';
import ItemDetails from './screens/ItemDetails';
import Cart from './screens/Cart';
import * as Font from 'expo-font';
import { CartItemProvider } from './Components/CartItemContext';

const Stack = createNativeStackNavigator();

async function loadCustomFont() {
  await Font.loadAsync({
    'Header': require('./assets/TwilioSansMono-Bold.otf'),
    'Body': require('./assets/Sloth-Regular.ttf'),
  });
}

export default function App() {
  useEffect(() => {
    loadCustomFont();
  }, []);

  return (
    <CartItemProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Start} />
          <Stack.Screen name="Details" component={ItemDetails} />
          <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartItemProvider>
  );
}
