import React, { Component } from 'react';
import ZipfGraph from './components/ZipfGraph';
import './App.css';
import MobyDick from './MobyDick.js'

class App extends Component {
  state = {
    text: "type or paste some text here to check its zipfiness...\n"+MobyDick
  }

  handleTextChange(e){
    this.setState({
      text: e.target.value
    });
  }

  handleClear(e){
    this.setState({
      text: ""
    });
  }

  render() {
    const {text} = this.state;
    return (
      <div className="App">
        <div className="App__header">
          <h1 className="App__title">Zipf-y</h1>
        </div>
        <div className="App__textarea-container">
          <textarea value={text} onChange={this.handleTextChange.bind(this)} />
          <button onClick={this.handleClear.bind(this)}>Clear</button>
        </div>
        <ZipfGraph text={text} />
        <div className="App__note">
          <strong>Note:</strong> yellow dots show expected frequency of the n<sup>th</sup> most frequent word, assuming <em>frequency = 1/n</em>
        </div>
        <div className="App__credits">
          inspired by vsauce's <a href="https://www.youtube.com/watch?v=fCn8zs912OE" target="_blank">the zipf mystery video</a><br/>
          see the <a href="https://github.com/cborchert/zipfy" target="_blank">github repo</a><br/>
          created by: <a href="https://cborchert.com" target="_blank">chris borchert</a><br/>
        </div>
      </div>
    );
  }
}

export default App;
