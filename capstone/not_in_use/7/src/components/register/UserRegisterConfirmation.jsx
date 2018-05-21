//

import React from 'react';

import Outer from '../home/Outer';
import Inner from '../home/Inner';

import { Title, Nav } from './RegisterStyles';

const UserRegisterConfirmation = () => (
	<Outer>
		<Inner>
			<Title>Thank you for confirming your registration</Title>

			<Nav>
				<p>You are now able to login with your credentials</p>
				<p>
					<a href="/">Return to Taskmuncher</a>
				</p>
			</Nav>
		</Inner>
	</Outer>
);

export default UserRegisterConfirmation;
