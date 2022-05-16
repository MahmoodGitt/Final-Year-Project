import 'react-native-gesture-handler'; // Handles Drawer object functionality (Must be at the top according to doc.)
import React, { useEffect, useState } from 'react';

import { onAuthStateChanged } from 'firebase/auth';

// React Navigation Packages
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { RootSiblingParent } from 'react-native-root-siblings';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

// import userLoggedIn from './utilis/IsUserSignedIn';
import CustomDrawerItems from './utilis/CustomDrawerItems';
import auth from './firebase/config';

// Import navigation screens
import HomeScreen from './screens/HomeScreen';
import CreateCommunity from './screens/CreateCommunity';
import StartingScreen from './screens/StartingScreen';

// Import third-Party UI Library
import { NativeBaseProvider } from 'native-base';
import ExploreStack from './utilis/ExploreStack';

// Storing the drawer object properties in constants, i.e. intialising the constants
const Drawer = createDrawerNavigator();

const App = () => {
	const [userLoggedIn, setUserLogging] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
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
