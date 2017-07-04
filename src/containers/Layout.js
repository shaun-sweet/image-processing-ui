import React, { Component } from 'react'
import SliderControls from 'components/SliderControls';
import ImageOutputArea from 'components/ImageOutputArea';
import ColorspaceLabels from 'components/ColorspaceLabels';
import RenderButton from 'components/RenderButton';
import UploadFileButton from 'components/UploadFileButton';
import Dropzone from 'react-dropzone'
import endPointUrl from 'config/environment';

import 'styles/Layout.css';

export default class Layout extends Component {

  constructor() {
    super();
    this.state = {
      accept: '',
      files: [],
      dropzoneActive: false,
      hasBeenRendered: false,
      formData: {
        "c1min": 0,
        "c1max": 100,
        "c2min": 0,
        "c2max": 100,
        "c3min": 0,
        "c3max": 100
      }
    };
    this._handleSliderChange = this._handleSliderChange.bind(this);
    this._handleImageUpload = this._handleImageUpload.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  onDragEnter() {
    this.setState({
      dropzoneActive: true
    });
  }

  onDragLeave() {
    this.setState({
      dropzoneActive: false
    });
  }

  onDrop(files) {
    this.setState({
      files,
      dropzoneActive: false
    });
  }

  applyMimeTypes(event) {
    this.setState({
      accept: event.target.value
    });
  }

  _handleSliderChange(event, slider) {
    var val = event.target.value;
    var result = (val === "");
    console.log(result);
    this.setState({
      formData: {
        ...this.state.formData,
        [slider]:  result ? "0" : val
      }
    })
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
    const { accept, files, dropzoneActive } = this.state;
    const overlayStyle = {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      padding: '2.5em 0',
      background: 'rgba(0,0,0,0.5)',
      textAlign: 'center',
      color: '#fff'
    };
    return (
      <Dropzone
        disableClick
        style={{}}
        accept={accept}
        multiple={false}
        onDrop={this.onDrop.bind(this)}
        onDragEnter={this.onDragEnter.bind(this)}
        onDragLeave={this.onDragLeave.bind(this)}
      >
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
              formState={this.state.formData}
            />
            <UploadFileButton />
            { dropzoneActive && <div style={overlayStyle}>Drop files...</div> }
            <div>
              <h2>Dropped files</h2>
              <ul>
                {
                  files.map(f => <li>{f.name} - {f.size} bytes</li>)
                }
              </ul>
            </div>
            <RenderButton />
          </form>
          <ImageOutputArea
            src={this.state.imgUrl}
          />
        </div>
      </Dropzone>
    );
  }
}
