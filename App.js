import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import Start from './screens/Start';
import ItemDetails from './screens/ItemDetails';
import Cart from './screens/Cart';
import * as Font from 'expo-font';
import { CartItemProvider } from './Components/CartItemContext';

// Create a stack navigator instance
const Stack = createNativeStackNavigator();

// Main app component
export default function App() {
  // State to track whether the fonts are loaded
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Load custom fonts on app start
  useEffect(() => {
    // Function to load custom fonts asynchronously
    async function loadCustomFont() {
      await Font.loadAsync({
        'Header': require('./assets/TwilioSansMono-Bold.otf'),
        'Body': require('./assets/Sloth-Regular.ttf'),
      });

      // Mark fonts as loaded when the async loading is done
      setFontsLoaded(true);
    }

    // Call the font loading function
    loadCustomFont();
  }, []);

  return (
    <CartItemProvider>
      {fontsLoaded ? (
        <>
          {/* Set status bar style */}
          <StatusBar
            barStyle="light-content"
            backgroundColor="#050505"
          />

          {/* Main Navigation Container */}
          <NavigationContainer>
            {/* Stack Navigator with header styling */}
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#050505',
                },
                headerTintColor: '#F5F5F5',
                headerTitleStyle: {
                  fontFamily: 'Header',
                  fontSize: 32,
                },
              }}
            >
              {/* Define screens */}
              <Stack.Screen name="Home" component={Start} />
              <Stack.Screen name="Details" component={ItemDetails} />
              <Stack.Screen name="Cart" component={Cart} />
            </Stack.Navigator>
          </NavigationContainer>
        </>
      ) : (
        <>
          {/* If fonts are not loaded yet, render nothing */}
        </>
      )}
    </CartItemProvider>
  );
}
