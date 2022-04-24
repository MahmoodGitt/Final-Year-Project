import React, {
	useState,
	useCallback,
	useEffect,
	useLayoutEffect,
} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import {
	orderBy,
	collection,
	query,
	getFirestore,
	onSnapshot,
	where,
	addDoc,
	setDoc,
	doc,
	updateDoc,
	getDocs,
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
