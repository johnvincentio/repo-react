//

import React from 'react';
import PropTypes from 'prop-types';

const ImageList = (props) => {
	console.log('props.images ', props.images);
	const images = props.images.map(({ id, urls, description }) => (
		<img key={id} src={urls.regular} alt={description} />
	));
	return (
		<div>{images}</div>
	)
}

ImageList.propTypes = {
	images: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			urls: PropTypes.shape({
				regular: PropTypes.string.isRequired
			})
		}).isRequired,
	).isRequired
};

export default ImageList;
