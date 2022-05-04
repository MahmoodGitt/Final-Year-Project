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
import keys from '../utilis/getGlobalKeys';

// Import database services from Firebase
import { getDatabase, ref, get, onChildAdded } from 'firebase/database';

// Import third-Party UI Library
import { Card, Title, Avatar, Searchbar, Paragraph } from 'react-native-paper';

import MembersList from '../utilis/MembersList';

const Members = ({ navigation, route }) => {
	const [itemList, setItemList] = useState([]);

	const currentUser = auth.currentUser.uid;
	const routeData = route.params.id;

	// console.log('My array is done ', keys);

	useEffect(() => {
		// console.log('in members');
		// console.log(route.params.nav);
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
					}
				}
			});
		};
		updateView();
	}, []);

	const renderItem = ({ item }) => (
		<MembersList
			item={[item.name, item.memberId]}
			userId={currentUser}
			navigate={route.params.nav}
		/>
	);

	return (
		<SafeAreaView style={styles.container}>
			{/* <Searchbar placeholder="Search for user" /> */}
			<FlatList
				data={itemList}
				renderItem={renderItem}
				keyExtractor={(item, index) => {
					return index.toString();
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
