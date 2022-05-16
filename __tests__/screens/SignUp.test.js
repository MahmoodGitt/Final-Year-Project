/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';

import SignUpScreen from '../../screens/SignUpScreen';

describe('Sign up Component', () => {
	it('Testing if Sign up Screen Component loads up', () => {
		const tree = renderer.create(<SignUpScreen />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
