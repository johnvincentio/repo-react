import React from "react";
import styled from '@emotion/styled'

const Container = styled.div`
width:100px;
box-shadow: 1px 1px 3px #888888;
display:flex;
padding:5px;
`;

export default props => (
	<Container>
		{props.children}
	</Container>
);
