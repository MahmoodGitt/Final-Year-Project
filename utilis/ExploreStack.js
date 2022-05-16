import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CommunityScreen from '../screens/CommunityScreen';
import Chat from '../screens/Chat';
import CommunityWorldTabs from './CommunityWorld';

// data from local files
import keys from './getGlobalKeys';

const ExploreStack = () => {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator>
			<Stack.Screen name="Explore" component={CommunityScreen} />
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
