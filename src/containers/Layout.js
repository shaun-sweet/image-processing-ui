import React, { Component } from 'react'
import SliderControls from 'components/SliderControls';
import ImageOutputArea from 'components/ImageOutputArea';
import ColorspaceLabels from 'components/ColorspaceLabels';
import RenderButton from 'components/RenderButton';
import UploadFileButton from 'components/UploadFileButton';
import endPointUrl from 'config/environment';

import 'styles/Layout.css';

export default class Layout extends Component {

  constructor() {
    super();
    this.state = {
      hasBeenRendered: false
    };
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

  trackFirstRender() {
    this.setState({hasBeenRendered: true})
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
      <div className="layout">
        <h3>Colorspace Filter</h3>
        <form ref='uploadForm'
          onSubmit={this._handleImageUpload}
          style={{display: 'flex',
          flexFlow: 'column'}}
          id='uploadForm'
          method='post'
          encType="multipart/form-data"
        >
          <ColorspaceLabels onClick={this.trackFirstRender.bind(this)} hasBeenRendered={this.state.hasBeenRendered} />
          <SliderControls
            min="0"
            max="100"
            onChange={this._handleSliderChange}

          />
          <UploadFileButton />
          <RenderButton />
        </form>
        <ImageOutputArea
          src={this.state.imgUrl}
        />
      </div>
    );
  }
}
