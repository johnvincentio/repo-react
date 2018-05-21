//

import React from 'react';

import Outer from '../home/Outer';
import Inner from '../home/Inner';

import { Title, Nav } from '../register/RegisterStyles';

const ChangePasswordFailed = () => (
	<Outer>
		<Inner>
			<Title>Unable to confirm your password reset</Title>

			<Nav>
				<p>Please use the link in your confirmation email.</p>
				<p>
					<a href="/">Return to Taskmuncher</a>
				</p>
			</Nav>
		</Inner>
	</Outer>
);

export default ChangePasswordFailed;
