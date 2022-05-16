/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';

import SignOut from '../../screens/CreateEvent';

describe('CreateEvent Component', () => {
	it('Testing if Sign out Component loads up', () => {
		const tree = renderer.create(<SignOut />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
