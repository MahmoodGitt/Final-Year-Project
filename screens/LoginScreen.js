// import {
// 	StyleSheet,
// 	TextInput,
// 	View,
// 	Text,
// 	TouchableOpacity,
// 	Alert,
// } from 'react-native';
// import React, { useState } from 'react';
// import auth from '../firebase/config';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// // import CustomstartScreenButtons from '../utilis/CustomstartScreenButtons';

// const LoginScreen = ({ navigation }) => {
//

import React, { useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Platform,
	StyleSheet,
	StatusBar,
	Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

/**
 * This functional compoenent contains the logic that handels the log-in process
 * @param {navigation}
 * @returns
 */
const LoginScreen = ({ navigation }) => {
	// Email field holds the user's email details, and a mutator field that stores new email values
	const [email, setEmail] = useState('');
	// Password field holds the user's email details, and a mutator field that stores new password values
	const [password, setPassword] = useState('');

	/**
	 * This function creates a user account
	 */
	const handleSignUp = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				// ...
				console.log('username ', user.email);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log('code:', errorCode);
				console.log('message', errorMessage);
			});
	};
	const [data, setData] = React.useState({
		username: '',
		password: '',
		check_textInputChange: false,
		secureTextEntry: true,
		isValidUser: true,
		isValidPassword: true,
	});

	const textInputChange = (val) => {
		if (val.trim().length >= 4) {
			setData({
				...data,
				username: val,
				check_textInputChange: true,
				isValidUser: true,
			});
		} else {
			setData({
				...data,
				username: val,
				check_textInputChange: false,
				isValidUser: false,
			});
		}
	};

	const handlePasswordChange = (val) => {
		if (val.trim().length >= 8) {
			setData({
				...data,
				password: val,
				isValidPassword: true,
			});
		} else {
			setData({
				...data,
				password: val,
				isValidPassword: false,
			});
		}
	};

	const updateSecureTextEntry = () => {
		setData({
			...data,
			secureTextEntry: !data.secureTextEntry,
		});
	};

	const handleValidUser = (val) => {
		if (val.trim().length >= 4) {
			setData({
				...data,
				isValidUser: true,
			});
		} else {
			setData({
				...data,
				isValidUser: false,
			});
		}
	};

	// const loginHandle = (userName, password) => {

	//     const foundUser = Users.filter( item => {
	//         return userName == item.username && password == item.password;
	//     } );

	//     if ( data.username.length == 0 || data.password.length == 0 ) {
	//         Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
	//             {text: 'Okay'}
	//         ]);
	//         return;
	//     }

	//     if ( foundUser.length == 0 ) {
	//         Alert.alert('Invalid User!', 'Username or password is incorrect.', [
	//             {text: 'Okay'}
	//         ]);
	//         return;
	//     }
	//     signIn(foundUser);
	// }

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor="#009387" barStyle="light-content" />
			<View style={styles.headerstyle}>
				<Text style={styles.text_header}>Welcome!</Text>
			</View>
			<Animatable.View animation="" style={styles.footerStyle}>
				<Text style={[styles.text_footer, {}]}>Username</Text>
				<View style={styles.action}>
					<FontAwesome name="user-o" size={20} />
					<TextInput
						placeholder="Your Username"
						placeholderTextColor="#666666"
						style={styles.textInput}
						autoCapitalize="none"
						onChangeText={(val) => textInputChange(val)}
						onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
					/>
					{data.check_textInputChange ? (
						<Animatable.View animation="bounceIn">
							<Feather name="check-circle" color="green" size={20} />
						</Animatable.View>
					) : null}
				</View>
				{data.isValidUser ? null : (
					<Animatable.View animation="fadeInLeft" duration={500}>
						<Text style={styles.errorMsg}>
							Username must be 4 characters long.
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
						onChangeText={(val) => handlePasswordChange(val)}
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
					<TouchableOpacity
						style={styles.logIn}
						// onPress={() => {loginHandle( data.username, data.password )}}
					>
						<LinearGradient
							colors={['#08d4c4', '#01ab9d']}
							style={styles.logIn}
						>
							<Text style={styles.textSign}>Sign In</Text>
						</LinearGradient>
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
						<Text
							style={[
								styles.textSign,
								{
									color: '#009387',
								},
							]}
						>
							Sign Up
						</Text>
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
		backgroundColor: '#009387',
	},
	headerstyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 1,
		paddingBottom: 50,
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
	},
	startScreenButton: {
		alignItems: 'center',
		marginTop: 50,
	},
});
