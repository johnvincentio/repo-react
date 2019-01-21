//

import React from 'react';
import PropTypes from 'prop-types';

class ImageCard extends React.Component {
	state = {};

	render() {
		console.log('ImageCard, props.image ', this.props.image);
		const { urls, description } = this.props.image;
		return (
			<div>
				<img alt={description} src={urls.regular} />
			</div>
		);
	}
}

ImageCard.propTypes = {
	image: PropTypes.shape({
		id: PropTypes.string.isRequired,
		urls: PropTypes.shape({
			regular: PropTypes.string.isRequired
		}),
		description: PropTypes.string.isRequired
	}).isRequired
};

export default ImageCard;
