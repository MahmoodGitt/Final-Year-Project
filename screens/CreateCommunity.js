import React, { useEffect, useState } from 'react';
// React Native Packages
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	ImageBackground,
	TouchableWithoutFeedback,
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
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import { Center, Column, Input } from 'native-base';
import { setStatusBarTranslucent } from 'expo-status-bar';
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { async } from '@firebase/util';

const CreateCommunity = ({ navigation }) => {
	const [data, setData] = useState({
		communityName: '',
		interest: '',
		radioBtn: '',
		communityName_changeText: false,
		isValidCommunityName: true,
		interest_changeText: false,
		isValidInterest: true,
	});

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
				isValidCommunityName: false,
			});
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
			});
		} else {
			setData({
				...data,
				interest: '',
				interest_changeText: false,
				isValidInterest: false,
			});
		}
	};

	const storeCommunityDetails = () => {
		try {
			// check user's number of posts
			const db = getDatabase();
			const reference = ref(db, 'community');
			const newPostRef = push(reference);
			set(newPostRef, {
				admin: auth.currentUser.uid,
				communityName: data.communityName,
				interest: data.interest,
				members: 1,
			});
		} catch (error) {
			console.log('Error in saving to database', error);
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

	return (
		<DismissKeyboard>
			<View style={styles.container}>
				{/* <View style={{ flex: 0.1 }}> */}

				<View style={styles.progressBar}>
					<ProgressBar progress={data.progress} color="green" />
					{/* <ImageBackground
				source={{ uri: 'https://picsum.photos/700' }}
				resizeMode="cover"
				style={{ height: '100%', width: '100%' }}
			> */}
				</View>
				<Card style={styles.card}>
					<Card.Content>
						<View style={styles.text}>
							<Text>Your community name</Text>
							<TouchableOpacity
								onPress={() => {
									showToast('1');
								}}
							>
								<Feather
									style={styles.helpIcon}
									name="help-circle"
									color="black"
									size={15}
								/>
							</TouchableOpacity>
						</View>
						<View style={styles.action}>
							<Input
								onChangeText={(text) => {
									communityName_changeText(text);
								}}
								// onEndEditing={handleCommunityProgress()}
								variant="rounded"
								placeholder="name..."
								w="75%"
								maxWidth="200px"
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
							<Text style={styles.errorMsg}>Validations </Text>
						)}
					</Card.Content>
					<Card.Content>
						<View style={styles.text}>
							<Text>Your subject of interest</Text>
							<TouchableOpacity
								onPress={() => {
									showToast('2');
								}}
							>
								<Feather
									style={styles.helpIcon}
									name="help-circle"
									color="black"
									size={15}
								/>
							</TouchableOpacity>
						</View>
						<View style={styles.action}>
							<Input
								onChangeText={(text) => {
									interest_changeText(text);
								}}
								// onEndEditing={handleCommunityProgress()}
								variant="rounded"
								placeholder="interest..."
								w="75%"
								maxWidth="200px"
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
							<Text style={styles.errorMsg}>Validations </Text>
						)}

						<View style={styles.text}>
							<Text>Open to all universities?</Text>
							<Feather
								style={styles.helpIcon}
								name="help-circle"
								color="black"
								size={15}
							/>
						</View>
						<View style={{ marginBottom: 20 }}>
							<RadioButtonRN
								data={optionsdata}
								selectedBtn={(option) => setData({ radioBtn: option.label })}
								icon={<Feather name="check-circle" size={25} color="#2c9dd1" />}
							/>
						</View>
					</Card.Content>
				</Card>
				<View style={styles.createButton}>
					<TouchableOpacity onPress={storeCommunityDetails}>
						<Feather name="plus-circle" color="blue" size={50} />
					</TouchableOpacity>
				</View>
				{/* </ImageBackground> */}
			</View>
		</DismissKeyboard>
	);
};
export default CreateCommunity;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		flexDirection: 'row',
		padding: 10,
	},
	homeIcon: {
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 60,
	},
	username: {
		fontSize: 20,
		marginHorizontal: 10,
		paddingBottom: 5,
	},
	card: {
		marginHorizontal: 15,
		// marginBottom: 5,
		marginTop: 5,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
	},
	users: {
		padding: 5,
	},
	connections: {
		flexDirection: 'row',
	},
	action: {
		flexDirection: 'row',
		marginTop: 3,
		borderBottomWidth: 1,
		borderBottomColor: '#f2f2f2',
		paddingBottom: 5,
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
		flexDirection: 'row',
		marginHorizontal: 5,
		fontWeight: 'bold',
	},
	helpIcon: {
		marginHorizontal: 15,
	},
	createButton: {
		marginVertical: 20,
		alignItems: 'center',
	},
	progressBar: {
		// marginTop: 50,
		// justifyContent: 'space-around',
	},
});
