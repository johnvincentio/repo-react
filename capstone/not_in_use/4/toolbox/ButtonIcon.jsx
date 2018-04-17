
import React from 'react';
import PropTypes from 'prop-types';

import Icon from './Icon';

const ButtonIcon = ({
	svgName,
	cssIcon,
	cssButton,
	onClick,
}) => (

	<button className={`buttonIcon ${cssButton}`} onClick={onClick}>
		<Icon name={svgName} css={cssIcon} />
	</button>
);


ButtonIcon.propTypes = {
	svgName: PropTypes.string.isRequired,
	cssIcon: PropTypes.string.isRequired,
	cssButton: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default ButtonIcon;
