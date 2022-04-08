import React, { useState, useEffect } from 'react';

// Firebase database services
import { getDatabase, ref, onValue } from 'firebase/database';

//
import CommunityScreen from '../screens/CommunityScreen';

const ReadFromDatabase = () => {
	const [data, setData] = useState({
		// university: '',
		course: '',
		interest: '',
	});

	useEffect(() => {
		const database = getDatabase();
		const reference = ref(database, 'communities');
		onValue(reference, (snapshot) => {
			setData({
				course: snapshot.val().course,
				interest: snapshot.val().interest,
			});
			console.log('course', snapshot.val().course);
		});
	}, []);

	return <CommunityScreen data={data.course} />;
};

export default ReadFromDatabase;
