import React, { useEffect, useState } from 'react';
// React Native Packages
import { FlatList, StyleSheet, SafeAreaView } from 'react-native';

// Import data from local files
import keys from '../utilis/getGlobalKeys';
import EventList from '../utilis/EventList';

// Firebase services
import { getDatabase, ref, onChildAdded } from 'firebase/database';

// Third-Party React Native UI Packages

const Events = () => {
	const [itemList, setItemList] = useState([{ id: 0 }]);

	const updateView = () => {
		const db = getDatabase();
		// Retrieve all events
		const postRef = ref(db, 'events/');
		// console.log('ref', postRef);
		onChildAdded(postRef, (snapshotData) => {
			// console.log('snap', snapshotData.val());

			if (snapshotData.val().communityName === keys[0]) {
				console.log('snap', snapshotData.val());

				const username = snapshotData.val().admin;
				const activity = snapshotData.val().activity;
				const address = snapshotData.val().address;
				const postcode = snapshotData.val().postcode;
				const date = snapshotData.val().date;
				const time = snapshotData.val().time;
				const createdAt = snapshotData.val().createdAt;
				addEventPost(
					username,
					activity,
					address,
					postcode,
					date,
					time,
					createdAt
				);
			}
		});
	};

	const addEventPost = (
		username,
		activity,
		address,
		postcode,
		date,
		time,
		createdAt
	) => {
		setItemList((prevState) => {
			if (prevState[0].id === 0) {
				prevState.splice(0);
			}
			prevState.push({
				username: username,
				activity: activity,
				address: address,
				postcode: postcode,
				date: date,
				time: time,
				createdAt: createdAt,
			});
			return [...prevState];
		});
	};

	useEffect(() => {
		updateView();
		// console.log('community name', keys, '\n');
	}, []);

	const renderItem = ({ item }) => (
		// console.log('flat list', item);
		<EventList
			item={[
				item.activity,
				item.address,
				item.postcode,
				item.date,
				item.time,
				item.createdAt,
				item.username,
			]}
		/>
	);

	// <CommunityList
	// 	item={[
	// 		item.interest,
	// 		item.communityName,
	// 		item.admin,
	// 		item.members,
	// 		item.id,
	// 	]}
	// 	nav={navigation}
	// />
	// );

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				// key={(item) => {
				// 	return item.in;
				// }}
				data={itemList}
				renderItem={renderItem}
				keyExtractor={(item, index) => {
					return index.toString();
				}}
			/>
		</SafeAreaView>
	);
};
export default Events;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		// flexDirection: 'column',
		alignItems: 'center',
		margin: 20,
	},
	headerText: { fontWeight: 'bold', fontSize: 15 },
	formStyle: {
		// margin: 30,
		alignItems: 'center',
	},

	card: {
		flex: 3,
		backgroundColor: 'white',
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		height: 750,
	},

	action: {
		flexDirection: 'row',
		marginTop: 3,
		marginBottom: 15,
		borderBottomColor: '#f2f2f2',
	},
	featherIcons: {
		marginHorizontal: 20,
		marginVertical: 10,
	},
	errorMsg: {
		color: '#FF0000',
		fontSize: 14,
		marginTop: -20,
		marginBottom: 20,
	},
	text: {
		fontWeight: 'bold',
		fontSize: 30,
	},
	helpIcon: {
		marginHorizontal: 15,
	},
	createButton: {
		marginVertical: 20,
		alignItems: 'center',
	},
	progressBar: {
		marginVertical: 20,
		marginHorizontal: 10,
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'justify',
	},
	modalCenterView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: -100,
	},
	modalDisplay: {
		alignItems: 'center',
		padding: 35,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
	},
	closeModalButton: {
		padding: 10,
		elevation: 2,
		borderRadius: 20,
	},
	modalbutton: {
		elevation: 2,
		borderRadius: 20,
	},
	buttonOpenModal: {
		backgroundColor: 'green',
	},
	buttonCloseModal: {
		backgroundColor: '#2196F3',
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
