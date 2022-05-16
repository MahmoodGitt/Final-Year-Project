/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React from 'react';

// Import data from local files
import auth from '../firebase/config';

// React Native UI Packages
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Import third-Party UI Library
import { Card, Avatar } from 'react-native-paper';
import { getDatabase, ref, get, update } from 'firebase/database';
import { doc, collection, getFirestore, setDoc } from 'firebase/firestore';

const MembersList = (props) => {
	const selectedUserName = props.item[0];
	const selectedUserId = props.item[1];
	const currentUserId = props.userId;

	const findChatRoom = async () => {
		// Check if current user and selected user are friends
		const database = getDatabase();
		const snapshot = await get(
			ref(database, 'users/' + currentUserId + '/friends/' + selectedUserId)
		);

		// If they are friends navigate to chat pages, else create a chatroom and add them as friends
		if (snapshot.val() !== null) {
			const keyRef = snapshot.val().chatroomId;
			console.log('friends');
			// console.log(keyRef);
			props.navigate.navigate('Chat', {
				currentUser: currentUserId,
				selectedUser: selectedUserId,
				chatroomId: keyRef,
			});
		} else {
			console.log('not friends');
			createChatRoom();
			// props.navigate.navigate('Chat');
		}
	};

	const createChatRoom = async () => {
		try {
			// Create a new chatroom with an unique ID
			const database = getFirestore();
			// const newChatroom = push(ref(database, 'chatrooms'), {
			// 	firstUser: currentUserId,
			// 	secondUser: selectedUserId,
			// 	messages: ['Placeholder'],
			// });

			// Add a new document with a generated id
			const chatroomKey = doc(collection(database, 'chatrooms'));

			console.log('key', chatroomKey.id);

			// Add a new document in collection
			await setDoc(chatroomKey, {
				currentUserId: currentUserId,
				selectedUserId: selectedUserId,
			});

			// const chatRoomKey = newChatroom.key;
			addFriend(chatroomKey.id);
		} catch (error) {
			console.log('Error Message: ' + error);
		}
	};

	/**
	 *
	 */
	const addFriend = (keyRef) => {
		try {
			// Add selected user to current user's friend list
			const database = getDatabase();
			update(
				ref(database, 'users/' + currentUserId + '/friends/' + selectedUserId),
				{
					username: selectedUserName,
					chatroomId: keyRef,
				}
			);

			// Add current user to selected user's friend list
			update(
				ref(database, 'users/' + selectedUserId + '/friends/' + currentUserId),
				{
					username: auth?.currentUser?.displayName,
					chatroomId: keyRef,
				}
			);

			// navigate to chat
			props.navigate.navigate('Chat', {
				currentUser: currentUserId,
				selectedUser: selectedUserId,
				chatroomKey: keyRef.id,
			});
		} catch (error) {
			console.log('Error Message: ' + error);
		}
	};

	return (
		<View style={styles.container}>
			<Card style={styles.card}>
				<Card.Title
					title={[selectedUserName]}
					subtitle={['Interests: C#, Java']}
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
							findChatRoom();
							// props.navigate.navigate('Chat');
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
