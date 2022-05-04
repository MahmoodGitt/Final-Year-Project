import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Members from '../screens/Members';
import Test from '../screens/Test';
import CommunityList from './CommunityList';
// import screens
import CommunityScreen from '../screens/CommunityScreen';
import Chat from '../screens/Chat';
import CommunityWorldTabs from './CommunityWorld';

// data from local files
import keys from './getGlobalKeys';

const ExploreStack = () => {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator>
			<Stack.Screen
				options={{
					headerLeft: () => {
						return (
							<View>
								<Text>Go back</Text>
							</View>
						);
					},
				}}
				name="Explore"
				component={CommunityScreen}
			/>
			<Stack.Screen name="Chat" component={Chat} />
			<Stack.Screen
				name="CommunityTopTab"
				options={{
					title: keys[0],
					headerStyle: {
						backgroundColor: '#f4511e',
					},
				}}
				component={CommunityWorldTabs}
			/>
		</Stack.Navigator>
	);
};

export default ExploreStack;
