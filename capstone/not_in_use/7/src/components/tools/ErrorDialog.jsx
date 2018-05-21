//

import React from 'react';
import PropTypes from 'prop-types';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

class ErrorDialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			close: false
		};
	}

	// handleClickOpen = () => {
	// 	this.setState({ open: true });
	// };

	handleClose = () => {
		this.setState({ close: true });
	};

	render() {
		console.log('ErrorDialog::render(); open ', this.state.close, ' text :', this.props.text, ':');
		const openDialog = this.props.text !== null && !this.state.close;
		console.log('open the dialog ', openDialog);
		return (
			<div>
				{/* <Button onClick={this.handleClickOpen}>Open alert dialog</Button> */}
				<Dialog
					open={openDialog}
					onClose={this.handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">Error</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">{this.props.text}</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary" autoFocus>
							Dismiss
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

ErrorDialog.propTypes = {
	text: PropTypes.string
};

ErrorDialog.defaultProps = {
	text: null
};

export default ErrorDialog;
