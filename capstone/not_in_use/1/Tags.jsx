
import React from 'react';
import PropTypes from 'prop-types';
import { WithContext as ReactTags } from 'react-tag-input';

export default class Tags extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tags: [{ id: 1, text: 'Thailand' }, { id: 2, text: 'India' }],
			suggestions: ['UK', 'US', 'Canada', 'India', 'Thailand'],
		};
		this.handleDelete = this.handleDelete.bind(this);
		this.handleAddition = this.handleAddition.bind(this);
		this.handleDrag = this.handleDrag.bind(this);
	}

	handleDelete(i) {
		const { tags } = this.state;
		tags.splice(i, 1);
		this.setState({ tags });
	}

	handleAddition(tag) {
		const { tags } = this.state;
		tags.push({
			id: tags.length + 1,
			text: tag,
		});
		this.setState({ tags });
	}

	handleDrag(tag, currPos, newPos) {
		const { tags } = this.state;
		tags.splice(currPos, 1);
		tags.splice(newPos, 0, tag);
		this.setState({ tags });
	}

	render() {
		const { tags, suggestions } = this.state;
		return (
			<div>
				<ReactTags
					tags={tags}
					suggestions={suggestions}
					// minQueryLength={1}
					autocomplete
					handleDelete={this.handleDelete}
					handleAddition={this.handleAddition}
					handleDrag={this.handleDrag}
				/>
			</div>
		);
	}
}

Tags.propTypes = {
	name: PropTypes.string.isRequired,

	selectedOption: PropTypes.string,
	submit: PropTypes.func.isRequired,
	options: PropTypes.arrayOf(	// eslint-disable-line function-paren-newline
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			text: PropTypes.string.isRequired,
		}).isRequired).isRequired,
};

Tags.defaultProps = {
	className: '',
	selectedOption: '',
};
