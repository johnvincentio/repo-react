//

import React from 'react';

import Outer from '../home/Outer';
import Inner from '../home/Inner';

import { Title, Nav } from '../register/RegisterStyles';

const PasswordResetConfirmation = () => (
	<Outer>
		<Inner>
			<Title>Thank you for requesting a password reset</Title>

			<Nav>
				<p>A confirmation email has been sent to the email address you provided.</p>
				<p>Please follow the directions in the email to confirm your registration.</p>
				<p>
					<a href="/">Return to Taskmuncher</a>
				</p>
			</Nav>
		</Inner>
	</Outer>
);

export default PasswordResetConfirmation;
