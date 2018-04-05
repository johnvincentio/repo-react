import React from "react";
import PropTypes from "prop-types";

import Icon from "../Icon";

const CloseIcon = props => {
	const { cssIcon, cssButton, onClick } = props;
	return (
		<button className={cssButton} onClick={onClick}>
			<Icon name="delete" css={cssIcon} />
		</button>
	);
};

CloseIcon.propTypes = {
	cssIcon: PropTypes.string.isRequired,
	cssButton: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};

export default CloseIcon;
