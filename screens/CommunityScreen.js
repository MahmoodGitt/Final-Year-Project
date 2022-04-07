import React, { useState } from 'react';

// React Navigation Packages
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// Import data from local files
import DismissKeyboard from '../utilis/DismissKeyboard';

// Import third-Party UI Library
import { ScrollView, View } from 'native-base';
import { Card, Title, Paragraph, Searchbar } from 'react-native-paper';
// import { Input, AddIcon } from 'native-base';

const CommunityScreen = (props) => {
	const [data, setData] = useState({
		// university: '',
		course: '',
		interest: '',
	});
	// const fetchData = () => {
	// 	const database = getDatabase();
	// 	const reference = ref(database, 'communities/');
	// 	onValue(reference, (snapshot) => {
	// 		setData({
	// 			course: snapshot.val().course,
	// 		});
	// 		// console.log('course', snapshot.val().course);
	// 	});
	// };
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
							style={{ flexDirection: 'row', justifyContent: 'center' }}
						>
							<Title
								style={{
									marginRight: 5,
									marginTop: 5,
								}}
							>
								<TouchableOpacity>
									<Text style={{ fontSize: 50 }}>click</Text>
								</TouchableOpacity>
							</Title>
						</Card.Content>
						<Card.Content
							style={{ flexDirection: 'row', justifyContent: 'center' }}
						>
							<Title
								style={{
									marginRight: 5,
									marginTop: 5,
								}}
							>
								<Text style={{ fontSize: 20 }}>{props.data}</Text>
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
