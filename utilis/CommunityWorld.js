import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Members from '../screens/Members';
import Test from '../screens/Test';
import CommunityList from './CommunityList';
import CommunityScreen from '../screens/CommunityScreen';
import Chat from '../screens/Chat';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Events from '../screens/Events';
import CreateEvents from '../screens/CreateEvent';

const CommunityWorldTabs = ({ props }) => {
	const Tab = createMaterialTopTabNavigator();

	return (
		<Tab.Navigator>
			<Tab.Screen name="Members" component={Members} />

			<Tab.Screen name="Events" component={Events} />
			<Tab.Screen name="Create Event" component={CreateEvents} />
		</Tab.Navigator>
	);
};

export default CommunityWorldTabs;
