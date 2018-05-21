//

import Button from '@material-ui/core/Button';

import styled from 'styled-components';

import { appTheme } from '../../themes/themes';

const { topNavLineHeight } = appTheme;

export const Register = styled(Button)`
	color: ${appTheme.palette.primary.main} !important;
	background-color: ${appTheme.text.home} !important;
	text-transform: uppercase;
	padding: 0.8em 1.7em !important;
	font-size: 1.2em !important;
	font-weight: 700 !important;
	&:hover,
	&:focus {
		cursor: pointer;
		color: ${appTheme.palette.primary.dark} !important;
		background-color: ${appTheme.palette.grey.light} !important;
		boxshadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 20px 31px 3px rgba(0, 0, 0, 0.14),
			0px 8px 38px 7px rgba(0, 0, 0, 0.12) !important;
	}
`;

export const Intro = styled.div`
	color: ${appTheme.text.home} !important;
	line-height: normal;
	text-align: center;
	font-weight: 300;
	padding: 4em 0;
	@media screen and (min-width: 580px) {
		padding: 6em 0;
	}
`;

export const Title = styled.h1`
	font-size: 2.3rem;
	font-weight: bold;
	// text-transform: uppercase;
	color: ${appTheme.text.home} !important;
	@media screen and (min-width: 580px) {
		font-size: 3.4rem;
	}
`;

export const Info = styled.p`
	margin-top: 0.9em;
	font-size: 1.2rem;
	font-weight: 300;
	@media screen and (min-width: 580px) {
		font-size: 1.4rem;
	}
`;

export const Started = styled.p`
	margin-top: 3.3em;
`;

export const Features = styled.ul`
	display: flex;
	flex-wrap: wrap;
	background-color: ${appTheme.text.home} !important;
	list-style-type: none;
	@media screen and (min-width: 580px) {
		margin-top: 10px;
		padding-top: 25px;
	}
`;

export const Feature = styled.li`
	text-align: center;
	flex-basis: 100%;
	padding: 10px;
	&:last-child {
		margin-bottom: 10px;
	}
	@media screen and (min-width: 580px) {
		flex-basis: 50%;
	}
`;

export const Header = styled.h1`
	color: ${appTheme.palette.primary.main} !important;
	font-size: 1.6em;
	text-align: center;
	vertical-align: middle;
`;

export const Text = styled.p`
	padding: 1.3em 0.3em 0.2em 0.3em;
	text-align: center;
	color: ${appTheme.text.main} !important;
`;

export const HomeStyles = theme => ({
	outer: {
		position: 'relative',
		marginTop: `calc(2 * ${topNavLineHeight}px - 1px)`,
		zIndex: '-100',
		width: '100%',
		margin: '0 auto',
		lineHeight: '1.5em',
		backgroundColor: 'white'
	},
	icon: {
		fill: theme.palette.primary.main,
		height: '45px',
		width: '45px',
		verticalAlign: 'middle',
		paddingRight: '5px'
	}
});

// export const StyledButton = styled(Button)`
// 	background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
// 	border-radius: 3px;
// 	border: 0;
// 	color: white;
// 	height: 48px;
// 	padding: 0 30px;
// 	box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
// `;
