import React, { useEffect, useState } from 'react';

// React Native UI Packages
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Alert,
	Modal,
	Pressable,
} from 'react-native';
import { EvilIcons, FontAwesome } from '@expo/vector-icons';

// Import data from local files
import DismissKeyboard from '../utilis/DismissKeyboard';
import auth from '../firebase/config';
import UserInformation from './UserInformation';
import keys from './getGlobalKeys';

// Import third-Party UI Library
import { Card, Title, Avatar, Paragraph } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import {
	getDatabase,
	ref,
	push,
	update,
	child,
	onChildAdded,
} from 'firebase/database';

const EventList = (props) => {
	const activity = props.item[0];
	const address = props.item[1];
	const postcode = props.item[2];
	const date = props.item[3];
	const time = props.item[4];
	const createdAt = props.item[5];
	const username = props.item[6];

	const [showDetails, setShowDetails] = useState(false);

	useEffect(() => {
		console.log('name', activity);
	}, []);

	return (
		<View style={styles.container}>
			<Card style={styles.card}>
				<Card.Content style={{ flexDirection: 'row' }}>
					<Avatar.Image
						// style={{ margin: 10 }}
						source={require('../Images/profile_pic.jpg')}
						size={50}
					/>
					<Text style={{ marginTop: 15, marginLeft: 5 }}>{username}</Text>
				</Card.Content>

				<Card.Content style={styles.descriptionHeader}>
					<Title>Activity</Title>
				</Card.Content>
				<Card.Content style={styles.description}>
					<Title> {activity} </Title>
				</Card.Content>
				<TouchableOpacity
					style={styles.showDetails}
					onPress={() => setShowDetails(!showDetails)}
				>
					{showDetails ? <Text>Show less </Text> : <Text> More Details </Text>}
				</TouchableOpacity>

				{showDetails ? (
					<Card.Content style={styles.activityDetails}>
						<Paragraph>Date: {date}</Paragraph>
						<Paragraph>Time: {time}</Paragraph>
						<Paragraph>Address: {address} </Paragraph>
						<Paragraph>Postcode: {postcode}</Paragraph>
					</Card.Content>
				) : null}

				<Card.Content style={{ alignItems: 'flex-start', marginTop: 20 }}>
					<Paragraph style={{ fontSize: 10 }}>
						Event created at {createdAt}
					</Paragraph>
				</Card.Content>
			</Card>
		</View>
	);
};

export default EventList;

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
	descriptionHeader: { alignItems: 'center' },
	description: {},
	activityDetails: {
		marginTop: 20,
	},
	showDetails: {
		alignItems: 'center',
		margin: 15,
	},
});
