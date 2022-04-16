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

const CommunityList = (props) => {
	const communityName = props.item[1];
	const interest = props.item[0];
	const userId = props.item[2];
	const subscriptionList = props.item[3];
	const [modalVisible, setModalVisible] = useState(false);
	const [isSubscribed, setIsSubscribed] = useState(subscriptionList);
	const [isMember, setIsMember] = useState(false);
	// var groupList = [];
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
					console.log('equal', communityName, groupList);
					setIsMember(true);
				}
			});
		}
	};
	useEffect(() => {
		isUserAdmin(userId);
	}, []);

	const subscribeToCommunity = () => {
		const db = getDatabase();
		// Update Subscription
		const groups = { community: communityName };
		console.log(groups.community);
		const keyref = push(child(ref(db), 'users/' + auth.currentUser.uid)).key;
		// console.log(keyref);
		const updates = {};
		updates['/users/' + auth.currentUser.uid + '/groups/' + keyref] = groups;
		// console.log(updates);
		// console.log(isSubscribed);
		update(ref(db), updates);
		setModalVisible(!modalVisible);
		props.nav.navigate('Members');
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
								props.nav.navigate('Members');
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
