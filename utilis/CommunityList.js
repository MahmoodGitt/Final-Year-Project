import React, { useState } from 'react';

// React Native UI Packages
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { EvilIcons, FontAwesome } from '@expo/vector-icons';

// Import data from local files
import DismissKeyboard from '../utilis/DismissKeyboard';

// Import third-Party UI Library
import { Card, Title, Avatar, Searchbar, Paragraph } from 'react-native-paper';

const CommunityList = (props) => {
	return (
		<View style={styles.container}>
			<Card style={styles.card}>
				<Card.Title
					title={['Community: ', props.item[0]]}
					subtitle={['Interest:', props.item[1]]}
				/>
				<Card.Content>
					<Title>{['Members ', props.item[2]]}</Title>
				</Card.Content>
				<Card.Content>
					<TouchableOpacity
						style={{ alignItems: 'center' }}
						onPress={() => {
							props.navigate.navigate('Members');
						}}
					>
						<Text style={styles.viewBtn}>Enter</Text>
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
	viewBtn: {
		fontSize: 18,
		fontWeight: 'bold',
		borderColor: '#009387',
		// borderWidth: 1,
		marginTop: 15,
	},
});
