import React, { useState } from 'react';

import { View, Text, StyleSheet } from 'react-native';

// Import data from local files
import DismissKeyboard from '../utilis/DismissKeyboard';

// Import database services from Firebase
import { getDatabase, ref, onValue, set } from 'firebase/database';

// Third-Party React Native UI Packages
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { Input, AddIcon } from 'native-base';

const CreateCommunity = ({ navigation }) => {
	const [data, setData] = useState({
		name: 'test',
		university: '',
		course: '',
		interest: '',
	});

	const name_changeText = (text) => {
		if (text !== null) {
			setData({
				...data,
				name: text,
			});
		} else {
			console.log('invalid  name');
		}
	};

	const uni_changeText = (text) => {
		if (text !== null) {
			setData({
				...data,
				university: text,
			});
		} else {
			console.log('invalid University name');
		}
	};

	const course_changeText = (text) => {
		if (text !== null) {
			setData({
				...data,
				course: text,
			});
		} else {
			console.log('invalid course name');
		}
	};

	const interest_changeText = (text) => {
		if (text !== null) {
			setData({
				...data,
				interest: text,
			});
		} else {
			console.log('invalid interest name');
		}
	};

	const storeCommunityDetails = () => {
		try {
			const db = getDatabase();
			console.log('name', data.name);
			const reference = ref(db, 'communities/' + data.name);
			set(reference, {
				university: data?.university,
				course: data?.course,
				interest: data?.interest,
			});
			navigation.navigate('My_Community', data);
		} catch (error) {
			console.log('error message: Problem Storing data in Database');
		}
	};

	return (
		<DismissKeyboard>
			<View style={styles.container}>
				<Card>
					<Card.Title style={{ marginLeft: 100 }} title="Create Community" />
					<Card.Content style={{ flexDirection: 'column' }}>
						<Title style={{ marginRight: 5, marginTop: 5 }}>Name</Title>
						<Input
							onChangeText={(text) => {
								name_changeText(text);
							}}
							variant="rounded"
							mx="3"
							placeholder="Community Name"
							w="75%"
							maxWidth="200px"
							marginTop={2}
							marginBottom={5}
						/>
					</Card.Content>
					<Card.Content style={{ flexDirection: 'column' }}>
						<Title style={{ marginRight: 5, marginTop: 5 }}>University</Title>
						<Input
							onChangeText={(text) => {
								uni_changeText(text);
							}}
							variant="rounded"
							mx="3"
							placeholder="Input"
							w="75%"
							maxWidth="200px"
							marginTop={2}
							marginBottom={5}
						/>
					</Card.Content>
					<Card.Content style={{ flexDirection: 'column' }}>
						<Title style={{ marginRight: 5, marginTop: 5 }}>Course</Title>
						<Input
							onChangeText={(text) => {
								course_changeText(text);
							}}
							variant="rounded"
							mx="3"
							placeholder="Input"
							w="75%"
							maxWidth="200px"
							marginTop={2}
							marginBottom={5}
						/>
					</Card.Content>
					<Card.Content style={{ flexDirection: 'column' }}>
						<Title style={{ marginRight: 5, marginTop: 5 }}>Interest</Title>
						<Input
							onChangeText={(text) => {
								interest_changeText(text);
							}}
							variant="rounded"
							mx="3"
							placeholder="Input"
							w="75%"
							maxWidth="200px"
							marginTop={2}
							marginBottom={5}
						/>
					</Card.Content>
				</Card>
				<View style={{ flex: 1, alignItems: 'center' }}>
					<Text style={styles.post_text}>
						Press the button to create your community
					</Text>
					<View style={styles.addButton}>
						<Button color="blue" onPress={storeCommunityDetails}>
							Click Me
						</Button>
					</View>
				</View>
			</View>
		</DismissKeyboard>
	);
};
export default CreateCommunity;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: 'white',
	},
	addButton: {
		marginTop: 20,
	},
	post_text: {
		padding: 10,
		fontWeight: 'bold',
		fontSize: 15,
	},
});
