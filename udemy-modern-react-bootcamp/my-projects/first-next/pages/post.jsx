
/*
import React from 'react';

const Post = ({ id }) => (
	<h1>Post Page #{id} </h1>
);

Post.getInitialProps = async ({ query }) => {
	console.log('query ', query);
	return query;
}

export default Post;
*/

import React from 'react';
import { withRouter } from 'next/router';

const Post = props => (
	<h1>Post Page #{props.router.query.id} </h1>
);

Post.getInitialProps = async ({ query }) => {
	// console.log('query ', query);
	return query;
}

export default withRouter(Post);
