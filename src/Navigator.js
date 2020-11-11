import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Feed from './screens/Feed'

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Feed"
                component={Feed}
                options={{
                    tabBarLabel: 'Feed',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Add Photo"
                component={Feed}
                options={{
                    tabBarLabel: 'Add Picture',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="camera" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Feed}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={30} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default function MenuNavigator() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
}