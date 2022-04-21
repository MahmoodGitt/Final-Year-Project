import React, { useCallback, useEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { Image, Pressable, StyleSheet, Text } from 'react-native';
import { getDatabase, get, ref, onValue, off, update } from 'firebase/database';

export default function Chat({ onBack, myData, selectedUser }) {
	const [messages, setMessages] = useState([]);
	const currentUserId = route.params.currentUser;
	const selectedUserId = route.params.selectedUser;
	const roomkey = route.params.chatRoomKey;

	useEffect(() => {
		//load old messages
		const loadData = async () => {
			const myChatroom = await fetchMessages();

			setMessages(renderMessages(myChatroom.messages));
		};

		loadData();

		// set chatroom change listener
		const database = getDatabase();
		const chatroomRef = ref(database, `chatrooms/${roomkey}`);
		onValue(chatroomRef, (snapshot) => {
			const data = snapshot.val();
			setMessages(renderMessages(data.messages));
		});

		return () => {
			//remove chatroom listener
			off(chatroomRef);
		};
	}, [fetchMessages, renderMessages, roomkey]);

	const renderMessages = useCallback(
		(msgs) => {
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
							_id:
								msg.sender === currentUserId ? currentUserId : selectedUserId,

							name:
								msg.sender === currentUserId ? currentUserId : selectedUserId,
						},
				  }))
				: [];
		},
		[currentUserId, selectedUserId]
	);

	const fetchMessages = useCallback(async () => {
		const database = getDatabase();

		const snapshot = await get(ref(database, `chatrooms/${roomkey}`));

		return snapshot.val();
	}, [roomkey]);

	const onSend = useCallback(
		async (msg = []) => {
			//send the msg[0] to the other user
			const database = getDatabase();

			//fetch fresh messages from server
			const currentChatroom = await fetchMessages();

			const lastMessages = currentChatroom.messages || [];

			update(ref(database, `chatrooms/${roomkey}`), {
				messages: [
					...lastMessages,
					{
						text: msg[0].text,
						sender: auth.currentUser.displayname,
						createdAt: new Date(),
					},
				],
			});

			setMessages((prevMessages) => GiftedChat.append(prevMessages, msg));
		},
		[fetchMessages, currentUserId, selectedUserId]
	);

	return (
		<>
			<GiftedChat
				messages={messages}
				onSend={(newMessage) => onSend(newMessage)}
				user={{
					_id: currentUserId,
				}}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	actionBar: {
		backgroundColor: '#cacaca',
		height: 41,
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
	},
});
