import React, { Component } from 'react';
import ZipfGraph from './components/ZipfGraph';
import './App.css';

class App extends Component {
  state = {
    text: "type or paste some text here to check its zipfiness..."
  }

  handleTextChange(e){
    this.setState({
      text: e.target.value
    });
  }

  render() {
    const {text} = this.state;
    return (
      <div className="App">
        <textarea value={text} onChange={this.handleTextChange.bind(this)} />
        <ZipfGraph text={text} />
      </div>
    );
  }
}

export default App;
