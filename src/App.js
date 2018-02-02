import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppLayout from 'AppLayout/AppLayout';

// we'll keep this component clean for possible further configs
export default class App extends Component {
  render() {
   return (
     <Router>
       <AppLayout />
     </Router>
   );
  }
}