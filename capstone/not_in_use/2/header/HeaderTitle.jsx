
import React from 'react';
import { Link } from 'react-router-dom';

import Icon from '../../toolbox/Icon';

const HeaderTitle = () => (
	<div className="header-title">
		<h1>
			<Link to="/">
				<Icon name="greek" />
				<span itemProp="name"><span className="logo">Task</span>Cruncher</span>
			</Link>
		</h1>
	</div>
);

export default HeaderTitle;
