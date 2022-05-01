import React, { useEffect, useState } from 'react';
// React Native Packages
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	ImageBackground,
	TouchableWithoutFeedback,
	Alert,
	Pressable,
	Modal,
} from 'react-native';
import Toast from 'react-native-root-toast';

// Import data from local files
import DismissKeyboard from '../utilis/DismissKeyboard';
import auth from '../firebase/config';

// Firebase services
import {
	getDatabase,
	ref,
	onValue,
	set,
	push,
	onChildAdded,
	update,
	child,
	get,
} from 'firebase/database';

// Third-Party React Native UI Packages
import {
	Card,
	Title,
	Paragraph,
	Button,
	Avatar,
	ProgressBar,
	Colors,
	Appbar,
	RadioButton,
	Snackbar,
} from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import { Center, Column, Input } from 'native-base';
import { setStatusBarTranslucent } from 'expo-status-bar';
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { async } from '@firebase/util';
import { checkActionCode } from 'firebase/auth';
import { block } from 'react-native-reanimated';

const Events = ({ navigation }) => {
	const [data, setData] = useState({
		communityName: '',
		interest: '',
		communityName_changeText: false,
		isValidCommunityName: true,
		interest_changeText: false,
		isValidInterest: true,
		isAllCommunityDataValid: false,
		isAllInterestDataValid: false,
	});

	const [radioBtn, setRadioBtn] = useState('');
	const [progressBarData, setProgressBarData] = useState({
		nameProgress: 0,
		interestProgress: 0,
		publicProgress: 0,
	});
	const [modalVisible, setModalVisible] = useState(false);
	const [modaltext, setModaltext] = useState('');
	const database = getDatabase();

	const communityExist = () => {
		const database = getDatabase();

		onChildAdded(ref(database, 'community'), (snapshotData) => {
			console.log('comparing this name ', snapshotData.val().communityName);
			if (
				snapshotData.val().communityName ===
				data.communityName.trim().toLowerCase()
			) {
				console.log(
					snapshotData.val().communityName,
					' is similar to ',
					data.communityName.toLowerCase()
				);
				setData({
					...data,
					isValidCommunityName: false,
					communityName_changeText: false,
					isAllCommunityDataValid: false,
				});
			} else {
				setData({
					...data,
					isAllCommunityDataValid: true,
				});
			}
		});

		isValidCommunityName();
	};
	const communityName_changeText = (text) => {
		if (text !== null && text.trim().length !== 0) {
			//Find better condition
			setData({
				...data,
				communityName: text,
				communityName_changeText: true,
				isValidCommunityName: true,
			});
		} else {
			setData({
				...data,
				communityName: '',
				communityName_changeText: false,
				// isValidCommunityName: false,
			});

			setProgressBarData({
				...progressBarData,
				nameProgress: 0,
			});
		}
	};

	const isValidCommunityName = () => {
		if (data.communityName.trim().length !== 0) {
			if (progressBarData.nameProgress !== 0.3) {
				setProgressBarData({
					...progressBarData,
					nameProgress: 0.3,
				});
			}
		}
	};

	const interest_changeText = (text) => {
		if (text !== null && text.trim().length !== 0) {
			//Find better condition
			setData({
				...data,
				interest: text,
				interest_changeText: true,
				isValidInterest: true,
				isAllInterestDataValid: true,
			});
		} else {
			setData({
				...data,
				interest: '',
				interest_changeText: false,
				isValidInterest: false,
				isAllInterestDataValid: false,
			});

			setProgressBarData({
				...progressBarData,
				interestProgress: 0,
			});
		}
	};

	const isValidInterest = () => {
		if (data.interest.trim().length !== 0) {
			if (progressBarData.interestProgress !== 0.3) {
				setProgressBarData({
					...progressBarData,
					interestProgress: 0.3,
				});
			}
		}
	};

	const updateAdminSubscriptionList = () => {
		// Update admin's subscription list
		const groups = { community: data.communityName };
		// console.log(groups.community);
		const keyref = push(
			child(ref(database), 'users/' + auth.currentUser.uid)
		).key;
		// console.log(keyref);
		const updates = {};
		updates['/users/' + auth.currentUser.uid + '/groups/' + keyref] = groups;
		// console.log(updates);
		update(ref(database), updates);
	};

	const storeCommunityDetails = () => {
		try {
			if (data.isAllCommunityDataValid) {
				if (data.isAllInterestDataValid) {
					if (radioBtn === 'Yes' || radioBtn === 'No') {
						// check user's number of posts
						const reference = ref(database, 'community');
						// console.log(database);
						const postKey = push(reference);
						const date = [
							{
								day: new Date().getDate(),
								month: new Date().getUTCMonth(),
								year: new Date().getFullYear(),
							},
						];
						set(postKey, {
							admin: auth.currentUser.uid,
							communityName: data.communityName.trim().toLowerCase(),
							interest: data.interest,
							isPublic: radioBtn,
							createdAt: date,
							members: {
								hash: {
									memID: auth.currentUser.uid,
									memName: auth.currentUser.displayName,
								},
							},
						});

						// Reset form after sucessfully submitting
						setData({
							...data,
							communityName: '',
							interest: '',
						});
						setRadioBtn('');
						setProgressBarData({
							...progressBarData,
							nameProgress: 0,
							publicProgress: 0,
							interestProgress: 0,
						});

						// Update user's subscription list
						updateAdminSubscriptionList();
						navigation.navigate('Home');
					}
				}
			} else {
				Alert.alert('Incomplete Form', '\t\t\t\t\t\t\t\t\t' + 'Try Again', [
					{ text: 'OK', onPress: () => console.log('OK Pressed') },
				]);
			}
		} catch (error) {
			console.log('Error in saving community to database', error);
			Alert.alert('Incomplete Form', '\t\t\t\t\t\t\t\t\t' + 'Try Again', [
				{ text: 'OK', onPress: () => console.log('OK Pressed') },
			]);
		}
	};

	const optionsdata = [
		{
			label: 'Yes',
		},
		{
			label: 'No',
		},
	];

	const selectedOption = (option) => {
		setRadioBtn(option.label);
		// console.log(radioBtn);

		if (progressBarData.publicProgress !== 0.3) {
			setProgressBarData({
				...progressBarData,
				publicProgress: 0.4,
			});
		}
	};

	const showToast = (tag) => {
		if (tag === '1') {
			Toast.show(
				'Interests allow other students to find your community by searching it',
				{
					duration: Toast.durations.LONG,
				}
			);
		} else if (tag === '2') {
			Toast.show(
				'Interests allow other students to find your community by searching it',
				{
					duration: Toast.durations.LONG,
				}
			);
		}
	};

	const renderModal = () => {
		return (
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
								Selecting 'Yes' allows students from different universities to
								join your community. If you only prefer students from your
								university to join then select 'No.'
							</Text>

							<View
								style={{
									flexDirection: 'row',
								}}
							>
								<Pressable
									// style={[styles.modalbutton, styles.buttonCloseModal]}  closeModalButton
									style={[styles.closeModalButton, styles.buttonCloseModal]}
									onPress={() => setModalVisible(!modalVisible)}
								>
									<Text style={styles.textStyle}>OK</Text>
								</Pressable>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		);
	};

	return (
		<DismissKeyboard>
			<Animatable.View animation="fadeInUpBig" style={styles.container}>
				<Card style={styles.card}>
					<ScrollView>
						{/* <View style={styles.header}>
							<Text style={styles.headerText}>Create Your Own Community</Text>
						</View> */}
						<TouchableOpacity style={styles.header} onPress={() => {}}>
							<Text style={styles.headerText}> Create Event</Text>
						</TouchableOpacity>
						<View style={styles.progressBar}>
							<ProgressBar
								style={styles.progressBar}
								progress={
									progressBarData.interestProgress +
									progressBarData.nameProgress +
									progressBarData.publicProgress
								}
								color="green"
							/>
						</View>
						<View style={styles.formStyle}>
							<Card.Content>
								<View style={{ flexDirection: 'row' }}>
									<Text style={styles.text}>Community Name</Text>
								</View>
								<View style={styles.action}>
									<Input
										value={data.communityName}
										onChangeText={(text) => {
											communityName_changeText(text);
										}}
										onEndEditing={(text) => {
											communityExist(text);
										}}
										variant="rounded"
										placeholder="Name..."
										width={250}
										// maxWidth="200px"
										marginTop={2}
										marginBottom={5}
									/>

									<TouchableOpacity style={styles.featherIcons}>
										{data.communityName_changeText ? (
											<Animatable.View animation="bounceIn">
												<Feather name="check-circle" color="green" size={20} />
											</Animatable.View>
										) : null}
									</TouchableOpacity>
								</View>
								{data.isValidCommunityName ? null : (
									<Text style={styles.errorMsg}>Name already exists</Text>
								)}
							</Card.Content>
							<Card.Content>
								<View style={{ flexDirection: 'row' }}>
									<Text style={styles.text}>Your Interest</Text>
								</View>
								<View style={styles.action}>
									<Input
										value={data.interest}
										onChangeText={(text) => {
											interest_changeText(text);
										}}
										onEndEditing={isValidInterest}
										variant="rounded"
										placeholder="Interest..."
										width={250}
										// maxWidth="200px"
										marginTop={2}
										marginBottom={5}
									/>
								</View>

								<View style={{ flexDirection: 'row' }}>
									<Text style={styles.text}>Public Community</Text>
									{renderModal()}
									<Pressable
										style={styles.modalbutton}
										onPress={() => setModalVisible(true)}
									>
										<Feather
											style={styles.helpIcon}
											name="help-circle"
											color="black"
											size={20}
										/>
									</Pressable>
								</View>
								<View style={{ marginBottom: 20 }}>
									<RadioButtonRN
										data={optionsdata}
										selectedBtn={(option) => selectedOption(option)}
										icon={
											<Feather name="check-circle" size={25} color="#2c9dd1" />
										}
									/>
								</View>
							</Card.Content>

							<Card.Content>
								<View style={styles.createButton}>
									<TouchableOpacity onPress={storeCommunityDetails}>
										<Feather name="plus-circle" color="blue" size={50} />
									</TouchableOpacity>
								</View>
							</Card.Content>
						</View>
					</ScrollView>
				</Card>
			</Animatable.View>
		</DismissKeyboard>
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