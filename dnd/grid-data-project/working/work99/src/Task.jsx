
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
	display: flex;
`;

const Item = styled.div`
border: 1px solid lightblue;
border-radius: 2px;
width: ${props => props.width};
`;

const obj = {
	content: '200px',
	status: '100px',
	estimate: '80px'
};

export default class Task extends React.Component {
	render() {
		return (
			<Container>
				<Item width={obj.content}>
					{this.props.task.content}
				</Item>
				<Item width={obj.status}>
					{this.props.task.status}
				</Item>
				<Item width={obj.estimate}>
					{this.props.task.estimate}
				</Item>
			</Container>
		);
	}
}
