import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Spalsh from './screens/Splash'
import Feed from './screens/Feed'
import AddPhoto from './screens/AddPhoto'
import Profile from './screens/Profile'
import Login from './screens/Login'
import Register from './screens/Register'

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
                component={AddPhoto}
                options={{
                    tabBarLabel: 'Add Picture',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="camera" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Auth"
                component={AuthStackStackScreen}
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

const AuthStack = createStackNavigator();

function AuthStackStackScreen() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Profile" component={Profile} />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
}


export default function MenuNavigator() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
}