import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigation from './App/Navigation/RootNavigation';
import { CartProvider } from './App/Context/CartContext';
import { TableProvider } from './App/Context/TableContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <TableProvider>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </TableProvider>
      </CartProvider>
    </SafeAreaProvider>
  );
}