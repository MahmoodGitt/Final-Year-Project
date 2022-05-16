/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';

import Chat from '../../screens/Chat';

describe('Creat Chat Component', () => {
	it('Testing if Message Component loads up', () => {
		const tree = renderer.create(<Chat />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
