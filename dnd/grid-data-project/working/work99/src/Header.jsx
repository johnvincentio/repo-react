

/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 8px;
  border: 1px solid brown;
	border-radius: 2px;
	display: flex;
`;

const Item = styled.div`
	border: 1px solid lightblue;
	border-radius: 2px;
	width: ${props => props.width};
`;

// const obj = {
// 	content: '200px',
// 	status: '100px',
// 	estimate: '80px'
// };

export default class Header extends React.Component {

	render() {
		const { info } = this.props;
		return (
			<Container>
				<Item width={info.content.width}>
					{info.content.title}
				</Item>
				<Item width={info.status.width}>
					{info.status.title}
				</Item>
				<Item width={info.estimate.width}>
					{info.estimate.title}
				</Item>
			</Container>
		);
	}
}
