/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';

import App from '../../App';

describe('<App />', () => {
	it('Testing if all screens lo loads up', () => {
		const tree = renderer.create(<App />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
