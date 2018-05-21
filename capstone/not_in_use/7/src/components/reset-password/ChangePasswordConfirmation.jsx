//

import React from 'react';

import Outer from '../home/Outer';
import Inner from '../home/Inner';

import { Title, Nav } from '../register/RegisterStyles';

const ChangePasswordConfirmation = () => (
	<Outer>
		<Inner>
			<Title>Thank you for updating your password</Title>

			<Nav>
				<p>You are now able to login with your credentials</p>
				<p>
					<a href="/">Return to Taskmuncher</a>
				</p>
			</Nav>
		</Inner>
	</Outer>
);

export default ChangePasswordConfirmation;
