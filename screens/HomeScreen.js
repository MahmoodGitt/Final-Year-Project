import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const HomeScreen = ({ route }) => {
	// const userName = route.params.name;

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			{/* <Button
				onPress={() => {
					console.log('username is', userName);
				}}
				title="click me"
			/> */}
			<Text>HomePage</Text>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({});
