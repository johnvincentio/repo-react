//

import styled from 'styled-components';

import { appTheme } from '../../themes/themes';

export const Container = styled.footer`
	background-color: ${appTheme.palette.primary.main};
	display: flex;
	flex-direction: row;
	justify-content: center;
	padding: 10px 0px;
`;

export const Anchor = styled.a`
	color: ${appTheme.text.home};
	text-decoration: none;
	&:hover: {
		color: ${appTheme.anchor.selected};
		cursor: pointer;
	}
`;

export const Styles = theme => ({
	button: {
		textTransform: 'none',
		color: theme.text.home
	}
});
