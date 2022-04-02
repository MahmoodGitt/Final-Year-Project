import {
	StyleSheet,
	TextInput,
	View,
	Text,
	TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import auth from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

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
		navigation.navigate('Home', {
			name: email,
		});
	};

	return (
		<View style={styles.container}>
			<Text style={{ flex: 0.5, marginTop: 50 }}>Hello</Text>
			<View style={styles.inputFlex}>
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

				<View>
					<TouchableOpacity onPress={pressHandler} style={styles.button}>
						<Text style={styles.loginButton}>Login</Text>
					</TouchableOpacity>
				</View>
			</View>

			<View style={styles.footer}>
				<Text> Do you not have an account? </Text>
				<View style={styles.registerButton}>
					<TouchableOpacity onPress={handleSignUp} style={styles.button}>
						<Text style={styles.button}>Create Account</Text>
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
		justifyContent: 'center',
		alignItems: 'center',
	},

	inputFlex: {
		flex: 1,
	},

	inputContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},

	// Styling the login button
	loginButton: {
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 70,
		marginTop: 10,
	},

	// Styling the footer content
	footer: {
		flex: 2,
		flexDirection: 'row',
	},
});

export default LoginScreen;
