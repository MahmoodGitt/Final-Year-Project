import React, { useEffect, useState } from 'react';

// React Native UI Packages
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Alert,
	Modal,
	Pressable,
} from 'react-native';
import { EvilIcons, FontAwesome } from '@expo/vector-icons';

// Import data from local files
import DismissKeyboard from '../utilis/DismissKeyboard';
import auth from '../firebase/config';
import UserInformation from './UserInformation';
import GlobalKeys from './GlobalKeys';
// import array from './getGlobalKeys';
import keys from './getGlobalKeys';

// Import third-Party UI Library
import { Card, Title } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import {
	getDatabase,
	ref,
	push,
	update,
	child,
	onChildAdded,
} from 'firebase/database';
import Events from '../screens/Events';
import Members from '../screens/Members';

const CommunityList = (props) => {
	const postKey = props.item[4];
	const communityName = props.item[1];
	const interest = props.item[0];
	const userId = props.item[2];
	const subscriptionList = props.item[3];
	const [modalVisible, setModalVisible] = useState(false);
	const [isSubscribed, setIsSubscribed] = useState(subscriptionList);
	const [isMember, setIsMember] = useState(false);

	// Store community name and post ID

	// keys.push(GlobalKeys(communityName, postKey));

	// console.log('my array ', keys);

	/**
	 *  Thsis function is responsible for displaying the correct button. The button's text props shows 'View' if
	 *  the user is subscribed to the community, else the button's text shows 'Become Member'
	 * @param {*} user
	 */
	const isUserAdmin = (user) => {
		if (user === auth.currentUser.uid) {
			setIsMember(true);
		} else {
			const db = getDatabase(); //SHOULD MAKE THIS GLOBAL
			const postRef = ref(db, 'users/' + auth.currentUser.uid + '/groups');
			// Retrieve the user's list of groups
			onChildAdded(postRef, (snapshotData) => {
				const groupList = snapshotData.val().community;
				if (communityName === groupList) {
					// console.log('equal', communityName, groupList);
					setIsMember(true);
				}
			});
		}
	};
	useEffect(() => {
		isUserAdmin(userId);

		// console.log('name', auth.currentUser.displayName);
	}, []);

	const subscribeToCommunity = () => {
		const db = getDatabase();

		// Update user's subscription list for new subscribers
		const groups = { community: communityName };
		// console.log(groups.community);
		const keyref = push(child(ref(db), 'users/' + auth.currentUser.uid)).key;
		// console.log(keyref);
		const updates = {};
		updates['/users/' + auth.currentUser.uid + '/groups/' + keyref] = groups;
		// console.log(updates);
		// console.log(isSubscribed);
		update(ref(db), updates);

		// Update members list in community folder
		const addMember = {
			memID: auth.currentUser.uid,
			memName: auth.currentUser.displayName,
		};
		if (addMember.memID && addMember.memName) {
			const Memref = push(
				child(ref(db), 'community/' + postKey + '/members/' + Memref)
			).key;
			const path = {};
			path['community/' + postKey + '/members/' + Memref] = addMember;
			update(ref(db), path);
			// console.log('path', path);
			setModalVisible(!modalVisible);

			props.nav.navigate('CommunityTopTab', {
				screen: 'Members',
				params: { id: postKey, community: communityName },
			});
		} else {
			console.log('could not subscribe member');
		}
	};

	return (
		<View style={styles.container}>
			<Card style={styles.card}>
				<Card.Title
					title={['Community of ', communityName]}
					subtitle={['Members:']}
				/>
				<Card.Content>
					<Title>{['Interests: ', interest]}</Title>
				</Card.Content>
				<Card.Content>
					{isMember ? (
						<TouchableOpacity
							style={{ alignItems: 'center' }}
							onPress={() => {
								// Maybe not the best coding approach but works
								keys.splice(0);
								keys.push(communityName);

								console.log('my array ', keys[0]);
								props.nav.navigate('CommunityTopTab', {
									screen: 'Members',
									params: {
										id: postKey,
										community: communityName,
										nav: props.nav,
									},
								});
							}}
						>
							<Text style={styles.viewBtn}>View</Text>
						</TouchableOpacity>
					) : (
						<View style={styles.modalCenterView}>
							<Modal
								animationType="slide"
								transparent={true}
								visible={modalVisible}
								onRequestClose={() => {
									Alert.alert('Modal has been closed.');
									setModalVisible(!modalVisible);
								}}
							>
								<View style={styles.modalCenterView}>
									<View style={styles.modalDisplay}>
										<Text style={styles.modalText}>
											Are you sure you want to be a member of {communityName}?
										</Text>
										<View
											style={{
												flexDirection: 'row',
											}}
										>
											<Pressable
												style={[styles.modalbutton, styles.buttonCloseModal]}
												onPress={subscribeToCommunity}
											>
												<Text style={styles.textStyle}>Yes</Text>
											</Pressable>
											<Pressable
												style={[styles.modalbutton, styles.buttonCloseModal]}
												onPress={() => setModalVisible(!modalVisible)}
											>
												<Text style={styles.textStyle}>No</Text>
											</Pressable>
										</View>
									</View>
								</View>
							</Modal>
							<Pressable
								style={[styles.modalbutton, styles.buttonOpenModal]}
								onPress={() => setModalVisible(true)}
							>
								<Text style={styles.textStyle}>Become Member</Text>
							</Pressable>
						</View>
					)}
				</Card.Content>
			</Card>
		</View>
	);
};

export default CommunityList;

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
	viewBtn: {
		fontSize: 18,
		fontWeight: 'bold',
		borderColor: '#009387',
		// borderWidth: 1,
		marginTop: 15,
	},
	modalCenterView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
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
	modalbutton: {
		padding: 10,
		elevation: 2,
		borderRadius: 20,
		marginHorizontal: 30,
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
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
});
