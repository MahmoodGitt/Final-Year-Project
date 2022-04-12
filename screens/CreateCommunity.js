import React, { useEffect, useState } from 'react';

import {
	View,
	Text,
	StyleSheet,
	TextInput,
	ImageBackground,
} from 'react-native';

// Import data from local files
import DismissKeyboard from '../utilis/DismissKeyboard';
import auth from '../firebase/config';

// Import database services from Firebase
import {
	getDatabase,
	ref,
	onValue,
	set,
	push,
	onChildAdded,
} from 'firebase/database';
import moment from 'moment';

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

const CreateCommunity = ({ navigation }) => {
	const [data, setData] = useState({
		authorName: '',
		communityName: '',
		public: false,
		radioBtn: '',
		communityName_changeText: false,
		isValidCommunityName: true,
		isValidPublic: true,
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
				progress: data.progress - data.communityProgress,
				communityProgress: 0,
			});
		}
	};

	const handleCommunityProgress = () => {
		if (data.communityName !== '') {
			if (data.communityProgress <= 0) {
				setData({
					...data,
					progress: data.progress + 0.1,
					communityProgress: data.progress,
				});
			}
		}
	};

	const publicUniversity_changeText = (text) => {
		if (text !== null) {
			setData({
				...data,
				publicUniversity_changeText: text,
				publicUniversity_changeText: true,
				// progress: progress + 0.25,
			});
		} else {
			setData({
				...data,
				publicUniversity_changeText: 'text',
				publicUniversity_changeText: false,
			});
			console.log('invalid interest name');
		}
	};

	const storeCommunityDetails = () => {
		try {
			// check user's number of posts
			const db = getDatabase();
			const reference = ref(db, 'users/' + auth.currentUser.uid + '/test');
			const newPostRef = push(reference);
			set(newPostRef, {
				communityName: data.communityName,
			});
		} catch (error) {
			console.log('Error in saving to database', error);
		}
	};

	const data1 = [
		{
			label: 'Create a community',
		},
		{
			label: 'Request a study-buddy',
		},
	];

	return (
		<View styles={styles.container}>
			<Appbar.Header>
				<Appbar.BackAction />
				<Appbar.Content title="Create Community" subtitle="By" />
			</Appbar.Header>
			<View style={styles.progressBar}>
				<ProgressBar progress={data.progress} color="green" />
			</View>
			{/* <ImageBackground
				source={{ uri: 'https://picsum.photos/700' }}
				resizeMode="cover"
				style={{ height: '100%', width: '100%' }}
			> */}
			<View>
				{/* <>{userName.email}</> */}
				<Text style={styles.username}>{data.username}</Text>
			</View>
			<Card style={styles.card}>
				<Card.Content>
					<View style={styles.text}>
						<Text>Your subject of interest</Text>
						<Feather
							style={styles.helpIcon}
							name="help-circle"
							color="black"
							size={15}
						/>
					</View>

					<View style={styles.action}>
						<Input
							onChangeText={(text) => {
								communityName_changeText(text);
							}}
							// onEndEditing={handleCommunityProgress()}
							variant="rounded"
							placeholder="course..."
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
						<Text>I want to...</Text>
						<Feather
							style={styles.helpIcon}
							name="help-circle"
							color="black"
							size={15}
						/>
					</View>
					<View style={{ marginBottom: 20 }}>
						<RadioButtonRN
							data={data1}
							selectedBtn={(dataSelected) =>
								setData({ radioBtn: dataSelected.label })
							}
							icon={<Feather name="check-circle" size={25} color="#2c9dd1" />}
						/>
					</View>

					<View style={styles.text}>
						<Text>Open to all universities?</Text>
						<Feather
							style={styles.helpIcon}
							name="help-circle"
							color="black"
							size={15}
						/>
					</View>
				</Card.Content>
				<View style={styles.createButton}>
					<TouchableOpacity onPress={storeCommunityDetails}>
						<Feather name="plus-circle" color="blue" size={50} />
					</TouchableOpacity>
				</View>
			</Card>
			{/* </ImageBackground> */}
		</View>
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
		marginBottom: 5,
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
		marginTop: 50,
	},
});
