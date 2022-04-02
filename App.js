import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
// import { Home } from '../app/views/Home.';

// export default function App() {
// 	return (
// 		<View style={StyleSheet.container}>
// 			<View style={{ backgroundColor: 'blue', flex: 0.3 }} />
// 			<Text>Hello World!</Text>
// 		</View>
// 	);
// }

const Stack = createNativeStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="LoginScreen">
				<Stack.Screen
					name="Login"
					component={LoginScreen}
					options={{
						title: 'Uni Mate',
						headerStyle: {
							backgroundColor: '#f4511e',
						},
						headerTintColor: '#fff',
						headerTitleStyle: {
							fontWeight: 'bold',
						},
					}}
				/>
				<Stack.Screen
					name="Home"
					component={HomeScreen}
					options={{ title: 'Home' }}
				/>
			</Stack.Navigator>
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
