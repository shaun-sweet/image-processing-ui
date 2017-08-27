import React, { Component } from 'react'
import SliderControls from 'components/SliderControls';
import ImageOutputArea from 'components/ImageOutputArea';
import ColorspaceLabels from 'components/ColorspaceLabels';
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
      selectedColorSpaceLabel: "BGR",
      formData: {
        "c1min": 0,
        "c1max": 255,
        "c2min": 0,
        "c2max": 255,
        "c3min": 0,
        "c3max": 255
      },
      imgUrls: {
        masked: "",
        mask: ""
      }
    };
    this._handleSliderChange = this._handleSliderChange.bind(this);
    this.renderImage = this.renderImage.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.renderDropZoneIfActive = this.renderDropZoneIfActive.bind(this);
    this._handleColorSpaceLabelSelection = this._handleColorSpaceLabelSelection.bind(this);
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
    this.renderImage();
  }

  applyMimeTypes(event) {
    this.setState({
      accept: event.target.value
    });
  }

  async _handleColorSpaceLabelSelection(selectedColorSpaceLabel) {
    await this.setState({selectedColorSpaceLabel});
    this.renderImage();
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
    });
  }

  trackFirstRender() {
    this.setState({hasBeenRendered: true});
  }

  renderImage() {
    var _this = this;
    let body = new FormData(document.getElementById('uploadForm'));
    let file = this.state.files;
    body.append('uploadedImage', file[0]);
    body.set('colorSpaceLabel', this.state.selectedColorSpaceLabel)
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
          <h3>Colorspace Filter</h3>
          <form ref='uploadForm'
            onSubmit={this.renderImage}
            style={{display: 'flex',
            flexFlow: 'column'}}
            id='uploadForm'
            method='post'
            encType="multipart/form-data"
          >
            <ColorspaceLabels
              selectionCallback={this._handleColorSpaceLabelSelection}
              onClick={this.trackFirstRender.bind(this)}
              hasBeenRendered={this.state.hasBeenRendered}
            />
            <SliderControls
              onChange={this._handleSliderChange}
              renderOnMouseUp={this.renderImage}
              formState={this.state.formData}
              selectedColorSpaceLabel={this.state.selectedColorSpaceLabel}
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
