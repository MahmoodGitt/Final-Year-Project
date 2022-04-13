import React, { useEffect, useState } from 'react';

import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Platform,
	StyleSheet,
	StatusBar,
	ScrollView,
	Alert,
} from 'react-native';

// Firebase Packages
import auth from '../firebase/config';
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
} from 'firebase/auth';

import {
	getDatabase,
	ref,
	onValue,
	set,
	push,
	onChildAdded,
} from 'firebase/database';

// Import data from local files

// Third-Party UI Packages

import * as Animatable from 'react-native-animatable';
// import LinearGradient from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import DropDownPicker from 'react-native-dropdown-picker';
import Autocomplete from 'react-native-autocomplete-input';
import { Card } from 'react-native-paper';

const SignUpScreen = ({ navigation }) => {
	const [data, setData] = useState({
		username: '',
		university: '',
		email: '',
		password: '',
		confirm_password: '',
		secureTextEntry: true,
		user_textChange: false,
		password_textChange: false,
		email_textChange: false,
		passwordConfirm_textChange: false,
		confirm_secureTextEntry: true,
		isValidUserName: true,
		isValidUserEmail: true,
		isValidPassowrd: true,
		isValidConfirmPassword: true,
		isValidUser: false,
		isVisible: false,
	});

	/**
	 * This function creates a user account and stores account details in Firebase. This is a Firebase API that passes
	 * Firebase configuration file, new user's email address and password.
	 */
	const handleSignUp = () => {
		if (data.password !== '') {
			if (data.username !== '') {
				if (data.email !== '') {
					createUserWithEmailAndPassword(auth, data.email, data.password)
						.then((userCredential) => {
							// Signed in
							const user = userCredential.user;
							console.log('username', user.email, 'added to Firebase');
							writeToDatabase();
						})
						.catch((error) => {
							const errorCode = error.code;
							const errorMessage = error.message;
							console.log('code:', errorCode);
							console.log('message', errorMessage);
							Alert.alert(errorCode, errorMessage, [
								{
									text: 'Cancel',
									onPress: () => console.log('Cancel Pressed'),
									style: 'cancel',
								},
								{ text: 'OK', onPress: () => console.log('OK Pressed') },
							]);
						});
				}
			}
		} else {
			console.log('Incomplete form');
			Alert.alert('Form Incomplete', 'Complete the form to sign up', [
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
				{ text: 'OK', onPress: () => console.log('OK Pressed') },
			]);
		}
	};

	// Encapsulate the process of writing data to the database
	const writeToDatabase = () => {
		const db = getFirestore();
		setDoc(doc(db, 'users/' + auth.currentUser.uid), {
			name: data.username,
			email: auth.currentUser.email,
		});
		console.log('name', data.username);
		console.log('email', auth.currentUser.email);
	};

	/**
	 * This function checks the user's text input if it is empty or has whitespaces
	 * Referencing source of knowledge: https://stackoverflow.com/questions/10232366/how-to-check-if-a-variable-is-null-or-empty-string-or-all-whitespace-in-javascri
	 * @param {String} text
	 */
	// function isEmptyOrHasSpaces(text) {
	// 	if(text.match(/\s/){
	// 	}
	// })

	function hasWhiteSpace(s) {
		return /\s/.test(s);
	}

	/**
	 * This function checks that the text which represents the username is bigger than or equal to two three characters
	 * @param {String} text
	 */
	const username_textChange = (text) => {
		if (text.trim().length >= 3) {
			setData({
				...data,
				username: text,
				user_textChange: true,
				isValidUserName: true,
			});
		} else {
			setData({
				...data,
				username: '',
				user_textChange: false,
				isValidUserName: false,
			});
		}
	};

	const handleValidUserName = (text) => {
		if (data.user_textChange) {
			setData({
				...data,
				isValidUserName: true,
			});
		} else {
			setData({
				...data,
				isValidUserName: false,
				user_textChange: false,
			});
		}
	};

	const email_textChange = (text) => {
		if (text.includes('@')) {
			setData({
				...data,
				email: text,
				email_textChange: true,
				isValidUserEmail: true,
			});
		} else {
			setData({
				...data,
				email: null,
				email_textChange: false,
				isValidUserEmail: false,
			});
		}
	};

	const handleValidUserEmail = (text) => {
		if (data.email_textChange) {
			setData({
				...data,
				isValidUserEmail: true,
			});
		} else {
			setData({
				...data,
				isValidUserEmail: false,
			});
		}
	};

	const password_textChange = (text) => {
		if (text.length >= 6) {
			setData({
				...data,
				password: text,
				password_textChange: true,
				isValidPassowrd: true,
			});
		} else {
			setData({
				...data,
				password: '',
				isValidPassowrd: false,
				password_textChange: false,
			});
		}
	};

	const handleValidUserPassword = () => {
		if (data.password_textChange) {
			setData({
				...data,
				isValidPassowrd: true,
			});
		} else {
			setData({
				...data,
				isValidPassowrd: false,
			});
		}
	};

	const confirmPassword_textChange = (text) => {
		setData({
			...data,
			confirm_password: text,
			isValidConfirmPassword: true,
		});
	};

	const handleConfirmPassword = () => {
		if (data.confirm_password === data.password) {
			setData({ ...data, isVisible: true });
		} else {
			setData({
				...data,
				isValidConfirmPassword: false,
				// confirm_password: ''
			});
		}
	};

	const updateSecureTextEntry = () => {
		setData({
			...data,
			secureTextEntry: !data.secureTextEntry,
		});
	};

	const updateConfirmSecureTextEntry = () => {
		setData({
			...data,
			confirm_secureTextEntry: !data.confirm_secureTextEntry,
		});
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.text_header}>Register Now!</Text>
			</View>
			<Animatable.View animation="fadeInUpBig" style={styles.form}>
				<View>
					<Text style={styles.text}>Student Name</Text>
					<View style={styles.action}>
						<FontAwesome name="user-o" color="#05375a" size={20} />
						<TextInput
							placeholder="Your Username"
							style={styles.textInput}
							autoCapitalize="none"
							onChangeText={(text) => username_textChange(text)}
							onEndEditing={(text) =>
								handleValidUserName(text.nativeEvent.text)
							}
						/>
						{data.user_textChange ? (
							<Animatable.View animation="bounceIn">
								<Feather name="check-circle" color="green" size={20} />
							</Animatable.View>
						) : null}
						{data.isValidUserName ? null : (
							<Animatable.View animation="bounceIn">
								<Feather name="x-circle" color="red" size={20} />
							</Animatable.View>
						)}
					</View>
					{data.isValidUserName ? null : (
						<Text style={styles.errorMsg}>
							Username must be at least three characters
						</Text>
					)}
					<Text
						style={[
							styles.text,
							{
								marginTop: 35,
							},
						]}
					>
						University
					</Text>
					<View style={styles.action}>
						<Feather name="book" size={20} />
					</View>
					<Text
						style={[
							styles.text,
							{
								marginTop: 35,
							},
						]}
					>
						Email
					</Text>
					<View style={styles.action}>
						<Feather name="mail" size={20} />
						<TextInput
							placeholder="Your Email"
							style={styles.textInput}
							autoCapitalize="none"
							onChangeText={(text) => email_textChange(text)}
							onEndEditing={(text) =>
								handleValidUserEmail(text.nativeEvent.text)
							}
						/>
						{data.email_textChange ? (
							<Animatable.View animation="bounceIn">
								<Feather name="check-circle" color="green" size={20} />
							</Animatable.View>
						) : null}
						{data.isValidUserEmail ? null : (
							<Animatable.View animation="bounceIn">
								<Feather name="x-circle" color="red" size={20} />
							</Animatable.View>
						)}
					</View>
					{data.isValidUserEmail ? null : (
						<Text style={styles.errorMsg}>Invalid email</Text>
					)}
					<Text
						style={[
							styles.text,
							{
								marginTop: 35,
							},
						]}
					>
						Password
					</Text>
					<View style={styles.action}>
						<Feather name="lock" color="#05375a" size={20} />
						<TextInput
							placeholder="Your Password"
							secureTextEntry={data.secureTextEntry ? true : false}
							style={styles.textInput}
							autoCapitalize="none"
							onChangeText={(text) => password_textChange(text)}
							onEndEditing={(text) => handleValidUserPassword(text)}
						/>
						<TouchableOpacity onPress={updateSecureTextEntry}>
							{data.secureTextEntry ? (
								<Feather name="eye-off" color="grey" size={20} />
							) : (
								<Feather name="eye" color="grey" size={20} />
							)}
						</TouchableOpacity>
					</View>
					{data.isValidPassowrd ? null : (
						<Text style={styles.errorMsg}>
							Password must be at least 6 characters
						</Text>
					)}

					<Text
						style={[
							styles.text,
							{
								marginTop: 35,
							},
						]}
					>
						Confirm Password
					</Text>
					<View style={styles.action}>
						<Feather name="lock" color="#05375a" size={20} />
						<TextInput
							placeholder="Confirm Your Password"
							secureTextEntry={data.confirm_secureTextEntry ? true : false}
							style={styles.textInput}
							autoCapitalize="none"
							onChangeText={(text) => confirmPassword_textChange(text)}
							onEndEditing={handleConfirmPassword}
						/>
						<TouchableOpacity onPress={updateConfirmSecureTextEntry}>
							{data.confirm_secureTextEntry ? (
								<Feather name="eye-off" color="grey" size={20} />
							) : (
								<Feather name="eye" color="grey" size={20} />
							)}
						</TouchableOpacity>
					</View>
					{data.isValidConfirmPassword ? null : (
						<Text style={styles.errorMsg}>Passwords do not match</Text>
					)}
					<View style={styles.button}>
						<TouchableOpacity style={styles.signIn} onPress={handleSignUp}>
							{/* <LinearGradient
								colors={['#08d4c4', '#01ab9d']}
								style={styles.logIn}
							> */}
							<Text
								style={[
									styles.textSign,
									{
										color: '#009387',
									},
								]}
							>
								Sign In
							</Text>
							{/* </LinearGradient> */}
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => navigation.goBack()}
							style={styles.signIn}
						>
							<Text
								style={[
									styles.textSign,
									{
										color: '#009387',
									},
								]}
							>
								Go back
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Animatable.View>
		</View>
	);
};

export default SignUpScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#009387',
	},
	header: {
		flex: 0.3,
		justifyContent: 'center',
		alignItems: 'center',
	},
	form: {
		flex: 3,
		backgroundColor: '#fff',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		paddingHorizontal: 20,
		paddingVertical: 30,
	},
	text_header: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 30,
	},
	text: {
		color: '#05375a',
		fontSize: 18,
	},
	action: {
		flexDirection: 'row',
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#f2f2f2',
		paddingBottom: 5,
	},
	actionError: {
		flexDirection: 'row',
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#FF0000',
		paddingBottom: 5,
	},
	textInput: {
		flex: 1,
		marginTop: Platform.OS === 'ios' ? 0 : -12,
		paddingLeft: 10,
	},
	errorMsg: {
		color: '#FF0000',
		fontSize: 14,
	},
	button: {
		alignItems: 'center',
		marginTop: 15,
	},
	signIn: {
		width: '100%',
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		borderColor: '#009387',
		borderWidth: 1,
		marginTop: 10,
	},
	textSign: {
		fontSize: 18,
		fontWeight: 'bold',
	},
});
