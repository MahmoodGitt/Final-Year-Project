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
import {
	getDatabase,
	ref,
	onValue,
	set,
	push,
	onChildAdded,
	update,
	DataSnapshot,
	child,
} from 'firebase/database';

// Import third-Party UI Library
import { Card, Title, Avatar, Searchbar, Paragraph } from 'react-native-paper';
import { Center, SmallCloseIcon } from 'native-base';
import MembersList from '../utilis/MembersList';
import { add, Value } from 'react-native-reanimated';

const Members = ({ navigation, route }) => {
	const [itemList, setItemList] = useState([{ id: 0, name: 'Push' }]);
	const [isMember, setIsMember] = useState(false);

	const currentUser = auth.currentUser.uid;
	const routeData = route.params.id;
	const communityName = route.params.community;
	const db = getDatabase();

	const updateView = () => {
		const getKey = ref(db, 'community/' + routeData + '/members');
		onChildAdded(getKey, (snapshotData) => {
			const existingMembers = snapshotData.val().memID;
			const memberName = snapshotData.val().memName;
			// console.log('id', existingMembers);

			if (existingMembers !== undefined) {
				if (existingMembers !== currentUser) {
					console.log('display', memberName);

					setItemList((prevState) => {
						console.log('before', prevState);

						// remove the intial value hence it is used as placeholder/for intialisation
						if (prevState[0] !== undefined) {
							if (prevState[0].id === 0) {
								prevState.splice(0);
							}
						}
						prevState.push({
							name: memberName,
						});
						console.log('after', prevState);
						return [...prevState];
					});
				}
			}
		});
	};

	useEffect(() => {
		updateView();
	}, []);

	const renderItem = ({ item }) => (
		// <View style={{ alignItems: 'center' }}>
		// 	<Text>{item.author}</Text>
		// </View>
		<MembersList item={[item.name]} navigate={navigation} />
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
