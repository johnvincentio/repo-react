
import React from 'react';
import PropTypes from 'prop-types';

export default class TextField extends React.Component {
	constructor(props) {	// eslint-disable-line no-useless-constructor
		super(props);
		this.state = {
			textFieldValue: this.props.value,
			// isMaxLengthExceeded: false,
		};
		// console.log('--- TextField::constructor ', props);
		// this.onClickSelectGoal = this.onClickSelectGoal.bind(this);
	}
	// onClickSelectGoal(item) {
	// 	console.log('--- onClickSelectGoal ', item);
	// }
	/*
	{...props}
	*/
	render() {
		return (
			<div className="text-field-input">
				<input
					className="text-field-input"
					type="text"
					value={this.state.textFieldValue}
					onChange={this.handleInputValue}
					disabled={isDisabled}
					readOnly={isReadOnly}
					ref={inputRef}
					required
					onKeyPress={this.handleKeyPress}
					placeholder="Enter your Guess"
					maxLength="3"
				/>
				<button type="submit">
					Add Todo
				</button>
			</div>

		);
	}
}

TextField.propTypes = {
	value: PropTypes.string,
	placeholder: PropTypes.string,
	maxContentLength: PropTypes.number,
	isDisabled: PropTypes.bool,
	isError: PropTypes.bool,
	isReadOnly: PropTypes.bool,
	errorMessage: PropTypes.string,
	onChange: PropTypes.func,
	inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	id: PropTypes.string,
};

TextField.defaultProps = {
	isDisabled: false,
	isError: false,
	isReadOnly: false,
	maxContentLength: 0,
	errorMessage: '',
	placeholder: null,
	onChange: null,
	inputRef: null,
	value: '',
	className: '',
	id: '',
};

/*
					ref={(input) => {
						this.guessInput = input;
					}}

<div className="guess-form">
	<input
		type="text"
		className="guess-text"
		ref={(input) => {
			this.guessInput = input;
		}}
		required
		onKeyPress={this.handleKeyPress}
		placeholder="Enter your Guess"
		maxLength="3"
	/>
</div>
*/

/*
var TextInput = React.createClass({
  handleInput: function() {
    var input = React.findDOMNode(this.refs.userInput)
    this.props.saveInput(input.value)
    input.value = ''
  },
  render: function() {
    var label = this.props.label
    return (
      <div>
        <h3><label for="input-{ label }">{ label }</label></h3>
        <input
          type="text"
          class="form-control"
          id="input-{ label }"
          ref="userInput"
         />
        <button onClick={ this.handleInput }>Save</button>
      </div>
    )
  }
})

var TextField = React.createClass({
  render: function() {
    var label = this.props.label || 'Label'
    var text = this.props.text || 'Nothing yet'
    return (
      <div>
        <h3>{ label }</h3>
        <p>{ text }</p>
      </div>
    )
  }
})

var Form = React.createClass({
  getInitialState: function() {
    return {
      userIsEditing: false,
      favoriteFlavor: 'Vanilla'
    }
  },
  toggleEditing: function() {
    var userIsEditing = !this.state.userIsEditing
    this.setState({
      userIsEditing: userIsEditing
    })
    this.handleSave()
  },
  saveInput: function(input) {
    this.setState({
      favoriteFlavor: input
    })
  },
  render: function() {
    var userIsEditing = this.state.userIsEditing
    if (userIsEditing) {
        return (
          <div>
            <TextInput
              label={ 'Favorite flavor' }
              saveInput={ this.saveInput }
             />
            <button onClick={ this.toggleEditing }>Done</button>
          </div>
        )
    }
    return (
      <div>
        <TextField
          label={ 'Favorite flavor' }
          text={ this.state.favoriteFlavor }
        />
        <button onClick={ this.toggleEditing }>Edit</button>
      </div>

    )
  }
})

React.render(<Form />, document.getElementById('app'))
*/
