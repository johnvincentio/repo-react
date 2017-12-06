
import React from 'react';

import { Sparklines, SparklinesLine } from 'react-sparklines';

const SettingsProjects = props => (
	<div>
		<Sparklines height={120} width={180} data={props.data}>
			<SparklinesLine color={props.color} />
		</Sparklines>
	</div>
);

export default SettingsProjects;

