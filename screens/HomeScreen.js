import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

// Import data from local files
import HomeContent from '../Component/HomeContent';

// Third-Party React Native UI Packages
import { Avatar, IconButton, Card, Title, Paragraph } from 'react-native-paper';

const HomeScreen = ({ route }) => {
	// const userName = route.params.name;

	return (
		<View>
			<HomeContent />
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// alignItems: 'center',
		// justifyContent: 'center',
	},
});
