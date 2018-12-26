import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import reduxImage from 'assets/mobx.png';

class AppController extends Component {
  static propTypes = {
    root: PropTypes.string.isRequired,
  };
  
  render() {
    return (
      <div>
        <img src={reduxImage} height="100" width="100"/>
        <p>Comming soon</p>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AppController);