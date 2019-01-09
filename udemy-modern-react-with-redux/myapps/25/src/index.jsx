//

import React from 'react';
import ReactDOM from 'react-dom';

import faker from 'faker';

import CommentDetail from './CommentDetail';
import ApprovalCard from './ApprovalCard';

const data = [
	{ id: 0, author: 'Sam', timeAgo: 'Today at 6:00pm', content: 'Blog post' },
	{ id: 1, author: 'John', timeAgo: 'Today at midnight', content: 'Anything' }
];

const App = () => {

	const details = data.map(item => (
		<div key={`tag-${item.id}`}>
			<ApprovalCard>
				<CommentDetail
					author={item.author}
					avatar={faker.image.avatar()}
					timeAgo={item.timeAgo}
					content={item.content}
				/>
			</ApprovalCard>
		</div>
	));
	return (
		<div className="ui container comments">
			<ApprovalCard>
				<div>
					<h4>Warning</h4>
					Are you sure you want to do this?
				</div>
			</ApprovalCard>
			{details}
		</div>
	);
}


/*
const Segment = (props) => (
	<div className="ui placeholder segment">{props.children}</div>
);

const App2 = () => {
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
				<h4 className="ui header">For Your Information</h4>
				<p>
					Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
				</p>
			</Segment>
		</div>
	);
}
*/

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<App />,
		document.getElementById('root')
	);
});
