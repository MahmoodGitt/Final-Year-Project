/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';

import CreateCommunity from '../../screens/CreateCommunity';

describe('Creat Community Component', () => {
	it('Testing if CreateCommunity loads up', () => {
		const tree = renderer.create(<CreateCommunity />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
