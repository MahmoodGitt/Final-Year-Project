import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Firebase database services
import { getDatabase, ref, onValue } from 'firebase/database';

// Import data from local files
import DismissKeyboard from '../utilis/DismissKeyboard';
import auth from '../firebase/config';
import CommunityScreen from './CommunityScreen';
import UserInformation from '../utilis/UserInformation';

// Third-Party  UI Packages
import { Card, Title, Paragraph, Avatar, Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

const HomeScreen = ({ route }) => {
	// const userName = route.params.data.email;
	const [data, setData] = useState({
		username: '',
	});

	const [username, setUsername] = useState('');
	UserInformation();
	useEffect(() => {
		setUsername(auth.currentUser.displayName);
		// console.log(auth.currentUser.displayName);
	}, []);

	return (
		<DismissKeyboard>
			<View styles={styles.container}>
				<View style={styles.header}>
					<AntDesign name="home" size={24} color="black" />
				</View>
				<View>
					{/* <>{userName.email}</> */}
					<Text style={styles.username}>{data.username}</Text>
				</View>
				<Card style={styles.card}>
					<Card.Content>
						<Title> My Communities </Title>
						<Paragraph>Display communities </Paragraph>
					</Card.Content>
				</Card>

				<Card style={styles.card}>
					<Card.Content>
						<Title>Activities</Title>
						<Paragraph>No Activity</Paragraph>
					</Card.Content>
				</Card>
				<Card style={styles.card}>
					<Card.Title title="Connections" />
					<Card.Content style={styles.connections}>
						<Avatar.Image
							source={require('../Images/profile_pic.jpg')}
							size={50}
						/>

						<Avatar.Image
							source={require('../Images/profile_pic.jpg')}
							size={50}
						/>
					</Card.Content>
					<Card.Content>
						<Text>User</Text>
					</Card.Content>
				</Card>
			</View>
		</DismissKeyboard>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		alignItems: 'center',
		padding: 10,
	},
	username: {
		fontSize: 20,
		marginHorizontal: 10,
		paddingBottom: 5,
	},
	card: {
		marginHorizontal: 15,
		marginBottom: 5,
	},
	users: {
		padding: 5,
	},
	connections: {
		flexDirection: 'row',
	},
});
