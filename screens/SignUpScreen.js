import React, { useState } from 'react';

// Firebase Packages
import auth from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

// Design Packages
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
import * as Animatable from 'react-native-animatable';
// import LinearGradient from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Card } from 'react-native-paper';

const SignUpScreen = ({ navigation }) => {
	// Email field holds the user's email details, and a mutator field that stores new email values
	// const [email, setEmail] = useState('');
	// Password field holds the user's email details, and a mutator field that stores new password values
	// const [password, setPassword] = useState('');

	const [data, setData] = useState({
		username: '',
		password: '',
		confirm_password: '',
		secureTextEntry: true,
		user_textChange: false,
		confirm_secureTextEntry: true,
	});

	/**
	 * This function creates a user account and stores account details in Firebase. This is a Firebase API that passes
	 * Firebase configuration file, new user's email address and password.
	 */
	const handleSignUp = () => {
		createUserWithEmailAndPassword(auth, data.username, data.password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				// ...
				console.log('username', user.email, 'added to Firebase');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log('code:', errorCode);
				console.log('message', errorMessage);
			});
	};

	/**
	 * This function checks the length of the username. Usernames are expected to belong to the user's
	 * organisatrion such as university. Therefore, only organisitonal emails are allowed to be registered
	 * @param {String} text
	 */
	const user_textChange = (text) => {
		// if (text.length !== 7) {
		// setData({
		// ...data,
		// username: text,
		// 		user_textChange: true,
		// });
		// } else {
		// 	setData({
		// 	// 	...data,
		// 	// 	username: text,
		// 	// 	user_textChange: false,
		// 	// });
		// }
	};

	const handleValidUser = (text) => {
		// if (text.includes('@edu')) {
		// 	// setData({
		// 	// 	...data,
		// 	// 	isValidUserName: true,
		// 	// 	user_textChange: true,
		// 	// });
		// 	// console.log('pass');
		// } else {
		// // 	setData({
		// // 		...data,
		// // 		isValidUserName: false,
		// // 		user_textChange: false,
		// // 	});
		// // 	// console.log('fail');
		// // }
	};

	const handlePasswordChange = (val) => {
		// setData({
		// 	...data,
		// 	password: val,
		// });
	};

	const handleConfirmPasswordChange = (val) => {
		// setData({
		// 	...data,
		// 	confirm_password: val,
		// });
	};

	const updateSecureTextEntry = () => {
		// setData({
		// 	...data,
		// 	secureTextEntry: !data.secureTextEntry,
		// });
	};

	const updateConfirmSecureTextEntry = () => {
		// setData({
		// 	...data,
		// 	confirm_secureTextEntry: !data.confirm_secureTextEntry,
		// });
	};

	return (
		<View style={styles.container}>
			<Card>
				<Card.Cover
					style={{ height: 200 }}
					source={{ uri: 'https://picsum.photos/700' }}
				/>
			</Card>
			<View style={styles.header}>
				<Text style={styles.text_header}>Register Now!</Text>
			</View>
			<Animatable.View animation="fadeInUpBig" style={styles.footer}>
				<View>
					<Text style={styles.text_footer}>Username</Text>
					<View style={styles.action}>
						<FontAwesome name="user-o" color="#05375a" size={20} />
						<TextInput
							placeholder="Your Username"
							style={styles.textInput}
							autoCapitalize="none"
							onChangeText={(text) => (data.username = text)}
							onEndEditing={(endText) =>
								handleValidUser(endText.nativeEvent.text)
							}
						/>
						{data.user_textChange ? (
							<Animatable.View animation="bounceIn">
								<Feather name="check-circle" color="green" size={20} />
							</Animatable.View>
						) : null}
					</View>

					<Text
						style={[
							styles.text_footer,
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
							onChangeText={(text) => (data.password = text)}
						/>
						<TouchableOpacity onPress={updateSecureTextEntry}>
							{data.secureTextEntry ? (
								<Feather name="eye-off" color="grey" size={20} />
							) : (
								<Feather name="eye" color="grey" size={20} />
							)}
						</TouchableOpacity>
					</View>

					<Text
						style={[
							styles.text_footer,
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
							onChangeText={(val) => handleConfirmPasswordChange(val)}
						/>
						<TouchableOpacity onPress={updateConfirmSecureTextEntry}>
							{data.secureTextEntry ? (
								<Feather name="eye-off" color="grey" size={20} />
							) : (
								<Feather name="eye" color="grey" size={20} />
							)}
						</TouchableOpacity>
					</View>
					<View style={styles.button}>
						<TouchableOpacity style={styles.signIn} onPress={handleSignUp}>
							{/* <LinearGradient
								colors={['#08d4c4', '#01ab9d']}
								style={styles.logIn}
							> */}
							<Text style={styles.textSign}>Sign In</Text>
							{/* </LinearGradient> */}
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => navigation.goBack()}
							style={[
								styles.signIn,
								{
									borderColor: '#009387',
									borderWidth: 1,
									marginTop: 15,
								},
							]}
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
	footer: {
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
	text_footer: {
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
		color: '#05375a',
	},
	errorMsg: {
		color: '#FF0000',
		fontSize: 14,
	},
	button: {
		alignItems: 'center',
		marginTop: 50,
	},
	signIn: {
		width: '100%',
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
	},
	textSign: {
		fontSize: 18,
		fontWeight: 'bold',
	},
});
