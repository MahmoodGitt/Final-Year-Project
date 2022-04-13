import React from 'react';
import { View, StyleSheet } from 'react-native';

// Firebase services
import { signOut } from 'firebase/auth';

// Data from local files
import auth from '../firebase/config';

// Third-Party UI Libraries
import { Avatar, Title, Caption, Drawer } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

const CustomDrawerItems = (props) => {
	// const auth = getAuth();

	const userSignOut = () => {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
			})
			.catch((error) => {
				// An error happened.
				const errorCode = error.code;
				const errorMessage = error.message;

				console.log(errorCode);
				console.log(errorMessage);
			});
	};

	return (
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
								<Title style={styles.title}>John Doe</Title>
								<Caption style={styles.caption}>@j_doe</Caption>
							</View>
						</View>
					</View>

					<Drawer.Section style={styles.drawerSection}>
						<DrawerItem
							icon={({ color, size }) => (
								// <Icon name="home-outline" color={color} size={size} />
								<Feather name="home" color={color} size={size} />
							)}
							label="Home"
							onPress={() => {
								props.navigation.navigate('Home');
							}}
						/>
						<DrawerItem
							icon={({ color, size }) => (
								<Feather name="users" color={color} size={size} />
							)}
							label="My Community"
							onPress={() => {
								// console.log('Data from database', props.data);
								props.navigation.navigate('My_Community');
							}}
						/>
						<DrawerItem
							icon={({ color, size }) => (
								<Feather name="file-plus" color={color} size={size} />
							)}
							label="Create Community"
							onPress={() => {
								props.navigation.navigate('Create_Community');
							}}
						/>
						<DrawerItem
							icon={({ color, size }) => (
								<Feather name="settings" color={color} size={size} />
							)}
							label="Settings"
							onPress={() => {
								// props.navigation.navigate('Login');
							}}
						/>
						<DrawerItem
							icon={({ color, size }) => (
								<Feather name="globe" color={color} size={size} />
							)}
							label="Explore"
							onPress={() => {
								// props.navigation.navigate('Login');
							}}
						/>
						<DrawerItem
							icon={({ color, size }) => (
								<Feather name="log-out" color={color} size={size} />
							)}
							label="Sign Out"
							onPress={userSignOut}
						/>
					</Drawer.Section>
				</View>
			</DrawerContentScrollView>
			{/* <Drawer.Section style={styles.bottomDrawerSection}>
				<DrawerItem
					icon={({ color, size }) => (
						<Icon name="exit-to-app" color={color} size={size} />
					)}
					label="Sign Out"
					onPress={userSignOut}
				/>
			</Drawer.Section> */}
		</View>
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
