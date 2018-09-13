import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { setActiveOption } from './redux/action-creators'
import Map from './components/map.js'
import Toggle from './components/toggle.js'
import Legend from './components/legend.js'
import { Provider } from 'react-redux'
import configureStore from './store';
import TemporaryDrawer from './components/appBar.js'
import logo from './logo.svg';
import './App.css';


class App extends Component {

  render() {
    return (
      <div className="App">
      {/* <div> <TemporaryDrawer /></div> */}
        <div>
          <Map />
          {/* <Legend /> */}
        </div>
      </div>
    );
  }
}
export default (App);
