//

import React from 'react';

import Box from './Box';
import BoxForm from './BoxForm';

class BoxList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			boxlist: []
		}
	}

	handleAdd = box => {
		this.setState(prevState => {
			const boxlist = [ ...prevState.boxlist, box ];
			return { boxlist };
		});
	}

	handleRemove = id => {
		this.setState(prevState => {
			const boxlist = prevState.boxlist.filter(item => item.id !== id)
			return { boxlist };
		});
	}

	render() {
		return (
			<div>
				<BoxForm add={this.handleAdd} />
				<div>
					{this.state.boxlist.map(box =>
						<Box key={box.id} box={box} remove={() => this.handleRemove(box.id)} />
					)}
				</div>
			</div>
		);
	}
}

export default BoxList;
