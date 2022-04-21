import React, { useEffect, useState } from 'react';

// React Native UI Packages
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	FlatList,
	SafeAreaView,
	View,
} from 'react-native';

// Import data from local files
import auth from '../firebase/config';

// Import database services from Firebase
import { getDatabase, ref, get, onChildAdded } from 'firebase/database';

// Import third-Party UI Library
import { Card, Title, Avatar, Searchbar, Paragraph } from 'react-native-paper';

import MembersList from '../utilis/MembersList';

const Members = ({ navigation, route }) => {
	const [itemList, setItemList] = useState([]);
	const [isMember, setIsMember] = useState(false);

	const currentUser = auth.currentUser.uid;
	const routeData = route.params.id;
	// const communityName = route.params.community;
	const db = getDatabase();

	useEffect(() => {
		/**
		 * Display members apart from current user
		 */
		const updateView = async () => {
			const db = getDatabase();
			const getKey = ref(db, 'community/' + routeData + '/members');
			onChildAdded(getKey, (snapshotData) => {
				const memberId = snapshotData.val().memID;
				const memberName = snapshotData.val().memName;

				if (memberId !== undefined) {
					if (memberId !== currentUser) {
						setItemList(() => {
							itemList.push({
								name: memberName,
								memberId: memberId,
							});
							return [...itemList];
						});
						// setItemList((prevState) => {
						// 	// remove the intial value hence it is used as placeholder/for intialisation
						// 	// if (prevState[0] !== undefined) {
						// 	// 	console.log(prevState);
						// 	// 	if (prevState[0].id === 0) {
						// 	// 		prevState.splice(0);
						// 	// 	}
						// 	// }
						// 	if (prevState) {
						// 		// prevState.push({
						// 		// 	name: memberName,
						// 		// 	memberId: memberId,
						// 		// });
						// 		console.log(prevState);
						// 	}

						// 	// console.log('after', prevState);
						// 	return [...prevState];
						// });
					}
				}
			});
		};
		updateView();
	}, []);

	const renderItem = ({ item }) => (
		// <View style={{ alignItems: 'center' }}>
		// 	<Text>{item.author}</Text>
		// </View>
		<MembersList
			item={[item.name, item.memberId]}
			userId={currentUser}
			navigate={navigation}
		/>
	);

	return (
		<SafeAreaView style={styles.container}>
			<Searchbar placeholder="Search for user" />
			<FlatList
				data={itemList}
				renderItem={renderItem}
				keyExtractor={(item) => {
					return item.id;
				}}
				// extraData={itemList}
			/>
		</SafeAreaView>
	);
};

export default Members;

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
});
