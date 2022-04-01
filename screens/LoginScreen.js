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
		<View>
			<TextInput
				style={styles.input}
				placeholder="Email"
				value={email}
				onChangeText={(text) => setEmail(text)}
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				onChangeText={(text) => setPassword(text)}
				value={password}
				secureTextEntry
			/>
			<View style={styles.buttonContainer}>
				<TouchableOpacity onPress={pressHandler} style={styles.button}>
					<Text style={styles.button}>Login</Text>
				</TouchableOpacity>
			</View>

			<View>
				<TouchableOpacity onPress={handleSignUp} style={styles.button}>
					<Text style={styles.button}>Register</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default LoginScreen;
