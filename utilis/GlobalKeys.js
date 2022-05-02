import { async } from '@firebase/util';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import keys from './getGlobalKeys';

const GlobalKeys = (communiyName, postId) => {
	const [key, setKey] = useState({
		communityName: 'test',
		postId: 'test',
	});
	useLayoutEffect(() => {
		if (communiyName !== '' && communiyName !== undefined) {
			if (postId !== '' && postId !== 0) {
				console.log('you passing', communiyName, ' and ', postId);
				setKey({
					...key,
					communityName: communiyName,
					postId: postId,
				});
			}
		}
	}, []);
	return key;

	// console.log('key is ', key);
};

export default GlobalKeys;
