
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as utilsUtilities from '../utilities/utils';

class Button extends React.Component {
	constructor(props) {	// eslint-disable-line no-useless-constructor
		super(props);
		console.log('--- Button::constructor ', props);
	}

	getButtonClassNames() {
		const {
			className,
			disabled,
			spinning,
			selected,
		} = this.props;
		return classNames(
			'toolbox-button',
			{
				'toolbox-button--disabled': disabled,
				'toolbox-button--spinning': spinning,
				'toolbox-button--selected': selected,
			},
			className,
		);
	}

	render() {
		const { disabled } = this.props;
		const buttonClassNames = this.getButtonClassNames();
		const extraProps = utilsUtilities.remainingProperties(this.props, Button.propTypes);

		return (
			<button className={buttonClassNames} disabled={disabled} {...extraProps}>
				{this.props.children}
			</button>
		);
	}
}

Button.propTypes = {
	disabled: PropTypes.bool,
	spinning: PropTypes.bool,
	selected: PropTypes.bool,
	className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

Button.defaultProps = {
	disabled: false,
	spinning: false,
	selected: false,
	className: '',
};

export default Button;
