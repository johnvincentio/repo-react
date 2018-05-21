//

const GoalCardStyles = theme => ({
	container: {
		display: 'flex',
		flexDirection: 'column'
	},
	card: {
		width: '300px',
		// maxWidth: 400,
		margin: '15px',
		position: 'relative'
	},
	cardContent: {
		flex: '1 0 auto',
		padding: '10px!important',
		backgroundColor: theme.palette.primary.main,
		'&:hover': {
			// backgroundColor: theme.palette.secondary.main
			backgroundColor: theme.palette.primary.dark
		}
	},
	firstRow: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	starred: {
		fill: theme.palette.star.dark
	},
	smallIcon: {
		width: 24,
		height: 24,
		color: theme.palette.common.white
	},
	title: {
		color: theme.palette.common.white,
		fontSize: '1.2em',
		textAlign: 'center',
		padding: '1.2em 0 0.2em 0'
	},
	thirdRow: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	fourthRow: {
		display: 'flex',
		justifyContent: 'center'
	},

	expand: {
		transform: 'rotate(0deg)',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: 'rotate(180deg)'
	}
});

export default GoalCardStyles;
