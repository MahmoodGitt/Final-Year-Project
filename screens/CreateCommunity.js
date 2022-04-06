import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

// Import data from local files
import DismissKeyboard from '../utilis/DismissKeyboard';

// Third-Party React Native UI Packages
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { Input, AddIcon } from 'native-base';

const CreateCommunity = ({ navigation }) => {
	return (
		<DismissKeyboard>
			<View style={styles.container}>
				<Card>
					<Card.Title style={{ marginLeft: 100 }} title="Create Community" />
					<Card.Content style={{ flexDirection: 'column' }}>
						<Title style={{ marginRight: 5, marginTop: 5 }}>University</Title>
						<Input
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
						<Button
							color="blue"
							onPress={() => {
								navigation.navigate('Home');
							}}
						>
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
