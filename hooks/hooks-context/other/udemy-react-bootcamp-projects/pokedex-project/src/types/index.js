//

import PropTypes from 'prop-types';

/*
* Describe data item
*/
export const dataItemType = PropTypes.shape({
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	baseExperience: PropTypes.number
});

export const dataType = PropTypes.arrayOf(dataItemType.isRequired);
