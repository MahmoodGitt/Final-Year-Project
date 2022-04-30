import React, { useEffect, useState } from 'react';
// React Native Packages
import { View, Text, StyleSheet } from 'react-native';

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
import { event } from 'react-native-reanimated';

const CreateEvents = ({ navigation }) => {
	const [date, setDate] = useState(new Date(1598051730000));
	const [eventData, setEventData] = useState({
		name: '',
		day: 0,
		month: 0,
		year: 0,
	});
	const [mode, setMode] = useState('date');
	const [show, setShow] = useState(false);
	const [arr, setarr] = useState([]);
	// useEffect(() => {
	// 	onChange(null, new Date(1598051730000));
	// }, []);

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;

		// setDate(currentDate);
		// setShow(false);
		// console.log;
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
				date.getDate().toString() +
				'/' +
				(date.getMonth() + 1).toString() +
				'/' +
				date.getFullYear().toString()
			);
		}
	};

	const getAccurateTime = () => {
		if (date.getHours() < 12) {
			return 'am';
		} else {
			return '';
		}
	};

	const eventTime = () => {
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
	};

	return (
		<DismissKeyboard>
			<Animatable.View animation="fadeInUpBig" style={styles.container}>
				<Card style={styles.card}>
					<ScrollView>
						{/* <View style={styles.header}>
					<Text style={styles.headerText}>Create Your Own Community</Text>
				</View> */}
						<TouchableOpacity style={styles.header} onPress={() => {}}>
							<Text style={styles.headerText}> Create Event</Text>
						</TouchableOpacity>
						<View style={styles.formStyle}>
							<Card.Content>
								<View style={styles.inputLabels}>
									<Text style={styles.text}>Event - </Text>
									<Input
										variant="unstyled"
										background={'amber.50'}
										placeholder="Event Name..."
										textAlign={'center'}
										width={200}
									/>
								</View>
								<View style={styles.action}></View>
							</Card.Content>
							<Card.Content>
								<View style={styles.inputLabels}>
									<Text style={styles.text}>Date - </Text>
									<Input
										editable={false}
										value={eventdate()}
										variant="unstyled"
										background={'amber.50'}
										placeholder="Event Date..."
										textAlign={'center'}
										width={200}
									/>
								</View>
								<View style={styles.action}></View>
							</Card.Content>
							<Card.Content>
								<View style={styles.inputLabels}>
									<Text style={styles.text}>Time - </Text>
									<Input
										editable={false}
										value={eventTime() + ' ' + getAccurateTime()}
										variant="unstyled"
										background={'amber.50'}
										placeholder="Event Time..."
										textAlign={'center'}
										width={200}
									/>
								</View>
								<View style={styles.action}></View>
							</Card.Content>
							<Card.Content>
								<View style={styles.inputLabels}>
									<Text style={styles.text}>Location - </Text>

									<Input
										variant="unstyled"
										background={'amber.50'}
										placeholder="Event Place..."
										textAlign={'center'}
										width={200}
										height={50}
									/>
								</View>
								<View style={styles.action}></View>
							</Card.Content>
							<Card.Content style={styles.dateAndTimePicker}>
								<TouchableOpacity onPress={showTimepicker}>
									<Text style={styles.pickerText}>Select Time</Text>
								</TouchableOpacity>

								<TouchableOpacity onPress={showDatepicker}>
									<Text style={styles.pickerText}>Select Date</Text>
								</TouchableOpacity>
							</Card.Content>
							{/* <Card.Content> */}
							<Text>selected</Text>

							{/* </Card.Content> */}
						</View>
						{show && (
							<DateTimePicker
								// style={{ width: 90 }}
								display="spinner"
								testID="dateTimePicker"
								value={date}
								mode={mode}
								is24Hour={true}
								onChange={(e, currentDate) => {
									setDate(currentDate);
									// console.log(currentDate.getTime());
									console.log(currentDate.getMinutes());
									console.log(currentDate.getHours());
								}}
							/>
						)}
					</ScrollView>
				</Card>
			</Animatable.View>
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
		alignItems: 'flex-start',
	},

	card: {
		flex: 3,
		backgroundColor: 'white',
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		// height: 750,
	},
	inputLabels: {
		flexDirection: 'row',
	},

	action: {
		flexDirection: 'row',
		marginTop: 3,
		marginBottom: 15,
		borderBottomColor: '#f2f2f2',
	},
	dateAndTimePicker: {
		flexDirection: 'row',
	},
	text: {
		fontWeight: 'bold',
		fontSize: 30,
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
