import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Members from '../screens/Members';
import Test from '../screens/Test';
import CommunityList from './CommunityList';
import CommunityScreen from '../screens/CommunityScreen';
import Chat from '../screens/Chat';

const ExploreStack = () => {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator>
			<Stack.Screen name="Explore" component={CommunityScreen} />
			<Stack.Screen name="Members" component={Members} />
			<Stack.Screen name="Chat" component={Chat} />
		</Stack.Navigator>
	);
};

export default ExploreStack;
