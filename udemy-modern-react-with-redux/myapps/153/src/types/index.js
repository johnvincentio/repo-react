
import PropTypes from 'prop-types';

export const postType = PropTypes.shape({
	body: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	userId: PropTypes.number.isRequired
});

export const postsType = PropTypes.arrayOf(postType.isRequired);
