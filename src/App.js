import React, { Component } from 'react';
import SliderControls from 'components/SliderControls';
import ImageOutputArea from 'components/ImageOutputArea';
import ColorSpaceLabels from 'components/ColorSpaceLabels';
import 'styles/App.css';
import endPointUrl from 'environment';

class App extends Component {

  constructor() {
    super();
    this.state = {};
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this._handleImageUpload = this._handleImageUpload.bind(this);
  }

  handleSliderChange(event) {
    const element = event.target.getAttribute('id');
    this.setState({
      [element]: {
        value: event.target.value
      }
    });
  }

  _handleImageUpload(e) {
    var _this = this;
    e.preventDefault();
    fetch(endPointUrl+'upload', {
    	method: 'post',
    	body: new FormData(document.getElementById('uploadForm'))
    }).then( response => response.text()
      .then( response => _this.setState({ imgUrl: response }) )
    );
  }

  render() {
    return (
      <div className="App">
        <h3> This will take an image and do image processing things to it</h3>
        <div>{this.state.value}</div>

        <form ref='uploadForm'
          onSubmit={this._handleImageUpload}
          style={{display: 'flex',
          flexFlow: 'column'}}
          id='uploadForm'
          method='post'
          encType="multipart/form-data">
          <ColorSpaceLabels />
          <SliderControls
            min="0"
            max="100"
            onChange={this._handleSliderChange}
          />
          <input type="file" name="uploadedImage" />
          <input type='submit' value='Upload!' />
        </form>
        <ImageOutputArea
          src={this.state.imgUrl}
        />
      </div>
    );
  }
}

export default App;
