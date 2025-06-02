import React from 'react';
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Utils/Colors';
import { useCart } from '../Context/CartContext';
import { StatusBar } from 'react-native';

import HomeScreen from '../Screens/Home/HomeScreen';
import OrdersScreen from '../Screens/Orders/OrdersScreen';
import GalleryScreen from '../Screens/Gallery/GalleryScreen';
import OtherScreen from '../Screens/Other/OtherScreen';
import HotelRoomsScreen from '../Screens/About/HotelRoomsScreen';
import SwimmingPoolScreen from '../Screens/About/SwimmingPoolScreen';
import GymScreen from '../Screens/About/GymScreen';
import FunctionHallScreen from '../Screens/About/FunctionHallScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function GalleryStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="GalleryMain" 
                component={GalleryScreen} 
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="HotelRooms" 
                component={HotelRoomsScreen}
                options={{
                    title: 'Hotel Rooms',
                    headerStyle: {
                        backgroundColor: Colors.PRIMARY,
                    },
                    headerTintColor: Colors.WHITE,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
            <Stack.Screen 
                name="SwimmingPool" 
                component={SwimmingPoolScreen}
                options={{
                    title: 'Swimming Pool',
                    headerStyle: {
                        backgroundColor: Colors.PRIMARY,
                    },
                    headerTintColor: Colors.WHITE,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
            <Stack.Screen 
                name="Gym" 
                component={GymScreen}
                options={{
                    title: 'Gym & Fitness',
                    headerStyle: {
                        backgroundColor: Colors.PRIMARY,
                    },
                    headerTintColor: Colors.WHITE,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
            <Stack.Screen 
                name="FunctionHall" 
                component={FunctionHallScreen}
                options={{
                    title: 'Function Halls',
                    headerStyle: {
                        backgroundColor: Colors.PRIMARY,
                    },
                    headerTintColor: Colors.WHITE,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
        </Stack.Navigator>
    );
}

export default function BottomTabNavigation() {
    const { cart } = useCart();
    return (
        <>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent={true}
            />
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
                            <View>
                                <Ionicons name="cart-outline" size={size} color={color} />
                                {cart.length > 0 && (
                                    <View style={{
                                        position: 'absolute',
                                        right: -6,
                                        top: -3,
                                        backgroundColor: Colors.PRIMARY,
                                        borderRadius: 8,
                                        width: 16,
                                        height: 16,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Text style={{
                                            color: Colors.WHITE,
                                            fontSize: 10,
                                            fontWeight: 'bold',
                                        }}>{cart.length}</Text>
                                    </View>
                                )}
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Gallery"
                    component={GalleryStack}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="images-outline" size={size} color={color} />
                        ),
                    }}
                />
                 <Tab.Screen name="Other" component={OtherScreen} 
                options={{
                    tabBarLabel: ({color}) => (<Text style={{color: color, fontSize: 12, marginTop: -7}}>About Hotel</Text>),
                    tabBarIcon: ({color, size}) => (<Ionicons name="business-outline" size={size} color={color}/>)
                }}/>
            </Tab.Navigator>
        </>
    );
} 