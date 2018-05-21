//

const SidebarStyles = theme => {
	console.log('SidebarStyles; theme ', theme);
	return {
		root: {
			width: '100%',
			maxWidth: 360,
			backgroundColor: theme.palette.background.paper
		},
		nested: {
			paddingLeft: theme.spacing.unit * 4
		},
		formControl: {
			// margin: theme.spacing.unit
		},
		search: {
			paddingTop: '0px',
			paddingBottom: '20px'
			// margin: theme.spacing.unit
		},
		inputLabelFocused: {
			color: '#998643'
		}
		// selected: {
		// 	backgroundColor: theme.palette.primary.main,
		// 	color: theme.palette.common.white
		// }
	};
};

export default SidebarStyles;
