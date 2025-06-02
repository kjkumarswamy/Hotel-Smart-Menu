import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabNavigation from './App/Navigations/TabNavigation';
import { CartProvider } from './App/Context/CartContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <NavigationContainer>
          <TabNavigation />
        </NavigationContainer>
      </CartProvider>
    </SafeAreaProvider>
  );
}