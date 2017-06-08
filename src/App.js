import React, { Component } from 'react';
import Slider from 'components/Slider';
import ImageOutputArea from 'components/ImageOutputArea';
import 'styles/App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {};
    this.handleSliderChange = this.handleSliderChange.bind(this);
  }

  handleSliderChange(event) {
    const element = event.target.getAttribute('id');
    this.setState({
      value: event.target.value,
      [element]: {
        value: event.target.value
      }
    });
  }

  render() {
    return (
      <div className="App">
        <h3> This will take an image and do image processing things to it</h3>
        <div>{this.state.value}</div>
        <Slider
          onChange={this.handleSliderChange}
          step="1"
          min="0"
          max="255"
          defaultValue={this.state.value}
        />
        <ImageOutputArea></ImageOutputArea>
      </div>
    );
  }
}

export default App;
