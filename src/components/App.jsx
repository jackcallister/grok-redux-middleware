import React from 'react';
import { connect } from 'react-redux';
import { triggerDispatch } from '../actions/index';

function mapDispatchToProps(dispatch) {
  return {
    triggerDispatch: function() {
      dispatch(triggerDispatch())
    }
  }
}

class App {

  render() {
    return (
      <main>
        <button onClick={(e) => { this.props.triggerDispatch() }}>Trigger a dispatch</button>
      </main>
    );
  }
}

export default connect(() => { return {} }, mapDispatchToProps)(App)
