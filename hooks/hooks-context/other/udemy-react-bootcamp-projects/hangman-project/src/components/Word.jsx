//

import React from 'react';
import PropTypes from 'prop-types';

const Word = (props) => {
	const { currentWord } = props;
	// console.log('Word::render(); currentWord ', currentWord);
	return (
		<div className="word">
			{currentWord.map(item => (
				<div key={item.id} className="word--key">
					{item.value ? item.key : ''}
				</div>
			))}
		</div>
	);
}

Word.propTypes = {
	currentWord: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string.isRequired,
			value: PropTypes.bool.isRequired
		})
	).isRequired
}

export default Word;
