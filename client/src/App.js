import React, { Component } from 'react';
import Quote from './Quote';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Office Quotes</h1>
          <p className="App-intro">.. even the random ones</p>
        </header>
        <Quote />
      </div>
    );
  }
}

export default App;
