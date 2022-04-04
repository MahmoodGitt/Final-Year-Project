import 'react-native-gesture-handler'; // Handles Drawer object functionality
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
const HomeStack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();

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

const LoginScreenComponentStack = () => {
	return (
		<LoginStack.Navigator>
			<LoginStack.Screen
				name="Login"
				component={LoginScreen}
				options={{
					// headerShown: false,
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: 'bold',
					},
				}}
			/>
		</LoginStack.Navigator>
	);
};

const App = () => {
	return (
		<NavigationContainer>
			<Drawer.Navigator useLegacyImplementation={true} initialRouteName="Home">
				<Drawer.Screen name="HomeScreen" component={HomeScreenComponentStack} />
				<Drawer.Screen name="Login" component={LoginScreenComponentStack} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
};

export default App;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		height: 100,
		padding: 20,
		flexDirection: 'row',
	},
	materialButtonViolet: {
		height: 36,
		width: 100,
	},
});
