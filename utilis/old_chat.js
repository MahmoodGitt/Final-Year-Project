import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import {
	getDatabase,
	set,
	ref,
	get,
	onChildAdded,
	onValue,
	update,
} from 'firebase/database';

// Data from local files
import auth from '../firebase/config';

const Chat = ({ route }) => {
	const [messages, setMessages] = useState([]);
	const [chatroomId, setChatroomId] = useState(null);
	const currentUserId = route.params.currentUser;
	const selectedUserId = route.params.selectedUser;
	const roomkey = route.params.chatRoomKey;
	// const chatroomKey =
	// console.log(currentUserId, '   ', selectedUserId);
	const database = getDatabase();

	// Load old messages
	const loadData = async () => {
		const getChatroomId = await fetchMessages();

		// console.log('loading');
		// console.log('chatroomid\n\n', getChatroomId.messages);
		// console.log(
		// 	'All messages\n\n\n\n',
		// 	renderMessages(getChatroomId.messages)
		// );
		setMessages(renderMessages(getChatroomId.messages));
	};

	useEffect(async () => {
		// get chatroom ID
		const snapshot = await get(
			ref(database, 'users/' + currentUserId + '/friends/' + selectedUserId)
		);
		setChatroomId(snapshot.val().chatroomId);

		loadData();

		// Listener
		const chatroomRef = ref(database, 'chatrooms/' + roomkey);
		onValue(chatroomRef, (snapshot) => {
			const data = snapshot.val();
			// console.log('data\n\n\n');
			console.log('Value');
			// setMessages(renderMessages(data.messages));

			// 	console.log(data.messages);
		});

		return () => {
			off(chatroomRef);
		};
	}, []);

	const renderMessages = useCallback((msgs) => {
		//structure for chat library:
		// msg = {
		//   _id: '',
		//   user: {
		//     avatar:'',
		//     name: '',
		//     _id: ''
		//   }
		// }

		return msgs
			? msgs.reverse().map((msg, index) => ({
					...msg,
					_id: index,
					user: {
						_id: msg.sender === currentUserId ? currentUserId : selectedUserId,
						avatar: null,
						name: msg.sender === currentUserId ? currentUserId : selectedUserId,
					},
			  }))
			: [];
	}, []);

	const fetchMessages = async () => {
		// Get the chatroom id
		const fecthtChatroomId = await get(ref(database, 'chatrooms/' + roomkey));

		return fecthtChatroomId.val();
	};

	const onSend = useCallback(async (msg = []) => {
		// setMessages((previousMessages) =>
		// 	GiftedChat.append(previousMessages, messages)
		// );

		// const database = getDatabase();
		// const currentChatroomId = await fetchMessages();
		// // console.log(currentChatroomId);
		const lastMessages = [];
		update(ref(database, 'chatrooms/' + roomkey), {
			messages: [
				...lastMessages,
				{
					text: msg[0].text,
					sender: currentUserId,
					createdAt: new Date(),
				},
			],
		});
		setMessages((prevMessages) => GiftedChat.append(prevMessages, msg));
	}, []);

	return (
		<GiftedChat
			messages={messages}
			onSend={(messages) => onSend(messages)}
			user={{
				_id: currentUserId,
				avatar: 'https://placeimg.com/140/140/any',
			}}
		/>
	);
};

export default Chat;

const styles = StyleSheet.create({
	container: { flex: 1 },
	header: { flex: 0.5 },
	footer: {
		flex: 0.2,
	},

	card: {
		marginHorizontal: 15,
		marginBottom: 5,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
	},
});
