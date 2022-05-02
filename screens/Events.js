import React, { useEffect, useState } from 'react';
// React Native Packages
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	ImageBackground,
	TouchableWithoutFeedback,
	Alert,
	Pressable,
	Modal,
	SafeAreaView,
} from 'react-native';
import Toast from 'react-native-root-toast';

// Import data from local files
import DismissKeyboard from '../utilis/DismissKeyboard';
import auth from '../firebase/config';
import GlobalKeys from '../utilis/GlobalKeys';

// Firebase services
import { getDatabase, ref, onChildAdded } from 'firebase/database';

// Third-Party React Native UI Packages
import {
	Card,
	Title,
	Paragraph,
	Button,
	Avatar,
	ProgressBar,
	Colors,
	Appbar,
	RadioButton,
	Snackbar,
} from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import { Center, Column, Input } from 'native-base';
import { setStatusBarTranslucent } from 'expo-status-bar';
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { async } from '@firebase/util';
import { checkActionCode } from 'firebase/auth';
import { block } from 'react-native-reanimated';

const Events = ({ navigation }) => {
	const [itemList, setItemList] = useState([{ id: 0 }]);
	const updateView = () => {
		const db = getDatabase();
		// Retrieve all events
		const postRef = ref(db, 'events');
		onChildAdded(postRef, (snapshotData) => {
			// console.log(snapshotData.val());
		});
	};

	useEffect(() => {
		updateView();
	});

	return (
		<DismissKeyboard>
			<SafeAreaView style={styles.container}>
				{/* <View>
				<TouchableOpacity 	onPress={() =>
						navigation.navigate('CommunityTopTab', {
							screen: 'Members',
							params: { user: 'jane' },
						})
					} style={{ margin: 15 }}>
					<Text style={{ fontSize: 40 }}>Click</Text>
				</TouchableOpacity>
			</View> */}
				{/* <FlatList
					key={(item) => {
						return item.id;
					}}
					data={itemList}
					renderItem={renderItem}
					keyExtractor={(item) => {
						return item.id;
					}}
					// extraData={itemList}
				/> */}
			</SafeAreaView>
		</DismissKeyboard>
	);
};
export default Events;

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
		// margin: 30,
		alignItems: 'center',
	},

	card: {
		flex: 3,
		backgroundColor: 'white',
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		height: 750,
	},

	action: {
		flexDirection: 'row',
		marginTop: 3,
		marginBottom: 15,
		borderBottomColor: '#f2f2f2',
	},
	featherIcons: {
		marginHorizontal: 20,
		marginVertical: 10,
	},
	errorMsg: {
		color: '#FF0000',
		fontSize: 14,
		marginTop: -20,
		marginBottom: 20,
	},
	text: {
		fontWeight: 'bold',
		fontSize: 30,
	},
	helpIcon: {
		marginHorizontal: 15,
	},
	createButton: {
		marginVertical: 20,
		alignItems: 'center',
	},
	progressBar: {
		marginVertical: 20,
		marginHorizontal: 10,
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'justify',
	},
	modalCenterView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: -100,
	},
	modalDisplay: {
		alignItems: 'center',
		padding: 35,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
	},
	closeModalButton: {
		padding: 10,
		elevation: 2,
		borderRadius: 20,
	},
	modalbutton: {
		elevation: 2,
		borderRadius: 20,
	},
	buttonOpenModal: {
		backgroundColor: 'green',
	},
	buttonCloseModal: {
		backgroundColor: '#2196F3',
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
