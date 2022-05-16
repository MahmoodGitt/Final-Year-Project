/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';

import SignOut from '../../utilis/CustomDrawerItems';

describe('Sign up Component', () => {
	it('Testing if Sign up Screen Component loads up', () => {
		const tree = renderer.create(<SignOut />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
