/* eslint-disable react/prop-types */
import React, { useState, useCallback, useLayoutEffect } from 'react';

import { GiftedChat } from 'react-native-gifted-chat';
import {
	orderBy,
	collection,
	query,
	getFirestore,
	onSnapshot,
	addDoc,
} from 'firebase/firestore';
import auth from '../firebase/config';

const Chat = ({ route }) => {
	const [messages, setMessages] = useState([]);
	const chatroomId = route.params.chatroomId;

	useLayoutEffect(() => {
		const loadMessages = () => {
			const db = getFirestore();
			const q = query(
				collection(db, 'chatrooms/' + chatroomId + '/messages'),
				orderBy('createdAt', 'desc')
			);
			const unsubscribe = onSnapshot(q, (snapshot) =>
				setMessages(
					snapshot.docs.map((doc) => ({
						_id: doc.data()._id,
						createdAt: doc.data().createdAt.toDate(),
						text: doc.data().text,
						user: doc.data().user,
					}))
				)
			);
			return () => {
				unsubscribe();
			};
		};
		loadMessages();
	}, []);

	const onSend = useCallback((msg = []) => {
		const { _id, createdAt, text, user } = msg[0];
		const database = getFirestore();
		addDoc(collection(database, 'chatrooms/' + chatroomId + '/messages'), {
			_id,
			createdAt,
			text,
			user,
		});

		setMessages((prevMessages) => GiftedChat.append(prevMessages, msg));
	}, []);

	return (
		<GiftedChat
			messages={messages}
			onSend={(messages) => onSend(messages)}
			user={{
				_id: auth?.currentUser?.uid,
				avatar: 'https://placeimg.com/140/140/any',
			}}
			showAvatarForEveryMessage={true}
		/>
	);
};

export default Chat;
