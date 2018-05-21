//

import React from 'react';

import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import SignedInRoute from './SignedInRoute';

import HomeMain from '../components/containers/HomeMain';

import MemberMain from '../components/containers/MemberMain';

import Logout from '../components/login/Logout';

import Test3 from '../components/Test3';
import TestForm from '../components/TestForm';

import Test1Dialog from '../components/main/dialogs/Test1Dialog';

const AppRoutes = () => (
	<Router>
		<Switch>
			<Route exact path="/" render={props => <HomeMain datatype="home" {...props} />} />

			<SignedInRoute path="/signin" render={props => <HomeMain datatype="login" {...props} />} />
			<Route path="/signout" render={props => <Logout datatype="signout" {...props} />} />

			<Route exact path="/join" render={props => <HomeMain datatype="register" {...props} />} />
			<Route path="/join/:param" render={props => <HomeMain datatype="register" {...props} />} />
			<Route path="/user/register/:param/:param2" render={props => <HomeMain datatype="confirmation" {...props} />} />
			<Route
				path="/user/registered/success"
				render={props => <HomeMain datatype="confirmation-success" {...props} />}
			/>
			<Route path="/user/registered/failed" render={props => <HomeMain datatype="confirmation-failed" {...props} />} />

			<Route exact path="/reset-password" render={props => <HomeMain datatype="reset-password" {...props} />} />
			<Route
				exact
				path="/user/reset/update/:param/:param2"
				render={props => <HomeMain datatype="change-password" {...props} />}
			/>
			<Route
				path="/reset-password-confirmation"
				render={props => <HomeMain datatype="reset-password-confirmation" {...props} />}
			/>
			<Route
				path="/change-password-failed"
				render={props => <HomeMain datatype="change-password-failed" {...props} />}
			/>
			<Route
				exact
				path="/change-password-confirmation-success"
				render={props => <HomeMain datatype="change-password-confirmation-success" {...props} />}
			/>

			<Route path="/privacy-policy" render={props => <HomeMain datatype="privacy" {...props} />} />
			<Route path="/terms-of-service" render={props => <HomeMain datatype="terms" {...props} />} />

			<Route path="/contact" render={props => <HomeMain datatype="contact" {...props} />} />
			<Route path="/contact-confirmation" render={props => <HomeMain datatype="contact-confirmation" {...props} />} />

			<Redirect exact from="/dashboard" to="/starred" />
			<PrivateRoute path="/starred" render={props => <MemberMain datatype="starred" {...props} />} />

			<Redirect exact from="/calendar" to="/calendar/all" />
			<PrivateRoute path="/calendar/:param" render={props => <MemberMain datatype="calendar" {...props} />} />

			<PrivateRoute path="/goals" render={props => <MemberMain datatype="goals" {...props} />} />
			<PrivateRoute path="/goal/:param" render={props => <MemberMain datatype="goal" {...props} />} />

			<PrivateRoute path="/projects" render={props => <MemberMain datatype="projects" {...props} />} />
			<PrivateRoute path="/project/:param" render={props => <MemberMain datatype="project" {...props} />} />

			<Redirect exact from="/tasks" to="/tasks/scheduled" />
			<PrivateRoute path="/tasks/:param" render={props => <MemberMain datatype="tasks" {...props} />} />

			<PrivateRoute path="/task/:param" render={props => <MemberMain datatype="task" {...props} />} />

			<PrivateRoute path="/tags" render={props => <MemberMain datatype="tags" {...props} />} />
			<PrivateRoute path="/tag/:param" render={props => <MemberMain datatype="tags" {...props} />} />

			<Redirect exact from="/status" to="/status/started" />
			<PrivateRoute path="/status/:param" render={props => <MemberMain datatype="status" {...props} />} />

			<Route exact path="/main" render={props => <MemberMain datatype="main" {...props} />} />

			<Route path="/test3" component={Test3} />

			<Route path="/testform" component={TestForm} />

			<Route path="/test1Dialog" component={Test1Dialog} />

			<Redirect to="/" />
		</Switch>
	</Router>
);

export default AppRoutes;
