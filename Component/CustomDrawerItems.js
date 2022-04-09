import React from 'react';

// import data from local files
import DismissKeyboard from '../utilis/DismissKeyboard';

// React Native Design Elements
import { View, StyleSheet, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

// Third-Party React Native UI Packages
import { Avatar, Title, Caption, Drawer } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomDrawerItems = (props) => {
	return (
		<DismissKeyboard>
			<View style={{ flex: 1 }}>
				<DrawerContentScrollView {...props}>
					<View style={styles.drawerContent}>
						<View style={styles.userInfoSection}>
							<View style={{ flexDirection: 'row', marginTop: 15 }}>
								<Avatar.Image
									source={require('../Images/profile_pic.jpg')}
									size={50}
								/>
								<View style={{ marginLeft: 15, flexDirection: 'column' }}>
									<Text style={styles.title}>John Doe</Text>
									<Caption style={styles.caption}>@j_doe</Caption>
								</View>
							</View>
						</View>

						<Drawer.Section style={styles.drawerSection}>
							<DrawerItem
								icon={({ color, size }) => (
									<Icon name="home-outline" color={color} size={size} />
								)}
								label="Home"
								onPress={() => {
									props.navigation.navigate('Login');
								}}
							/>
							{/* <DrawerItem
								icon={({ color, size }) => (
									<Icon name="home-outline" color={color} size={size} />
								)}
								label="My Community"
								onPress={() => {
									// props.navigation.navigate('Home');
								}}
							/> */}
							<DrawerItem
								icon={({ color, size }) => (
									<Icon name="account-outline" color={color} size={size} />
								)}
								label="Profile"
								onPress={() => {
									// props.navigation.navigate('Login');
								}}
							/>
						</Drawer.Section>
					</View>
				</DrawerContentScrollView>
				<Drawer.Section style={styles.bottomDrawerSection}>
					<DrawerItem
						icon={({ color, size }) => (
							<Icon name="exit-to-app" color={color} size={size} />
						)}
						label="Sign Out"
						onPress={() => {
							signOut();
						}}
					/>
				</Drawer.Section>
			</View>
		</DismissKeyboard>
	);
};

export default CustomDrawerItems;

const styles = StyleSheet.create({
	drawerContent: {
		flex: 1,
	},
	userInfoSection: {
		paddingLeft: 20,
	},
	title: {
		fontSize: 16,
		marginTop: 3,
		fontWeight: 'bold',
	},
	caption: {
		fontSize: 14,
		lineHeight: 14,
	},
	row: {
		marginTop: 20,
		flexDirection: 'row',
		alignItems: 'center',
	},
	section: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 15,
	},
	paragraph: {
		fontWeight: 'bold',
		marginRight: 3,
	},
	drawerSection: {
		marginTop: 15,
	},
	bottomDrawerSection: {
		marginBottom: 15,
		borderTopColor: '#f4f4f4',
		borderTopWidth: 1,
	},
	preference: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 12,
		paddingHorizontal: 16,
	},
});
