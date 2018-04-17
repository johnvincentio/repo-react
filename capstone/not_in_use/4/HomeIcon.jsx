import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';

// const styles = theme => ({
// 	root: {
// 		display: 'flex',
// 		justifyContent: 'center',
// 		alignItems: 'flex-end'
// 	},
// 	icon: {
// 		margin: theme.spacing.unit * 2
// 	},
// 	iconHover: {
// 		margin: theme.spacing.unit * 2,
// 		'&:hover': {
// 			color: green[200]
// 		}
// 	}
// });

function HomeIcon(props) {
	return (
		<SvgIcon {...props}>
			<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
		</SvgIcon>
	);
}

export default HomeIcon;
