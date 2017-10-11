
import React from 'react';
import { connect } from 'react-redux';

// eslint-disable-next-line import/no-named-as-default
import GuessForm from './guess-form';
import GuessList from './guess-list';

// eslint-disable-next-line react/prefer-stateless-function
export class Board extends React.Component {
// eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="inner">
        <div>app comment {this.props.comment}</div>
        <GuessForm />
        <GuessList />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  comment: state.comment,
});

export default connect(mapStateToProps)(Board);

/*
  //   onAddSubmit(event) {
  //     event.preventDefault();
  //     console.log(`>>> list-container::onAddSubmit; A name was submitted: `);
  // //        this.state.cards.push(this.state.value);
  //     // const tmp = this.state.cards;
  //     // tmp.push(this.state.value);
  //     //     // tmp.push('zzz');
  //     // this.setState({ cards: tmp });
  //     // console.log(this.state.cards);
  //     console.log('<<< list-container::onAddSubmit');
  //   }
  */
