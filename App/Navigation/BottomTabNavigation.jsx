import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Utils/Colors';

import HomeScreen from '../Screens/Home/HomeScreen';
import OrdersScreen from '../Screens/Orders/OrdersScreen';
import GalleryScreen from '../Screens/Gallery/GalleryScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.PRIMARY,
                tabBarInactiveTintColor: Colors.GREY,
                tabBarStyle: {
                    backgroundColor: Colors.WHITE,
                    borderTopWidth: 1,
                    borderTopColor: Colors.LIGHT_GREY,
                    paddingBottom: 5,
                    paddingTop: 5,
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Orders"
                component={OrdersScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="cart-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Gallery"
                component={GalleryScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="images-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
} 