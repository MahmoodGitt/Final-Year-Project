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
import {
	Button,
	StyleSheet,
	Text,
	View,
	Platform,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';

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
import { cos } from 'react-native-reanimated';

// Storing the drawer object properties in constants, i.e. intialising the constants
const Drawer = createDrawerNavigator();
const HomeStack = createNativeStackNavigator();
//
import {
	// en,
	// nl,
	// de,
	// pl,
	// pt,
	enGB,
	registerTranslation,
} from 'react-native-paper-dates';
// registerTranslation('en', en)
// registerTranslation('nl', nl)
// registerTranslation('pl', pl)
// registerTranslation('pt', pt)
// registerTranslation('de', de)

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
	registerTranslation('en-GB', enGB);
	const [userLoggedIn, setUserLogging] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const uid = user.uid;
				setIsLoading(false);
				setUserLogging(true); // ...
			} else {
				// User is signed out
				// ...
				setIsLoading(false);
				setUserLogging(false);
			}
		});
	}, []); // Empty array means to only run once.

	// The purpose of the following condition is to display a loading screen while onAuthStateChanged checks the state of the user (logged in or logged out)
	if (isLoading) {
		return (
			<View style={[styles.container, styles.horizontal]}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

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
							/>
							<Drawer.Screen
								options={{
									headerShown: false,
								}}
								name="ExploreStack"
								component={ExploreStack}
							/>
						</Drawer.Navigator>
					) : (
						<StartingScreen />
					)}
				</NavigationContainer>
			</NativeBaseProvider>
		</RootSiblingParent>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	horizontal: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 10,
	},
});
export default App;
