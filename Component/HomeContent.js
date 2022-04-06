import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

// Import data from local files
import DismissKeyboard from '../utilis/DismissKeyboard';

// Third-Party React Native UI Packages
import {
	Avatar,
	IconButton,
	Card,
	Title,
	Paragraph,
	Searchbar,
} from 'react-native-paper';

const HomeContent = () => {
	return (
		<DismissKeyboard>
			<View style={styles.container}>
				<Card>
					<Card.Title
						title="Bringing Students Together"
						left={(props) => <Avatar.Icon {...props} icon="" />}
					/>
					<Card.Content>
						<Title>Hi Mahmoud</Title>
						<Paragraph>You have 0 community and 0 Activiy</Paragraph>
					</Card.Content>
				</Card>
			</View>
		</DismissKeyboard>
	);
};

export default HomeContent;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'blue',
		// flex: 1,
		// alignItems: 'center',
		// justifyContent: 'center',
	},

	searchStyle: {},
});
