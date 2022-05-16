/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';

import LoginScreen from '../../screens/LoginScreen';

describe('Log in Component', () => {
	it('Testing if Login Screen Component loads up', () => {
		const tree = renderer.create(<LoginScreen />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
