//

import React from 'react';

import Outer from '../home/Outer';
import Inner from '../home/Inner';

import { Title, Nav } from '../register/RegisterStyles';

const ContactConfirmation = () => (
	<Outer>
		<Inner>
			<Title>Thank you for Contacting Us</Title>

			<Nav>
				<p>We will reply shortly</p>
				<p>
					<a href="/">Return to Taskmuncher</a>
				</p>
			</Nav>
		</Inner>
	</Outer>
);

export default ContactConfirmation;
