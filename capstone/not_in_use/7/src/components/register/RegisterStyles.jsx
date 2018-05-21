//

import styled from 'styled-components';

import { appTheme } from '../../themes/themes';

export const Title = styled.h2`
	text-align: center;
	margin: 25px 0;
`;

export const Nav = styled.nav`
	text-align: center;
	margin: 25px 0;

	> p {
		@media only screen and (min-width: 595px) {
			margin-top: 5px;
		}
		margin-top: 0px;
	}

	a {
		display: block;
		padding-left: 7px;
		color: ${appTheme.palette.primary.main};
		// color: palette(login, splash);
		text-decoration: none;
		&:hover {
			color: ${appTheme.palette.primary.dark};
			font-size: 103%;
			cursor: pointer;
		}
		@media only screen and (min-width: 595px) {
			display: inline;
		}
	}
`;

export const Separator = styled.section`
	width: 96%;
	max-width: 320px;
	border-top: 1px solid ${appTheme.login.separator};
	// palette(login, separator);
	text-align: center;
	margin: 35px auto 20px auto;
	position: relative;

	span {
		display: inline-block;
		position: absolute;
		top: -12px;
		left: calc(50% - 20px);
		width: 40px;
		text-align: center;
		color: ${appTheme.login.inputText};
		// palette(login, input-text);
		background: ${appTheme.login.base};
		// palette(login);
		font-weight: bold;
		font-size: 13px;
		text-transform: uppercase;
	}
`;

export const Styles = theme => ({
	button: {
		display: 'block',
		textTransform: 'none',
		border: '0',
		fontSize: '14px',
		padding: '12px 20px',
		margin: '12px auto',
		width: '96%',
		maxWidth: '320px',
		color: theme.login.base,
		opacity: '0.9'
	},
	svg: {
		float: 'right',
		width: '20px',
		height: '20px'
	},
	facebookButton: {
		backgroundColor: theme.login.facebook,
		'&:hover': {
			backgroundColor: theme.login.facebookSelected
		}
	},
	facebookSvg: {
		backgroundColor: theme.login.facebook,
		fill: theme.login.base
	},
	googleButton: {
		backgroundColor: theme.login.google,
		'&:hover': {
			backgroundColor: theme.login.googleSelected
		}
	},
	googleSvg: {
		backgroundColor: theme.login.base,
		fill: theme.login.google
	},
	submitButton: {
		textTransform: 'uppercase',
		margin: '12px auto 30px auto'
		// [theme.breakpoints.down('xs')]: {
		// 	margin: '12px auto 30px auto'
		// }
	},
	FormControl: {
		margin: theme.spacing.unit,
		minWidth: 120,
		width: '96%',
		maxWidth: '320px'
	},
	form: {
		textAlign: 'center'
	}
});

// export const Anchor = styled(Button)`
// 	display: block !important;
// 	color: ${appTheme.palette.primary.main} !important;
// 	background-color: ${appTheme.text.home} !important;
// 	text-transform: none !important;
// 	font-size: 1em !important;
// 	// font-weight: 500 !important;
// 	&:hover,
// 	&:focus {
// 		cursor: pointer;
// 		font-size: 1em !important;
// 		font-weight: 500 !important;
// 		color: ${appTheme.palette.primary.dark} !important;
// 		background-color: ${appTheme.palette.grey.light} !important;
// 	}
// 	@media only screen and (min-width: 595px) {
// 		display: inline !important;
// 	}
// `;

// export const Title = styled.h2`
// 	text-align: center;
// 	margin: 25px 0;
// 	font-weight: bold;
// 	font-size: 1.5em;
// 	line-height: 1.5em;
// `;

// export const Styles = theme => ({
// 	jvbutton: {
// 		color: theme.palette.primary.main,
// 		backgroundColor: theme.text.home,
// 		textTransform: 'none'
// 	}
// });
