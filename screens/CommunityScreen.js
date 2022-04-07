import React from 'react';

// React Navigation Packages
import { StyleSheet, TouchableOpacity, Button } from 'react-native';

// Import data from local files
import DismissKeyboard from '../utilis/DismissKeyboard';

// Import third-Party UI Library
import { ScrollView, View } from 'native-base';
import { Card, Title, Paragraph, Searchbar } from 'react-native-paper';
// import { Input, AddIcon } from 'native-base';

const CommunityScreen = ({ route }) => {
	// const test = route.params;
	const test = route?.params;

	// console.log('test', test.course);

	return (
		// <DismissKeyboard>
		// {/* <View style={styles.container}> */}
		// {/* <Searchbar placeholder="Search" /> */}
		// {/* <ScrollView> */}
		<View styles={styles.header}>
			<Searchbar placeholder="Search" style={{ marginBottom: 10 }} />
			<ScrollView>
				<View style={styles.body}>
					<Card>
						<Card.Content
							style={{ flexDirection: 'row', justifyContent: 'space-around' }}
						>
							<Title
								style={{
									marginRight: 5,
									marginTop: 5,
								}}
							>
								{test?.university}
							</Title>
							<Title
								style={{
									marginRight: 5,
									marginTop: 5,
								}}
							>
								{test?.course}
							</Title>
							<Title
								style={{
									marginRight: 5,
									marginTop: 5,
								}}
							>
								{test?.interest}
							</Title>
						</Card.Content>
					</Card>
				</View>
			</ScrollView>
		</View>
		// {/* </ScrollView> */}
		// {/* </View> */}
		// {/* </DismissKeyboard> */}
	);
};

export default CommunityScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		flexDirection: 'row',
	},
	body: {
		flex: 1,
		padding: 5,
	},
});
