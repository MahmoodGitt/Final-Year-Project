import React, { useEffect, useState } from 'react';
// React Native Packages
import { View, Text, StyleSheet, Platform } from 'react-native';

// Import data from local files
import DismissKeyboard from '../utilis/DismissKeyboard';
import auth from '../firebase/config';

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
import { Card } from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { Input } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import Feather from 'react-native-vector-icons/Feather';

const CreateEvents = ({ navigation }) => {
	const [date, setDate] = useState(new Date());
	const [dateAndTime, setDateAndTime] = useState(new Date(1598051730000));
	const [eventData, setEventData] = useState({
		name: '',
		day: 0,
		month: 0,
		year: 0,
	});
	const [mode, setMode] = useState('date');
	const [show, setShow] = useState(false);

	// useEffect(() => {
	// 	console.log(date.getDate());
	// 	console.log(date.Hours());
	// }, []);

	const onChange = async (event, selectedDate) => {
		const currentDate = selectedDate;
		// setDate(currentDate);

		// console.log('Date ', date.getDate());
		console.log(selectedDate.getDate());
		// console.log(selectedDate.getMinutes());
		passVal(selectedDate);
		// setShow(false);
	};

	const passVal = (e) => {
		setDate(e);
		console.log('Date ', e.getDate());
	};

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode('date');
	};

	const showTimepicker = () => {
		showMode('time');
	};

	const eventdate = () => {
		console.log('Date ', date.getDate());
		if (date.getDate() < 10 || date.getMonth() + 1 < 10) {
			if (dateAndTime.getDate() < 10 && date.getMonth() + 1 < 10) {
				return (
					'0' +
					date.getDate().toString() +
					'/' +
					'0' +
					(date.getMonth() + 1).toString() +
					'/' +
					date.getFullYear().toString()
				);
			} else if (date.getMonth() + 1 < 10) {
				return (
					date.getDate().toString() +
					'/' +
					'0' +
					(date.getMonth() + 1).toString() +
					'/' +
					date.getFullYear().toString()
				);
			} else if (date.getDate() < 10) {
				return (
					'0' +
					date.getDate().toString() +
					'/' +
					(date.getMonth() + 1).toString() +
					'/' +
					date.getFullYear().toString()
				);
			}
		} else {
			return (
				dateAndTime.getDate().toString() +
				'/' +
				(dateAndTime.getMonth() + 1).toString() +
				'/' +
				dateAndTime.getFullYear().toString()
			);
		}
	};

	const getAccurateTime = () => {
		if (date.getHours()) {
			if (date.getHours() < 12) {
				return 'am';
			} else {
				return '';
			}
		}
	};

	const eventTime = () => {
		if (date.getHours()) {
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

	const renderDateAndTimePicker = () => {
		return <View></View>;
	};

	return (
		<DismissKeyboard>
			<ScrollView>
				<Animatable.View animation="fadeInUpBig" style={styles.container}>
					<Card style={styles.card}>
						<View style={styles.formStyle}>
							<Card.Content style={styles.cardContent}>
								<View style={styles.inputLabels}>
									<Text style={styles.text}>Activity</Text>
								</View>
								<Input
									style={styles.inputBox}
									multiline={true}
									// numberOfLines={5}
									variant="unstyled"
									background={'amber.50'}
									placeholder="Event Name..."
									textAlign={'left'}
									width={200}
								/>
								<View style={styles.action}></View>
							</Card.Content>
							<Card.Content style={styles.cardContent}>
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
									value={eventdate()}
									variant="unstyled"
									background={'amber.50'}
									placeholder="Event Date..."
									textAlign={'center'}
									width={200}
								/>

								<View style={styles.action}></View>
							</Card.Content>

							<Card.Content style={styles.cardContent}>
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
									value={eventTime() + ' ' + getAccurateTime()}
									variant="unstyled"
									background={'amber.50'}
									placeholder="Event Time..."
									textAlign={'center'}
									width={200}
								/>

								<View style={styles.action}></View>
							</Card.Content>
							{show && (
								<DateTimePicker
									// style={{ height: 150, width: 150 }}
									display={Platform.OS === 'ios' ? 'spinner' : 'default'}
									testID="dateTimePicker"
									value={date}
									mode={mode}
									is24Hour={true}
									onChange={
										Platform.OS === 'ios'
											? (e, currentDate) => {
													setDate(currentDate);
													// console.log(currentDate.getTime());
													console.log(currentDate.getMinutes());
													console.log(currentDate.getHours());
											  }
											: (e, currentDate) => {
													if (currentDate === undefined) {
														console.log('error');
														// setShow(false);
													} else {
														console.log('no error');
														setDate(currentDate);
														console.log(currentDate);
														setShow(false);
													}
											  }
									}
								/>
							)}
							{Platform.OS === 'ios' ? (
								show ? (
									<Card.Content style={{ alignItems: 'center' }}>
										<TouchableOpacity
											onPress={() => {
												setShow(!show);
											}}
										>
											<Text style={[styles.text, { color: 'red', margin: 15 }]}>
												Close
											</Text>
										</TouchableOpacity>
									</Card.Content>
								) : null
							) : null}
							<Card.Content style={styles.cardContent}>
								<View style={styles.inputLabels}>
									<Text style={styles.text}>Location</Text>
								</View>
								<Input
									variant="unstyled"
									background={'amber.50'}
									placeholder="Event Place..."
									textAlign={'center'}
									width={200}
									height={50}
								/>
								<View style={styles.action}></View>
							</Card.Content>
						</View>
					</Card>
				</Animatable.View>
			</ScrollView>
		</DismissKeyboard>
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

	card: {
		flex: 1,
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
});
