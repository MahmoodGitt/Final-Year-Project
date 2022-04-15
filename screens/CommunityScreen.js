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
import { EvilIcons, FontAwesome } from '@expo/vector-icons';

// Import data from local files
import DismissKeyboard from '../utilis/DismissKeyboard';
import CommunityList from '../utilis/CommunityList';
import keys from '../utilis/StoreKeys';
import auth from '../firebase/config';

// Import database services from Firebase
import { getDatabase, ref, onChildAdded } from 'firebase/database';

// Import third-Party UI Library
import { Card, Title, Avatar, Searchbar, Paragraph } from 'react-native-paper';
import { Center } from 'native-base';

const CommunityScreen = ({ navigation }) => {
	const [itemList, setItemList] = useState([{ id: 0 }]);
	const [data, setData] = useState([]);
	// const [subscribe, setSubscribe] = useState('');
	var subscribe = null;

	const updateView = () => {
		const db = getDatabase();
		const postRef = ref(db, 'community/');

		onChildAdded(postRef, (snapshotData) => {
			const postId = snapshotData.key;
			const communityName = snapshotData.val().communityName;
			const interest = snapshotData.val().interest;
			const admin = snapshotData.val().admin;

			// console.log('community', communityName);
			// console.log(interest);
			// console.log(admin);
			// console.log(postId);
			// console.log(subscribe);

			if (subscribe === communityName) {
				addPost(postId, communityName, interest, admin, true);
			} else {
				addPost(postId, communityName, interest, admin, false);
			}
		});
	};

	const checkUserSubscription = () => {
		try {
			const db = getDatabase(); //SHOULD MAKE THIS GLOBAL
			const postRef = ref(db, 'users/' + auth.currentUser.uid + '/groups');

			onChildAdded(postRef, (snapshotData) => {
				if (subscribe === undefined || subscribe === null) {
					subscribe = snapshotData.val().community;
				}
			});
		} catch (error) {
			console.log("Could not find community name in user's subscription");
		}
	};

	useEffect(() => {
		checkUserSubscription();
		updateView();
	}, []);

	/**
	 * This function displays the data that is fetched from the database. The data belongs to the posts
	 * which are rendered in explore page
	 * @param {Post ID} list_postId
	 * @param {Community_Name} list_communityName
	 * @param {Interest} list_interest
	 * @param {Admin} list_admin
	 * @param {Members} list_members
	 * @param {MemberID} list_memberId
	 */
	const addPost = (
		list_postId,
		list_communityName,
		list_interest,
		list_admin,
		list_subs
	) => {
		setItemList((prevState) => {
			if (prevState[0].id === 0) {
				prevState.splice(0);
			}
			prevState.push({
				id: list_postId,
				communityName: list_communityName,
				interest: list_interest,
				admin: list_admin,
				subscribed: list_subs,
			});

			return [...prevState];
		});
	};

	const renderItem = ({ item }) => (
		// console.log(item);
		<CommunityList
			item={[item.interest, item.communityName, item.admin, item.subscribed]}
		/>
	);

	return (
		<SafeAreaView style={styles.container}>
			{/* <View>
				<TouchableOpacity onPress={updateView} style={{ margin: 15 }}>
					<Text style={{ fontSize: 40 }}>Click</Text>
				</TouchableOpacity>
			</View> */}
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

export default CommunityScreen;

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
