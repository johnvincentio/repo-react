//

import React from 'react';

import Outer from '../home/Outer';
import Inner from '../home/Inner';

import { Title, Nav } from './RegisterStyles';

const UserRegisterFailed = () => (
	<Outer>
		<Inner>
			<Title>Unable to confirm your registration</Title>

			<Nav>
				<p>Please use the link in your confirmation email.</p>
				<p>
					<a href="/">Return to Taskmuncher</a>
				</p>
			</Nav>
		</Inner>
	</Outer>
);

export default UserRegisterFailed;
