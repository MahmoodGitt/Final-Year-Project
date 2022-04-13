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
	// const [data, setData] = useState({
	// 	authorName: '',
	// 	communityName: '',
	// });

	const [itemList, setItemList] = useState([{}]);
	const [data, setData] = useState([]);

	const updateView = () => {
		const db = getDatabase();
		const commentsRef = ref(db, 'community');

		onChildAdded(commentsRef, (snapshotData) => {
			const postId = snapshotData.key;
			const communityName = snapshotData.val().communityName;
			const interest = snapshotData.val().interest;
			const admin = snapshotData.val().admin;
			const members = snapshotData.val().Members;
			// console.log('community', communityName);
			// console.log(interest);
			// console.log(admin);
			// console.log(members);
			// console.log(postId);
			addPost(postId, communityName, interest, admin, members);
		});
	};

	useEffect(() => {
		updateView();
		// setData(test);
	}, []);

	const addPost = (
		list_postId,
		list_communityName,
		list_interest,
		list_admin,
		list_members
	) => {
		setItemList((prevState) => {
			prevState.push({
				id: list_postId,
				communityName: list_communityName,
				interest: list_interest,
				members: list_members,
			});
			return [...prevState];
		});
	};

	const renderItem = ({ item }) => (
		// <View style={{ alignItems: 'center' }}>
		// 	<Text>{item.author}</Text>
		// </View>
		<CommunityList
			// itemz={item.communityName}
			item={[item.interest, item.communityName, item.members]}
			// interest={item.interest}
			members={item.members}
			navigate={navigation}
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
				extraData={itemList}
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
