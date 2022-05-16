import React, { useEffect, useState } from 'react';
// React Native Packages
import { View, Text, StyleSheet, Platform, Alert } from 'react-native';

// Import data from local files
import DismissKeyboard from '../utilis/DismissKeyboard';
import auth from '../firebase/config';
import keys from '../utilis/getGlobalKeys';

// Firebase services
import {
	getDatabase,
	ref,
	onValue,
	set,
	push,
	onChildAdded,
	update,
	child,
	get,
} from 'firebase/database';

// Third-Party React Native UI Packages
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Input, KeyboardAvoidingView, Row } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import Feather from 'react-native-vector-icons/Feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import eventHashKey from '../utilis/GlobalEventKey';

const CreateEvents = ({ navigation }) => {
	const [checkTime, setCheckTime] = useState(false);
	const [checkDate, setCheckDate] = useState(false);
	const [date, setDate] = useState(new Date());
	const [formattedTime, setFormattedTime] = useState('');
	const [formattedDate, setFormattedDate] = useState('');
	const [postCreatedDate, setPostCreatedDate] = useState('');
	const [eventData, setEventData] = useState({
		activity: '',
		address: '',
		postcode: '',
	});
	const [mode, setMode] = useState('date');
	const [show, setShow] = useState(false);

	useEffect(() => {
		setPostCreatedDate(eventDate(new Date()) + ' - ' + eventTime(new Date()));
		setFormattedDate(eventDate(date));
		setFormattedTime(eventTime(date));
		// console.log(postCreatedDate);
	});

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode('date');
		setCheckDate(true);
	};

	const showTimepicker = () => {
		showMode('time');
		setCheckTime(true);
	};

	const eventDate = (date) => {
		if (date.getDate() < 10 || date.getMonth() + 1 < 10) {
			if (date.getDate() < 10 && date.getMonth() + 1 < 10) {
				return (
					'0' +
					date.getDate().toString() +
					'/' +
					'0' +
					(date.getMonth() + 1).toString() +
					'/' +
					date.getFullYear().toString()
				);
			}
			if (date.getDate() < 10) {
				return (
					'0' +
					date.getDate().toString() +
					'/' +
					(date.getMonth() + 1).toString() +
					'/' +
					date.getFullYear().toString()
				);
			}
			if (date.getMonth() + 1 < 10) {
				return (
					date.getDate().toString() +
					'/' +
					'0' +
					(date.getMonth() + 1).toString() +
					'/' +
					date.getFullYear().toString()
				);
			}
		} else {
			return (
				date.getDate().toString() +
				'/' +
				(date.getMonth() + 1).toString() +
				'/' +
				date.getFullYear().toString()
			);
		}
	};

	const getAccurateTime = () => {
		// Integer values are checked if they are truthy by using operators
		if (date.getHours() >= 0) {
			if (date.getHours() < 12) {
				return 'am';
			} else {
				return '';
			}
		}
	};

	const eventTime = () => {
		// Integer values are checked if they are truthy by using operators
		if (date.getHours() >= 0) {
			if (date.getHours() < 10 || date.getMinutes() < 10) {
				if (date.getHours() < 10 && date.getMinutes() < 10) {
					return '0' + date.getHours() + ':' + '0' + date.getMinutes();
				} //
				if (date.getHours() < 10) {
					return '0' + date.getHours() + ':' + date.getMinutes();
				}
				if (date.getMinutes() < 10) {
					return date.getHours() + ':' + '0' + date.getMinutes();
				}
			} else {
				return date.getHours() + ':' + date.getMinutes();
			}
		}
	};

	const createEvent = () => {
		const address = eventData.address;
		const activity = eventData.activity;
		const postcode = eventData.postcode;

		let validator = false;

		if (activity.trim().length !== 0 || activity !== '') {
			console.log('activity', activity);
			if (address.trim().length !== 0 || address !== '') {
				console.log('address', address);
				if (postcode.trim().length !== 0 || postcode !== '') {
					console.log('postcode', postcode);
					if (formattedDate !== '' && formattedTime !== '') {
						// console.log(address);
						// console.log(activity);
						// console.log(postcode);
						// console.log('time', formattedTime);
						// console.log('date', formattedDate);

						validator = true;

						// Store event details in  datatbase
						const database = getDatabase();
						const reference = ref(database, 'events/');
						const postKey = push(reference);

						set(postKey, {
							admin: auth.currentUser.displayName,
							activity: activity.trim().toLowerCase(),
							address: address.trim().toLowerCase(),
							postcode: postcode.trim().toLowerCase(),
							date: formattedDate,
							time: formattedTime,
							createdAt: postCreatedDate,
							communityName: keys[0],
						});
					}
				}
			}
		}

		if (!validator) {
			Alert.alert('Incomplete Form', 'Fill the form first then tap post', [
				{ text: 'OK', onPress: () => console.log('OK Pressed') },
			]);
		}
	};

	return (
		// <KeyboardAvoidingView
		// 	behavior={Platform.OS === 'ios' ? 'padding' : null}
		// 	// keyboardVerticalOffset={Platform.select({ ios: 64 })}
		// 	style={styles.container}
		// >
		<KeyboardAwareScrollView>
			<View style={styles.card}>
				<View style={styles.formStyle}>
					<View style={styles.cardContent}>
						<View style={styles.inputLabels}>
							<Text style={styles.text}>Activity</Text>
						</View>
						<Input
							style={styles.inputBox}
							multiline={true}
							variant="underlined"
							background={'coolGray.50'}
							placeholder="Description..."
							textAlign={'left'}
							width={200}
							onChangeText={(Userinput) => {
								setEventData({ ...eventData, activity: Userinput });
							}}
						/>
						<View style={styles.action}></View>
					</View>
					<View style={styles.cardContent}>
						<View style={styles.inputLabels}>
							<Text style={styles.text}>Date</Text>
							<TouchableOpacity onPress={showDatepicker}>
								<Feather
									style={{ margin: 5 }}
									name="calendar"
									color="red"
									size={30}
								/>
							</TouchableOpacity>
						</View>
						<Text style={styles.iconHintText}>Tap Calender Icon</Text>
						<Input
							editable={false}
							value={checkDate === true ? eventDate(date) : ''}
							variant="unstyled"
							background={'amber.50'}
							placeholder="Event Date..."
							textAlign={'center'}
							width={200}
						/>
						<View style={styles.action}></View>
					</View>

					<View style={styles.cardContent}>
						<View style={styles.inputLabels}>
							<Text style={styles.text}>Time</Text>
							<TouchableOpacity onPress={showTimepicker}>
								<Feather
									style={{ margin: 5 }}
									name="clock"
									color="red"
									size={30}
								/>
							</TouchableOpacity>
						</View>
						<Text style={styles.iconHintText}>Tap Clock Icon</Text>
						<Input
							style={styles.inputBox}
							editable={false}
							value={
								checkTime === true ? eventTime() + ' ' + getAccurateTime() : ''
							}
							variant="unstyled"
							background={'amber.50'}
							placeholder="Event Time..."
							textAlign={'center'}
							width={200}
						/>
						<View style={styles.action}></View>
					</View>
					{show && (
						<DateTimePicker
							// style={{ height: 150, width: 150 }}
							display={Platform.OS === 'ios' ? 'default' : 'default'}
							testID="dateTimePicker"
							value={date}
							mode={mode}
							is24Hour={true}
							onChange={
								Platform.OS === 'ios'
									? (e, currentDate) => {
											setDate(currentDate);

											// console.log(currentDate.getTime());
											// console.log(currentDate.getMinutes());
											// console.log(currentDate.getHours());
									  }
									: (e, currentDate) => {
											if (currentDate === undefined) {
												console.log('error with Android Date Picker');
												// setShow(false);
											} else {
												// console.log('no error');
												setDate(currentDate);
												setCheckTime(true);
												setCheckDate(true);
												setShow(false);
											}
									  }
							}
						/>
					)}
					{Platform.OS === 'ios' ? (
						show ? (
							<View style={{ alignItems: 'center' }}>
								<TouchableOpacity
									onPress={() => {
										setShow(!show);
									}}
								>
									<Text style={[styles.text, { color: 'red', margin: 15 }]}>
										Close
									</Text>
								</TouchableOpacity>
							</View>
						) : null
					) : null}
				</View>
				<View style={styles.locationDetailsForm}>
					<View style={styles.locationLabel}>
						<Text style={styles.locationTextForm}>Address</Text>
						<Input
							multiline={true}
							variant="underlined"
							background={'coolGray.50'}
							placeholder="Address..."
							textAlign={'left'}
							width={200}
							marginBottom={5}
							onChangeText={(Userinput) => {
								setEventData({ ...eventData, address: Userinput });
							}}
						/>
					</View>
					<View style={styles.locationLabel}>
						<Text style={styles.locationTextForm}>Postcode</Text>
						<Input
							variant="underlined"
							background={'coolGray.50'}
							placeholder="PostCode..."
							textAlign={'left'}
							width={200}
							marginBottom={5}
							onChangeText={(Userinput) => {
								setEventData({ ...eventData, postcode: Userinput });
							}}
						/>
					</View>
				</View>
				<View style={styles.createBTNContainer}>
					<Text style={styles.textBTN}> Tap to post event</Text>
					<TouchableOpacity style={styles.createBTN} onPress={createEvent}>
						<Feather name="plus-circle" color="green" size={50} />
					</TouchableOpacity>
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
};
export default CreateEvents;
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		// flexDirection: 'column',
		alignItems: 'center',
		margin: 20,
	},
	headerText: { fontWeight: 'bold', fontSize: 15 },
	formStyle: {
		marginTop: 30,
		// alignItems: 'center',
	},
	cardContent: {
		alignItems: 'center',
	},
	locationDetailsForm: {
		alignItems: 'center',
	},
	locationLabel: { flexDirection: 'column' },
	locationTextForm: {
		fontSize: 25,
		padding: 3,
		marginLeft: 50,
		marginBottom: 10,
		fontWeight: 'bold',
	},
	card: {
		// flex: 1,
		backgroundColor: 'white',
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		// height: 750,
	},
	inputLabels: {
		flexDirection: 'row',
		marginBottom: 15,
	},
	iconHintText: {
		fontSize: 10,
		margin: 5,
	},
	action: {
		marginTop: 3,
		// marginBottom: 1,
		borderBottomColor: '#f2f2f2',
		borderBottomWidth: 20,
	},
	dateAndTimePicker: {
		flexDirection: 'row',
	},
	text: {
		fontWeight: 'bold',
		fontSize: 30,
		marginLeft: 30,
	},
	pickerText: {
		fontWeight: 'bold',
		fontSize: 20,
		marginVertical: 20,
		marginHorizontal: 15,
		padding: 15,
		backgroundColor: '#2c9dd1',
	},
	createBTNContainer: {
		alignItems: 'center',
		padding: 15,
	},
	// createBTN: {
	// 	marginBottom: 50,
	// },
	textBTN: {
		fontSize: 20,
		marginBottom: 5,
	},
});
