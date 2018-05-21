//

import { appTheme } from '../../themes/themes';

const { topNavLineHeight } = appTheme;

const LogoIconStyles = theme => ({
	logo: {
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'center'
		},
		fill: theme.palette.common.white,
		height: `${topNavLineHeight}px`,
		width: `${topNavLineHeight}px`,
		margin: '0 0.5em'
	}
});

export default LogoIconStyles;
