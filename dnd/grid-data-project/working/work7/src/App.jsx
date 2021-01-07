
import React from 'react';

import styled from 'styled-components';

import TabularHeader from './TabularHeader';
import TabularList from './TabularList';

import initialData from './initial-data';

const TabularContainer = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid green;
	margin: 5px;
`;

class App extends React.Component {
	state = initialData;

	onHeaderUpdate = headers => {
		console.log('App::onHeaderUpdate, headers ', headers);
		const newState = { ...this.state, headers };
		console.log('newState ', newState);
		this.setState(newState);
	}

	onWidthUpdate = (delta, index)  => {
		console.log('App::onWidthUpdate; delta ', delta, ' index ', index);
		const newHeaders = JSON.parse(JSON.stringify(this.state.headers));
		const { width } = newHeaders[index];
		newHeaders[index].width = width + delta.width;
		const newState = { ...this.state, headers: newHeaders };
		console.log('newState ', newState);
		this.setState(newState);
	}

	onUpdateList = list => {
		console.log('App::onUpdateList, list ', list);
		const newState = { ...this.state, list };
		console.log('newState ', newState);
		this.setState(newState);
	}

	render() {
		console.log('App::render()');
		return (
			<TabularContainer>
				<TabularHeader
					list={this.state.headers}
					onHeaderUpdate={this.onHeaderUpdate}
					onWidthUpdate={this.onWidthUpdate}
				/>
				<TabularList
					list={this.state.list}
					headers={this.state.headers}
					onUpdate={this.onUpdateList}
				/>
			</TabularContainer>
		);
	}
}

export default App;
