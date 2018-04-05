import React from 'react';

import SidePanel from './sidePanel/SidePanel';
import RightPanel from './rightPanel/RightPanel';

export class CenterPanel extends React.Component {
	constructor(props) {
		super(props);
		console.log('>>> CenterPanel; constructor');
		console.log(props);
		console.log('<<< CenterPanel; constructor');
		this.state = { height: 0 };
	}

	componentDidMount() {
		console.log('CenterPanel::onComponentDidMount');
    // this.setSize(this.props, this.state);
    // document.addEventListener('mouseup', this.onMouseUp);
    // document.addEventListener('mousemove', this.onMouseMove);
    // document.addEventListener('touchmove', this.onTouchMove);
  }

  componentWillUnmount() {
		console.log('CenterPanel::onComponentWillUnmount');
    // document.removeEventListener('mouseup', this.onMouseUp);
    // document.removeEventListener('mousemove', this.onMouseMove);
    // document.removeEventListener('touchmove', this.onTouchMove);
	}

	render() {
		return (
			<div className="page-container">
				<SidePanel height="35" />
				<RightPanel />
			</div>
		);
	}
}

export default CenterPanel;
