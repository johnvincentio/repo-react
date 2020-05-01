//

import React from 'react';

import { v4 as uuidv4 } from 'uuid';

import Box from './Box';
import BoxForm from './BoxForm';

class BoxList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			boxlist: [{ width: `150`, height: `180`, color: `green`, id: uuidv4() }]
		}
	}

	handleAdd = box => {
		// console.log('handleAdd; box ', box);
		this.setState(prevState => {
			const boxlist = [ ...prevState.boxlist, { ...box, id: uuidv4() }];
			// console.log('boxlist ', boxlist);
			return { boxlist };
		});
	}

	handleRemove = id => {
		// console.log('handleRemove; id ', id);
		this.setState(prevState => {
			const boxlist = prevState.boxlist.filter(item => item.id !== id)
			// console.log('boxlist ', boxlist);
			return { boxlist };
		});
	}

	render() {
		return (
			<div>
				<BoxForm add={this.handleAdd} />
				<div>
					{this.state.boxlist.map(box =>
						<Box key={box.id} box={box} remove={this.handleRemove} />
					)}
				</div>
			</div>
		);
	}
}

export default BoxList;
