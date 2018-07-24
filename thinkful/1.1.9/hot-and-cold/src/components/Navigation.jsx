//

import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

export const Nav = styled.nav`
	position: relative;
	height: 10%;
	padding: 1em;
`;

export const Li = styled.li`
	text-transform: uppercase;
	font-weight: 700;
	font-size: 1.2em;

	&:first-child {
		float: left;
	}
	&:last-child {
		float: right;
	}
`;

export const Button = styled.button`
	color: #fff;
	cursor: pointer;
	border: 0;
	margin: 0;
	padding: 0;
	background: #1f253d;
	font-size: 1.2em;
`;

export const Title = styled.h1`
	font-weight: 900;
	font-size: 3em;
	padding: 0.8em;
	color: #fff;
`;

export default function Navigation(props) {
	console.log('Navigation 99');
	return (
		<header>
			<Nav>
				<ul className="clearfix">
					<Li>
						<Button onClick={props.toggleHelp}>What?</Button>
					</Li>
					<Li>
						<Button onClick={props.toggleHelp}>+ New Game</Button>
					</Li>
				</ul>
			</Nav>
			<Title>HOT or COLD</Title>
		</header>
	);
}

Navigation.propTypes = {
	toggleHelp: PropTypes.func.isRequired
};
