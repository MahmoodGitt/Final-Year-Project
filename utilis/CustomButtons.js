import { TouchableOpacity, StyleSheet, Text } from 'react-native';
const CustomButtons = (props) => {
	return (
		<TouchableOpacity style={[styles.container, props.style]}>
			<Text style={styles.login}>Account</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#007AFF',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		borderRadius: 5,
		paddingLeft: 16,
		paddingRight: 16,
	},
	login: {
		color: '#fff',
		fontSize: 17,
	},
});

export default CustomButtons;
