import React, { useState } from 'react';

// React Native UI Packages
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { EvilIcons, FontAwesome } from '@expo/vector-icons';

// Import data from local files
import DismissKeyboard from '../utilis/DismissKeyboard';

// Import third-Party UI Library
import { Card, Title, Avatar, Searchbar, Paragraph } from 'react-native-paper';

const CommunityList = (props) => {
	const communityData = [
		{
			id: 1,
			communityName: 'Salford Programmers',
			interest: 'Programming',
			Members: 6,
		},
		{
			id: 2,
			communityName: 'MMU Programmers',
			interest: 'Cyber Security',
			Members: 5,
		},
	];
	return (
		<View style={styles.container}>
			<Card style={styles.card}>
				<Card.Title
					title={['Community Name: ', props.item]}
					subtitle={['Interest:', '']}
					left={() => (
						<Avatar.Image
							source={require('../Images/profile_pic.jpg')}
							size={50}
						/>
					)}
				/>
				<Card.Content>
					<Title>Members:</Title>
				</Card.Content>
				<Card.Content>
					<TouchableOpacity style={styles.viewBtn}>
						<Text>View</Text>
					</TouchableOpacity>
				</Card.Content>
			</Card>
		</View>
	);
};

export default CommunityList;

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
});
