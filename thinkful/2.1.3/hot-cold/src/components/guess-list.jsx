
import React from 'react';
import { connect } from 'react-redux';

import GuessItem from './guess-item';

export class GuessList extends React.Component {
  constructor(props) {
    super(props);
//    this.addRepository = this.addRepository.bind(this);
  }

  render() {
    const alreadyGuessed = this.props.guessed.map((item) => <GuessItem guess={item} key={item} />);

    return (
      <div className="guessed-list">
        {alreadyGuessed}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  guessed: state.guessed,
});

export default connect(mapStateToProps)(GuessList);
