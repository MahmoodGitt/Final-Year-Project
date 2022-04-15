import React, { useEffect } from 'react';

// Firebase Instance
import auth from '../firebase/config';
//Firebase Package
import { getDatabase, ref, onValue } from 'firebase/database';

const UserInformation = () => {
	var data = null;
	const getUserName = () => {
		const db = getDatabase();
		const reference = ref(db, 'users/' + auth.currentUser.uid);
		onValue(reference, (snapshot) => {
			data = snapshot.val();
		});
	};

	useEffect(() => {
		getUserName;
	});

	return data;
};
export default UserInformation;
