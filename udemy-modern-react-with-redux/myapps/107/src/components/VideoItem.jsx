//

import React from 'react';

import { videoType } from '../types';

class VideoItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = { spans: 0 };
		this.imageRef = React.createRef();
	}

	// componentDidMount() {
	// 	this.imageRef.current.addEventListener('load', this.setSpans);
	// }

	// setSpans = () => {
	// 	const { clientHeight } = this.imageRef.current;
	// 	const spans = Math.ceil(clientHeight / 10);
	// 	this.setState({ spans });
	// }

	render() {
		console.log('video ', this.props.video);
		// const { urls, description } = this.props.video;
		// return (
		// 	<div style={{ gridRowEnd: `span ${this.state.spans}` }}>
		// 		<img ref={this.imageRef} alt={description} src={urls.regular} />
		// 	</div>
		// );
		return (
			<div>VideoItem...</div>
		)
	}
}

VideoItem.propTypes = {
	video: videoType.isRequired // eslint-disable-line react/no-typos
};

export default VideoItem;
