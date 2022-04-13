import React, { useState } from 'react';

// FireBase Packages
import auth from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Import data from local files
import setUserLoggedIn from '../utilis/IsUserSignedIn';

// React Native Design Packages
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Platform,
	StyleSheet,
	ImageBackground,
	StatusBar,
	Alert,
	Image,
} from 'react-native';

// Third-Party React Native Design Packages
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Card } from 'react-native-paper';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

/**
 * This functional compoenent contains the logic that handels the log-in process
 * @param {navigation}
 * @returns
 */
const LoginScreen = ({ navigation }) => {
	const [data, setData] = useState({
		email: '',
		password: '',
		email_textChange: false,
		secureTextEntry: true,
		isValidEmail: true,
		isValidPassword: true,
	});

	const isNotEmpty = (str) => {
		return str !== null;
	};

	const email_textChange = (text) => {
		if (text) {
			setData({
				...data,
				email: text,
				email_textChange: true,
			});
		} else {
			setData({
				...data,
				email: '',
				email_textChange: false,
				// isValidEmail: false,
			});
		}
	};

	const handleValidUserEmail = (text) => {
		if (email_textChange) {
			setData({
				...data,
				isValidEmail: true,
			});
		} else {
			setData({
				...data,
				isValidEmail: false,
			});
		}
	};

	/**
	 * This function checks when a user signs in to the app. The Firebase API 'signInWithEmailAndPassword()' passes the Firebase configuration file,
	 * user's email address and password
	 */
	const handleLogIn = () => {
		signInWithEmailAndPassword(auth, data.email, data.password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log('code:', errorCode);
				console.log('message', errorMessage);
			});
	};

	const textInputChange = (text) => {
		// if (text.trim().includes('edu')) {
		// 	setData({
		// 		...data,
		// 		username: text,
		// 		user_textChange: true,
		// 		isValidUserName: true,
		// 	});
		// } else {
		// 	setData({
		// 		...data,
		// 		username: text,
		// 		user_textChange: false,
		// 		isValidUserName: false,
		// 	});
		// }
	};

	const handlePasswordChange = (val) => {
		// if (val.trim().length >= 8) {
		// 	setData({
		// 		...data,
		// 		password: val,
		// 		isValidPassword: true,
		// 	});
		// } else {
		// 	setData({
		// 		...data,
		// 		password: val,
		// 		isValidPassword: false,
		// 	});
		// }
	};

	const updateSecureTextEntry = () => {
		// setData({
		// 	...data,
		// 	secureTextEntry: !data.secureTextEntry,
		// });
	};

	const handleValidUser = (text) => {
		// if (text.includes('@edu')) {
		// 	setData({
		// 		...data,
		// 		isValidUserName: true,
		// 	});
		// 	// console.log('pass');
		// } else {
		// 	setData({
		// 		...data,
		// 		isValidUserName: false,
		// 	});
		// 	// console.log('fail');
		// }
	};

	return (
		<View style={styles.container}>
			<Card>
				<Card.Cover
					style={{ height: 200 }}
					source={{ uri: 'https://picsum.photos/700' }}
				/>
			</Card>
			<View style={styles.headerstyle}>
				<Text style={styles.text_header}>Welcome!</Text>
			</View>
			<Animatable.View animation="fadeInUpBig" style={styles.footerStyle}>
				<Text style={styles.text_footer}>Email</Text>
				<View style={styles.action}>
					<Feather name="mail" size={20} />
					<TextInput
						placeholder="Your Email"
						placeholderTextColor="#666666"
						style={styles.textInput}
						autoCapitalize="none"
						onChangeText={(text) => {
							// data.username = text;
							email_textChange(text);
						}}
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
				{data.isValidEmail ? null : (
					<Animatable.View animation="fadeInLeft" duration={500}>
						<Text style={styles.errorMsg}>
							Username must be your organisation's email.
						</Text>
					</Animatable.View>
				)}

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
					<Feather name="lock" size={20} />
					<TextInput
						placeholder="Your Password"
						placeholderTextColor="#666666"
						secureTextEntry={data.secureTextEntry ? true : false}
						style={styles.textInput}
						autoCapitalize="none"
						onChangeText={(text) => {
							data.password = text;
						}}
					/>
					<TouchableOpacity onPress={updateSecureTextEntry}>
						{data.secureTextEntry ? (
							<Feather name="eye-off" color="grey" size={20} />
						) : (
							<Feather name="eye" color="grey" size={20} />
						)}
					</TouchableOpacity>
				</View>
				{data.isValidPassword ? null : (
					<Animatable.View animation="fadeInLeft" duration={500}>
						<Text style={styles.errorMsg}>
							Password must be 8 characters long.
						</Text>
					</Animatable.View>
				)}

				<TouchableOpacity>
					<Text style={{ color: '#009387', marginTop: 15 }}>
						Forgot password?
					</Text>
				</TouchableOpacity>
				<View style={styles.startScreenButton}>
					<TouchableOpacity style={styles.logIn} onPress={handleLogIn}>
						{/* <LinearGradient
							colors={['#08d4c4', '#01ab9d']}
							style={styles.logIn}
						> */}
						<Text style={styles.textSign}>Sign In</Text>
						{/* </LinearGradient> */}
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => navigation.navigate('SignUp')}
						style={[
							styles.logIn,
							{
								borderColor: '#009387',
								borderWidth: 1,
								marginTop: 15,
							},
						]}
					>
						<Text style={styles.textSign}>Sign Up</Text>
					</TouchableOpacity>
				</View>
			</Animatable.View>
		</View>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#488529',
	},

	headerstyle: {
		flex: 0.3,
		justifyContent: 'center',
		alignItems: 'center',
	},

	headerText: {
		justifyContent: 'center',
		alignItems: 'center',
	},

	footerStyle: {
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
		alignItems: 'center',
		justifyContent: 'center',
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

	logIn: {
		width: '100%',
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
	},

	textInput: {
		flex: 1,
		marginTop: Platform.OS === 'ios' ? 0 : -12,
		paddingLeft: 10,
		color: '#05375a',
	},
	errorMsg: {
		fontSize: 14,
		color: '#FF0000',
	},

	textSign: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#009387',
	},
	startScreenButton: {
		alignItems: 'center',
		marginTop: 50,
	},
});
