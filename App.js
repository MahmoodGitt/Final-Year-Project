import 'react-native-gesture-handler'; // Handles Drawer object functionality (Must be at the top according to doc.)
import React, { useEffect, useState } from 'react';

import {
	getAuth,
	onAuthStateChanged,
	FacebookAuthProvider,
	signInWithCredential,
} from 'firebase/auth';

// React Navigation Packages
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';
import { RootSiblingParent } from 'react-native-root-siblings';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Import data from local files
import Members from './screens/Members';
// import userLoggedIn from './utilis/IsUserSignedIn';
import CustomDrawerItems from './utilis/CustomDrawerItems';
import ReadFromDatabase from './utilis/ReadFromDatabase';
import auth from './firebase/config';

// Import navigation screens
import HomeScreen from './screens/HomeScreen';
import CreateCommunity from './screens/CreateCommunity';
import CommunityScreen from './screens/CommunityScreen';
import Chat from './screens/Chat';

import StartingScreen from './screens/StartingScreen';

// Import third-Party UI Library
import { NativeBaseProvider } from 'native-base';
import CommunityList from './utilis/CommunityList';
import ExploreStack from './utilis/ExploreStack';

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
	const [userLoggedIn, setUserLogging] = useState(false);
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				const uid = user.uid;
				setUserLogging(true); // ...
			} else {
				// User is signed out
				// ...
				setUserLogging(false);
			}
		});
	}, []); // Empty array means to only run once.

	return (
		<RootSiblingParent>
			<NativeBaseProvider>
				<NavigationContainer>
					{userLoggedIn ? (
						<Drawer.Navigator
							drawerContent={(props) => <CustomDrawerItems {...props} />}
							useLegacyImplementation={true}
							initialRouteName="Home"
							// headerShown = true
						>
							<Drawer.Screen name="Home" component={HomeScreen} />
							<Drawer.Screen
								name="Create_Community"
								component={CreateCommunity}
								options={{
									headerLeft: false,
								}}
							/>
							<Drawer.Screen
								options={{
									headerShown: false,
								}}
								name="ExploreStack"
								component={ExploreStack}
							/>
							{/* <Drawer.Screen name="Members" component={Members} /> */}
							{/* <Drawer.Screen name="ChatRoom" component={Chat} /> */}
						</Drawer.Navigator>
					) : (
						<StartingScreen />
					)}
				</NavigationContainer>
			</NativeBaseProvider>
		</RootSiblingParent>
	);
};

export default App;
