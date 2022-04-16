import React, { useEffect, useState } from 'react';

// Firebase Instance
import auth from '../firebase/config';
//Firebase Package
import { getDatabase, ref, onValue } from 'firebase/database';

const UserInformation = () => {
	const [data, setData] = useState(null);

	useEffect(() => {
		const db = getDatabase();
		const reference = ref(db, 'users/' + auth.currentUser.uid);
		onValue(reference, (snapshot) => {
			setData(snapshot.val().name);
		});
	}, []);

	if (data) {
		return data;
	}
	// else {
	// 	return console.log('Error fetching user name');
	// }
};
export default UserInformation;
