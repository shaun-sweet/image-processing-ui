import React, { Component } from 'react';
import Slider from 'components/Slider';
import ImageOutputArea from 'components/ImageOutputArea';
import 'styles/App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {};
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
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

  _handleFormSubmit(e) {
    console.log('submitting');
    e.preventDefault();
    fetch('http://localhost:3001/upload', {
    	method: 'post',
    	body: new FormData(document.getElementById('uploadForm'))
    }).then(function (response) {
      console.log(response);
      return response;
    });
  }

  _handleImageUpload(e) {

    console.log("image was upload!", e.target.value);
  }

  render() {
    return (
      <div className="App">
        <h3> This will take an image and do image processing things to it</h3>
        <div>{this.state.value}</div>

        <form ref='uploadForm'
          onSubmit={this._handleFormSubmit}
          style={{display: 'flex',
          flexFlow: 'column'}}
          id='uploadForm'
          method='post'
          encType="multipart/form-data">
          <Slider
            onChange={this.handleSliderChange}
            name="1"
            step="1"
            min="0"
            max="255"
          />
          <Slider
            onChange={this.handleSliderChange}
            name="2"
            step="1"
            min="0"
            max="255"
          />
          <Slider
            onChange={this.handleSliderChange}
            name="3"
            step="1"
            min="0"
            max="255"
          />
          <Slider
            onChange={this.handleSliderChange}
            name="4"
            step="1"
            min="0"
            max="255"
          />
          <Slider
            onChange={this.handleSliderChange}
            name="5"
            step="1"
            min="0"
            max="255"
          />
          <Slider
            onChange={this.handleSliderChange}
            name="6"
            step="1"
            min="0"
            max="255"
          />
          <input type="file" name="sampleFile" />
          <input type='submit' value='Upload!' />
        </form>
        <ImageOutputArea>{this.state.res ? this.state.res.test : null}</ImageOutputArea>
      </div>
    );
  }
}

export default App;
