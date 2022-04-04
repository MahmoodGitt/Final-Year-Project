import 'react-native-gesture-handler'; // Handles Drawer object functionality
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';
import CustomDrawerItems from './utilis/CustomDrawerItems';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import StartingScreen from './screens/StartingScreen';

// Code starts from here

// Storing the drawer object properties in constants, i.e. intialising the constants
const Drawer = createDrawerNavigator();
const HomeStack = createNativeStackNavigator();

/**
 * The following function contains JSX elements that sets up the navigation properties
 * for the Home Screen component
 * @returns JSX
 */
const HomeScreenComponentStack = () => {
	return (
		<HomeStack.Navigator>
			<HomeStack.Screen
				name="LOL"
				component={HomeScreen}
				options={{
					headerShown: false,
				}}
			/>
		</HomeStack.Navigator>
	);
};

// /**
//  * The following function contains JSX elements that sets up the navigation properties
//  * for the Home Screen component
//  * @returns JSX
//  */
// const LoginScreenComponentStack = () => {
// 	return (
// 		<LoginStack.Navigator>
// 			<LoginStack.Screen
// 				name="Login"
// 				component={LoginScreen}
// 				options={{
// 					// headerShown: false,
// 					headerTintColor: '#fff',
// 					headerTitleStyle: {
// 						fontWeight: 'bold',
// 					},
// 				}}
// 			/>
// 		</LoginStack.Navigator>
// 	);
// };

const App = () => {
	return (
		<NavigationContainer>
			<StartingScreen />
			{/* <Drawer.Navigator
				drawerContent={(props) => <CustomDrawerItems {...props} />}
				useLegacyImplementation={true}
				initialRouteName="Home"
			>
				<Drawer.Screen name="Home" component={HomeScreenComponentStack} />
			</Drawer.Navigator> */}
		</NavigationContainer>
	);
};

export default App;
