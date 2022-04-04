import {
	StyleSheet,
	TextInput,
	View,
	Text,
	TouchableOpacity,
	Alert,
} from 'react-native';
import React, { useState } from 'react';
import auth from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
// import CustomButtons from '../utilis/CustomButtons';

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

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

	const pressHandler = () => {
		// Conditional statement used to check if the user has not left the email and password fields blank or whitespaces
		if (
			(email === '' || email.match(/^ *$/) !== null) &&
			(password === '' || password.match(/^ *$/) !== null)
		) {
			Alert.alert(
				'Invalid Email/Password',
				'Empty fields and blank spaces are not allowed',
				[{ text: 'OK', onPress: () => console.log('OK Pressed') }]
			);
		} else {
			navigation.navigate('Home', {
				name: email,
			});
		}
		// navigation.navigate('Home', {
		// 	name: email,
		// });
	};

	return (
		<View style={styles.container}>
			<View style={{ flex: 1, marginTop: 50 }}>
				<Text>Hello</Text>
			</View>

			<View style={styles.formStyle}>
				<View style={styles.inputContainer}>
					<Text>Email</Text>
					<TextInput
						style={styles.input}
						placeholder="Email"
						value={email}
						onChangeText={(text) => setEmail(text)}
					/>
				</View>

				<View style={styles.inputContainer}>
					<Text>Passsword</Text>
					<TextInput
						style={styles.input}
						placeholder="Password"
						onChangeText={(text) => setPassword(text)}
						value={password}
						secureTextEntry
					/>
				</View>
			</View>

			<View>
				<TouchableOpacity onPress={pressHandler}>
					<Text style={{ color: 'blue' }}>Account</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.footer}>
				<Text> Do you not have an account? </Text>
				<View style={styles.registerButton}>
					<TouchableOpacity>
						<Text style={{ color: 'blue' }}>Create Account</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	// Styling the page
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		flex: 1,
	},

	// Styling the input boxes
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},

	formStyle: {
		flex: 1,
	},

	inputContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},

	// Styling the login button
	loginButton: {
		marginTop: 5,
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 4,
		elevation: 3,
		textAlign: 'center',
		backgroundColor: 'orange',
	},

	// Styling the footer content
	footer: {
		flex: 2,
		marginTop: 20,
		flexDirection: 'row',
	},
});

export default LoginScreen;
