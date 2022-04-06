import 'react-native-gesture-handler'; // Handles Drawer object functionality (Must be at the top according to doc.)
import React, { useState } from 'react';

// React Navigation Packages
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

// Import data from local files
import userLoggedIn from './utilis/IsUserSignedIn';
import CustomDrawerItems from './utilis/CustomDrawerItems';

// Import drawer screens
import HomeScreen from './screens/HomeScreen';
import CreateCommunity from './screens/CreateCommunity';

// Import login and sign up screens
import StartingScreen from './screens/StartingScreen';

// Storing the drawer object properties in constants, i.e. intialising the constants
const Drawer = createDrawerNavigator();
const HomeStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

/**
 * The following function contains JSX elements that sets up the navigation properties
 * for the Home Screen component
 * @returns JSX
 */
const HomeScreenComponentStack = () => {
	return (
		<HomeStack.Navigator>
			<HomeStack.Screen
				name="Home"
				component={HomeScreen}
				options={{
					headerShown: false,
				}}
			/>
		</HomeStack.Navigator>
	);
};

const App = () => {
	const handleDisplay = () => {};

	return (
		<NavigationContainer>
			{userLoggedIn ? (
				<Drawer.Navigator
					drawerContent={(props) => <CustomDrawerItems {...props} />}
					useLegacyImplementation={true}
					initialRouteName="Home"
				>
					<Drawer.Screen name="Home" component={HomeScreen} />
					<Drawer.Screen name="Create_Community" component={CreateCommunity} />
				</Drawer.Navigator>
			) : (
				(console.log('Not signed In'), (<StartingScreen />))
			)}
		</NavigationContainer>
	);
};

export default App;
