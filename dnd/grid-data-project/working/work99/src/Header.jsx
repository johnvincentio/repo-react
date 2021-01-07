

/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import styled from 'styled-components';

// const Container = styled.div`
//   border: 1px solid lightgrey;
//   border-radius: 2px;
//   padding: 8px;
//   margin-bottom: 8px;
// 	background-color: ${props => (props.isDragging ? 'lightGreen' : 'white')};
// 	display: flex;
// `;

const Container = styled.div`
  margin: 8px;
  border: 1px solid brown;
	border-radius: 2px;
	display: flex;

	margin-bottom: 8px;
	padding: 8px;
`;

const Item = styled.div`
	border: 1px solid lightblue;
	border-radius: 2px;
	width: ${props => props.width};
`;

// const Handle = styled.div`
//   width: 20px;
//   height: 20px;
//   background-color: blue;
//   border-radius: 4px;
//   margin-right: 8px;
// `;

export default class Header extends React.Component {

	render() {
		const { header } = this.props;
		return (
			<Container>
				{/* <Handle /> */}
				{header.map(item => {
					console.log('item ', item);
					return (
						<Item key={item.id} width={item.width}>
							{item.title}
						</Item>
					);
				})}
			</Container>
		);
	}
}

/*
<Item width={info.content.width}>
	{info.content.title}
</Item>
<Item width={info.status.width}>
	{info.status.title}
</Item>
<Item width={info.estimate.width}>
	{info.estimate.title}
</Item>
*/
