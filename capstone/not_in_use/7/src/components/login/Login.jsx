//

import React from 'react';

import Outer from '../home/Outer';
import Inner from '../home/Inner';
import LoginForm from './LoginForm';
import LoginGoogle from './LoginGoogle';

import { Title, Nav, Separator } from '../register/RegisterStyles';

const Login = () => (
	<Outer>
		<Inner>
			<Title>Sign In</Title>

			<Nav>
				<p>
					{"Don't have an account?"}
					<a href="#join">Sign up here</a>
				</p>
			</Nav>

			<section>
				<LoginGoogle />
			</section>

			<Separator>
				<span>or</span>
			</Separator>

			<LoginForm />
		</Inner>
	</Outer>
);

export default Login;
