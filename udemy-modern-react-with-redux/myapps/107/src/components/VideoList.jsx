//

import React from 'react';
import PropTypes from 'prop-types';
import ImageCard from './ImageCard';

import './VideoList.scss';

const VideoList = (props) => {
	const images = props.images.map((image) => (
		<ImageCard key={image.id} image={image} />
	));
	return (
		<div className="video-list">{images}</div>
	)
}

VideoList.propTypes = {
	images: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			urls: PropTypes.shape({
				regular: PropTypes.string.isRequired
			}),
			description: PropTypes.string.isRequired
		}).isRequired,
	).isRequired
};

export default VideoList;
