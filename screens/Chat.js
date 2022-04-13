import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { GiftedChat, IMessage } from 'react-native-gifted-chat';

//Third-Party UI Package
import { Input } from 'native-base';
const Chat = () => {
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		setMessages([
			{
				_id: 1,
				text: 'Hello developer',
				createdAt: new Date(),
				user: {
					_id: 2,
					name: 'React Native',
					// avatar: 'https://placeimg.com/140/140/any',
				},
			},
		]);
	}, []);

	const onSend = useCallback((messages = []) => {
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, messages)
		);
	}, []);

	return (
		<GiftedChat
			messages={messages}
			onSend={(messages) => onSend(messages)}
			user={{
				_id: 1,
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
