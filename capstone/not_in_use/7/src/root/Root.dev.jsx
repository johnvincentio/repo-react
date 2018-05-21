import React, { Fragment } from 'react';

import DevTools from './DevTools';

import AppRoutes from '../routes';

const Root = () => (
	<Fragment>
		<AppRoutes />
		<DevTools />
	</Fragment>
);

export default Root;
