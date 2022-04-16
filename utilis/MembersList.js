import React, { useState } from 'react';

// React Native UI Packages
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { EvilIcons, FontAwesome } from '@expo/vector-icons';

// Import data from local files
import DismissKeyboard from '../utilis/DismissKeyboard';

// Import third-Party UI Library
import { Card, Title, Avatar, Searchbar, Paragraph } from 'react-native-paper';

const MembersList = (props) => {
	return (
		<View style={styles.container}>
			<Card style={styles.card}>
				<Card.Title
					title={['Callum ', props.item]}
					subtitle={['Interests: C#, Java', '']}
					left={() => (
						<Avatar.Image
							source={require('../Images/profile_pic.jpg')}
							size={50}
						/>
					)}
				/>
				<Card.Content>
					<TouchableOpacity
						style={{ alignItems: 'center' }}
						onPress={() => {
							props.navigate.navigate('Chat');
						}}
					>
						<Text style={styles.viewBtn}>Chat</Text>
					</TouchableOpacity>
				</Card.Content>
			</Card>
		</View>
	);
};

export default MembersList;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		flexDirection: 'row',
	},
	body: {
		flex: 1,
		padding: 5,
	},
	card: {
		marginHorizontal: 15,
		marginBottom: 5,
		marginTop: 10,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
	},
	viewBtn: {
		fontSize: 18,
		fontWeight: 'bold',
		borderColor: '#009387',
		// borderWidth: 1,
		marginTop: 15,
	},
});
