import React from 'react';
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
import LinearGradient from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Card } from 'react-native-paper';

const SignUpScreen = ({ navigation }) => {
	const [data, setData] = React.useState({
		username: '',
		password: '',
		confirm_password: '',
		check_textInputChange: false,
		secureTextEntry: true,
		confirm_secureTextEntry: true,
	});

	/**
	 * This function checks the length of the username. Usernames are expected to belong to the user's
	 * organisatrion such as university. Therefore, only organisitonal emails are only allowed to be registered
	 * @param {String} text
	 */
	const textInputChange = (text) => {
		if (text.length !== 7) {
			setData({
				...data,
				username: text,
				check_textInputChange: true,
			});
		} else {
			setData({
				...data,
				username: text,
				check_textInputChange: false,
			});
		}
	};

	const handleValidUser = (text) => {
		if (text.includes('@edu')) {
			setData({
				...data,
				isValidUserName: true,
				check_textInputChange: true,
			});
			// console.log('pass');
		} else {
			setData({
				...data,
				isValidUserName: false,
				check_textInputChange: false,
			});
			// console.log('fail');
		}
	};

	const handlePasswordChange = (val) => {
		setData({
			...data,
			password: val,
		});
	};

	const handleConfirmPasswordChange = (val) => {
		setData({
			...data,
			confirm_password: val,
		});
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
							onChangeText={(text) => textInputChange(text)}
							onEndEditing={(endText) =>
								handleValidUser(endText.nativeEvent.text)
							}
						/>
						{data.check_textInputChange ? (
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
							onChangeText={(text) => handlePasswordChange(text)}
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
						<TouchableOpacity style={styles.signIn} onPress={() => {}}>
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
								Sign In
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
