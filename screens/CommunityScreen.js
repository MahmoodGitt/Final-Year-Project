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
} from 'firebase/database';

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
		const commentsRef = ref(db, 'users/' + auth.currentUser.uid + '/test/');
		onChildAdded(commentsRef, (test) => {
			addPost(test.key, test.val().communityName);
		});
	};

	useEffect(() => {
		updateView();
		// setData(test);
	}, []);

	const addPost = (key, communityName) => {
		setItemList((prevState) => {
			prevState.push({ id: key, communityName: communityName });
			return [...prevState];
		});
	};

	const renderItem = ({ item }) => (
		// <View style={{ alignItems: 'center' }}>
		// 	<Text>{item.author}</Text>
		// </View>
		<CommunityList item={item.communityName} navigate={navigation} />
	);

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={itemList}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
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
