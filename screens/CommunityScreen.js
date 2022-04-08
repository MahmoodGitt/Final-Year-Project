import React, { useState } from 'react';

// React Native UI Packages
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { EvilIcons, FontAwesome } from '@expo/vector-icons';

// Import data from local files
import DismissKeyboard from '../utilis/DismissKeyboard';

// Import third-Party UI Library
import { Card, Title, Avatar, Searchbar, Paragraph } from 'react-native-paper';

const CommunityScreen = (props) => {
	return (
		<DismissKeyboard>
			<View style={styles.container}>
				<Searchbar
					placeholder="Search"
					style={{
						borderBottomColor: 'black',
						borderBottomWidth: 1,
						borderTopWidth: 1,
					}}
				/>

				{/* <View styles={styles.header}> */}
				{/* <View style={styles.body}> */}
				<ScrollView>
					<Card
						style={{
							borderBottomColor: 'black',
							borderBottomWidth: 1,
							borderTopWidth: 1,
							borderLeftWidth: 1,
							borderRightWidth: 1,
							backgroundColor: 'white',
						}}
					>
						<Card.Title
							title={['User: ', props.data]}
							subtitle={['Studying ', props.data, ' at ', props.data]}
							left={() => (
								<Avatar.Image
									source={require('../Images/profile_pic.jpg')}
									size={50}
								/>
							)}
						/>
						<Card.Content
							style={{
								flexDirection: 'row',
								justifyContent: 'flex-start',

								borderBottomWidth: 1,
								borderTopWidth: 1,
							}}
						>
							<Title>
								Description:
								kldfkldnsklfnklsnflknewlknklanklnkldndklnklnkldnldfnklndslnkldnklndewihiehfioa{' '}
							</Title>
						</Card.Content>

						<Card.Content
							style={{
								flexDirection: 'row',
								justifyContent: 'flex-start',
								padding: 20,
							}}
						>
							<EvilIcons name="comment" size={24} color="black" />
							<Paragraph>comment</Paragraph>
							<FontAwesome
								name="heart"
								size={24}
								color="red"
								style={{ marginLeft: 180 }}
							/>
							<Paragraph style={{ marginLeft: 5 }}>Like</Paragraph>
						</Card.Content>
					</Card>
				</ScrollView>
				{/* </View> */}
			</View>

			{/* </View> */}
		</DismissKeyboard>
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
