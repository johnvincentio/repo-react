//

import React from 'react';
import PropTypes from 'prop-types';

const CommentDetail = ({ author, avatar, timeAgo, content }) => (
	<div className="comment">
		<a href="/" className="avatar">
			<img alt="avatar" src={avatar} />
		</a>
		<div className="content">
			<a href="/" className="author">
				{author}
			</a>
			<div className="metadata">
				<span className="date">{timeAgo}</span>
			</div>
			<div className="text">{content}</div>
		</div>
	</div>
);


CommentDetail.propTypes = {
	author: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired,
	timeAgo: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired
};

export default CommentDetail;

/*
CommentDetail.propTypes = {
	data: PropTypes.shape({
		author: PropTypes.string,
		date: PropTypes.string,
		time: PropTypes.string
	}).isRequired
};
*/

/*
    const Segment = (props) = {
        return (
            <div className="ui placeholder segment">
                {props.children}
            </div>
        );
    }

    const App = () => {
        return (
            <div>
                <Segment>
                    <div className="ui icon header">
                        <i className="pdf file outline icon"></i>
                        No documents are listed for this customer.
                    </div>
                    <div className="ui primary button">Add Document</div>
                </Segment>
                <Segment>
                    <h4 class="ui header">For Your Information</h4>
                    <p>
                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
                    </p>
                </Segment>
            </div>
        );
		}
*/
