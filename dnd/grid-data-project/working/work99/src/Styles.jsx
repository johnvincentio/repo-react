
import styled from 'styled-components';

export const TabularContainer = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid green;
	margin: 5px;
`;

export const HeaderContainer = styled.div`
  margin: 8px;
  border: 1px solid brown;
	border-radius: 2px;
	display: flex;

	margin-bottom: 8px;
	padding: 8px;
`;

export const HeaderItem = styled.div`
	border: 1px solid lightblue;
	border-radius: 2px;
	width: ${props => props.width};
	margin-right: 8px;
	// transition: background-color 0.2s ease;
	// background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
`;

export const HeaderSpacerItem = styled.div`
	width: 20px;
`;

export const TabularListDropContainer = styled.div`
	border: 1px solid brown;
	margin: 8px;
	padding: 8px;
	transition: background-color 0.2s ease;
	background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
`;

export const DraggableContainer = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
	padding: 6px 0;
  margin-bottom: 8px;
	background-color: ${props => (props.isDragging ? 'lightGreen' : 'white')};
	display: flex;
`;

export const DraggableHandle = styled.div`
	width: 20px;
	height: 20px;
	background-color: orange;
	border-radius: 4px;
`;

export const DraggableItem = styled.div`
	border: 1px solid lightblue;
	border-radius: 2px;
	width: ${props => props.width}px;
	margin-left: 4px;
`;
