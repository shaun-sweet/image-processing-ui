import React, { Component } from 'react'
import 'styles/imageOutputArea.css';
import endPointUrl from 'config/environment';


export default class ImageOutputArea extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: 'mask',
    };

    this._handleTabClick = this._handleTabClick.bind(this);
  }

  _handleTabClick(tab) {
    this.setState({ activeTab: tab });
  }

  _isActive(tab) {
    return tab == this.state.activeTab;
  }

  render () {
    if (!this.props.images.mask) {
      return null;
    }
    return (
      <div className="imageOutputArea">
        <div className="image-output-tab">
          <span onClick={() => this._handleTabClick('mask')} className="mask-tab">Mask</span>
          <span onClick={() => this._handleTabClick('maskApplied')} className="mask-applied">Mask Applied</span>
        </div>
        <Mask
          show={this._isActive('mask')}
          src={this.props.images.mask}
        />
        <MaskedImage
          src={this.props.images.masked}
          show={this._isActive('maskApplied')}
        />
      </div>
    )
  }
}

const Mask = (props) => {
  if (!props.show) return null;
  return (
    <div className="mask">
      <img src={props.src ? endPointUrl+props.src : null} alt=""/>
    </div>
  )
}

const MaskedImage = (props) => {
  if (!props.show) return null;
  return (
    <div className="masked-image">
      <img src={props.src ? endPointUrl+props.src : null} alt=""/>
    </div>
  )
}
