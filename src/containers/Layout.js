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
      dropzoneActive: true,
      hasBeenRendered: false,
      formData: {
        "c1min": 0,
        "c1max": 100,
        "c2min": 0,
        "c2max": 100,
        "c3min": 0,
        "c3max": 100
      },
      imgUrls: {
        masked: "",
        mask: ""
      }
    };
    this._handleSliderChange = this._handleSliderChange.bind(this);
    this._renderImage = this._renderImage.bind(this);
    this.renderAttachedFileNames = this.renderAttachedFileNames.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.renderDropZoneIfActive = this.renderDropZoneIfActive.bind(this);
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

  async onDrop(files) {
    await this.setState({
      files,
      dropzoneActive: false
    });
    this._renderImage();
  }

  applyMimeTypes(event) {
    this.setState({
      accept: event.target.value
    });
  }

  _handleSliderChange(event, slider) {
    var val = event.target.value;
    var result = (val === "");
    this.setState({
      formData: {
        ...this.state.formData,
        [slider]:  result ? "0" : val
      }
    });
  }

  renderAttachedFileNames() {
    if (this.state.files) {
      return this.state.files.map(f => <li>{f.name} - {f.size} bytes</li>);
    }
  }

  trackFirstRender() {
    this.setState({hasBeenRendered: true})
  }

  _renderImage() {
    var _this = this;
    let body = new FormData(document.getElementById('uploadForm'))
    let file = this.state.files;
    body.append('uploadedImage', file[0])
    console.log(body);
    fetch(endPointUrl+'upload', {
    	method: 'post',
    	body: body
    }).then( response => response.text()
      .then( response => _this.setState({ imgUrls: JSON.parse(response) }) )
    );
  }

  renderDropZoneIfActive() {
    if (this.state.dropzoneActive) {
      return <div style={overlayStyle}>Drop files...</div>;
    }
  }

  render() {
    return (
      <Dropzone
        name="uploadedImage"
        disablePreview={false}
        disableClick
        style={{}}
        multiple={false}
        onDrop={this.onDrop.bind(this)}
        onDragEnter={this.onDragEnter.bind(this)}
        onDragLeave={this.onDragLeave.bind(this)}
      >
        <div className="layout">
          <form ref='uploadForm'
            onSubmit={this._renderImage}
            style={{display: 'flex',
            flexFlow: 'column'}}
            id='uploadForm'
            method='post'
            encType="multipart/form-data"
          >
            <ColorspaceLabels onChange={this._renderImage} onClick={this.trackFirstRender.bind(this)} hasBeenRendered={this.state.hasBeenRendered} />
            <SliderControls
              min="0"
              max="100"
              onMouseUp={this._renderImage}
              onChange={this._handleSliderChange}
              formState={this.state.formData}
            />
            { this.renderDropZoneIfActive()}
          </form>
          <ImageOutputArea
            images={this.state.imgUrls}
          />
        </div>
      </Dropzone>
    );
  }
}
const overlayStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  padding: '4.5em 0',
  background: 'rgba(0,0,0,0.5)',
  textAlign: 'center',
  color: '#fff'
};
