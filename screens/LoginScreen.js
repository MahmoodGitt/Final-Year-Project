import React, { useState } from 'react';

// FireBase Packages
import auth from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Import data from local files
import DismissKeyboard from '../utilis/DismissKeyboard';

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
import {
	ScrollView,
	TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { KeyboardAvoidingView } from 'native-base';
import { useAnimatedGestureHandler } from 'react-native-reanimated';

/**
 * This functional compoenent contains the logic that handels the log-in process
 * @param {navigation}
 * @returns
 */
const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	/**
	 * This function checks when a user signs in to the app. The Firebase API 'signInWithEmailAndPassword()' passes the Firebase configuration file,
	 * user's email address and password
	 */
	const handleLogIn = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// The details of the signed in user
				// const user = userCredential.user;
				// console.log(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log('code:', errorCode);
				console.log('message', errorMessage);
				Alert.alert(
					'Invalid email/password',
					'\t\t\t\t\t\t\t\t\t' + 'Try Again',
					[{ text: 'OK', onPress: () => console.log('OK Pressed') }]
				);
			});
	};

	return (
		<DismissKeyboard>
			<View style={styles.container}>
				<Card>
					<Card.Cover
						style={{ height: 200 }}
						source={{ uri: 'https://picsum.photos/700' }}
					/>
				</Card>

				<Animatable.View animation="fadeInUpBig" style={styles.formStyle}>
					<ScrollView>
						<View style={styles.formInput}>
							<Text style={styles.text_formInput}>Email</Text>
							<View style={styles.action}>
								<Feather name="mail" size={20} />
								<TextInput
									placeholder="Your Email"
									placeholderTextColor="#666666"
									style={styles.textInput}
									autoCapitalize="none"
									onChangeText={(text) => {
										setEmail(text);
									}}
								/>
							</View>

							<Text
								style={[
									styles.text_formInput,
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
									secureTextEntry={true}
									style={styles.textInput}
									autoCapitalize="none"
									onChangeText={(text) => {
										setPassword(text);
									}}
								/>
							</View>

							{/* <TouchableOpacity>
					<Text style={{ color: '#009387', marginTop: 15 }}>
						Forgot password?
					</Text>
				</TouchableOpacity> */}
						</View>

						<View style={styles.signInButton}>
							<TouchableOpacity style={[styles.logIn]} onPress={handleLogIn}>
								<Text style={styles.textSign}>Log in</Text>
							</TouchableOpacity>
						</View>
						<View style={{ flexDirection: 'row', marginTop: 30 }}>
							<Text style={{ color: '#009387' }}>
								Do you not have an account?
							</Text>

							<TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
								<Text style={{ color: 'blue', marginLeft: 10 }}>
									Click Here
								</Text>
							</TouchableOpacity>
						</View>
					</ScrollView>
				</Animatable.View>
			</View>
		</DismissKeyboard>
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

	formStyle: {
		flex: 3,
		backgroundColor: '#fff',

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
	text_formInput: {
		color: '#05375a',
		fontSize: 18,
	},
	formInput: {
		marginVertical: 50,
		alignItems: 'center',
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
		borderColor: '#009387',
		borderWidth: 1,
		// marginTop: 15,
	},

	textInput: {
		flex: 1,
		marginTop: Platform.OS === 'ios' ? 0 : -5,
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
	signInButton: {
		alignItems: 'center',
		width: '50%',
		height: 50,
		marginHorizontal: 80,
	},
});
