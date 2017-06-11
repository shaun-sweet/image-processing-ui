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

  componentDidMount() {
    const self = this;
    fetch('http://localhost:3001').then(function(response) {
      return response.json();
    }).then(json => {
      self.setState({res: json});
    })
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

  _handleFormSubmit() {

  }

  _handleImageUpload(e) {

    console.log("image was upload!", e.target.value);
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
        <form ref='uploadForm'
          id='uploadForm'
          action='http://localhost:3001/upload' 
          method='post'
          encType="multipart/form-data">
          <input type="file" name="sampleFile" />
          <input type='submit' value='Upload!' />
        </form>
        <ImageOutputArea>{this.state.res ? this.state.res.test : null}</ImageOutputArea>
      </div>
    );
  }
}

export default App;
