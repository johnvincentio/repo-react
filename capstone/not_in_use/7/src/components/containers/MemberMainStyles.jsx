//

const MemberMainStyles = theme => ({
	container: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap'
		// padding: '20px',
		// minHeight: '500px'
		// margin: '10px'
	},
	button: {
		margin: theme.spacing.unit
	},
	mainHeader: {
		display: 'block',
		marginTop: '60px',

		alignItems: 'center',
		padding: '0 8px',
		...theme.mixins.toolbar
	},
	left: {
		float: 'left'
	},
	right: {
		float: 'right'
	}
});

export default MemberMainStyles;
