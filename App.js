import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './screens/Start';
import ItemDetails from './screens/ItemDetails';
import Cart from './screens/Cart';
import * as Font from 'expo-font';
import { CartItemProvider } from './Components/CartItemContext';

// Create a stack navigator instance
const Stack = createNativeStackNavigator();

// Function to load custom fonts asynchronously
async function loadCustomFont() {
  await Font.loadAsync({
    'Header': require('./assets/TwilioSansMono-Bold.otf'),
    'Body': require('./assets/Sloth-Regular.ttf'),
  });
}

// Main app component
export default function App() {
  // Load custom fonts on app start
  useEffect(() => {
    loadCustomFont();
  }, []);

  // Render the app's UI components wrapped in the CartItemProvider context
  return (
    <CartItemProvider>
      <NavigationContainer>
        {/* Define navigation stack screens */}
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Start} />
          <Stack.Screen name="Details" component={ItemDetails} />
          <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartItemProvider>
  );
}