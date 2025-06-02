import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './AuthStack';
import BottomTabNavigation from './BottomTabNavigation';

const Stack = createStackNavigator();

const RootNavigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Auth">
          {(props) => <AuthStack {...props} setIsAuthenticated={setIsAuthenticated} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="MainApp" component={BottomTabNavigation} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigation; 