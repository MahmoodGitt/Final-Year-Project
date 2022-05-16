import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';

const StartingScreenStack = createNativeStackNavigator();

const StartingScreen = () => {
	return (
		<StartingScreenStack.Navigator>
			<StartingScreenStack.Screen
				options={{
					headerShown: false,
				}}
				name="Login"
				component={LoginScreen}
			/>
			<StartingScreenStack.Screen
				options={{ animationTypeForReplace: 'pop' }}
				name="SignUp"
				component={SignUpScreen}
			/>
		</StartingScreenStack.Navigator>
	);
};

export default StartingScreen;
