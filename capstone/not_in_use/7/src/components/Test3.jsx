import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';

// import './Test3a.css';

// import classes from './Test3.scss';
// import classes2 from './Test3a.css';
// import classes3 from './fred.css';

import { goalsType } from '../types';

import * as actions from '../redux/actions/';

// console.log('classes ', classes);
// console.log('classes2 ', classes2);
// console.log('classes3 ', classes3);

class Test3 extends React.Component {
	constructor(props) {
		super(props);
		console.log('--- Test3; constructor, props ', props);
	}

	render() {
		const { goals } = this.props;
		console.log('--- Test3::render, goals ', goals);
		return (
			<Fragment>
				<Button variant="raised" color="primary">
					Primary
				</Button>
				<Button variant="raised" color="secondary">
					Primary
				</Button>
				<br />
				{/* <div className={classes.jv}>Something</div> */}
				<div className="jv1">Something</div>
			</Fragment>
		);
	}
}

Test3.propTypes = {
	goals: goalsType.isRequired // eslint-disable-line react/no-typos
};

const mapStateToProps = state => ({
	goals: state.user.goals
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Test3);

/*
  componentDidMount() {
    let links = document.getElementsByClassName('gallery');
    $('.gallery').unbind('click').bind('click', event => {
      blueimp.Gallery(links, {
        index: event.currentTarget,
        event: event
      });
    });
	}
*/
