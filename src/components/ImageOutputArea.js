import React, { Component } from 'react'
import 'styles/imageOutputArea.css';
import endPointUrl from 'config/environment';


export default class ImageOutputArea extends Component {
  constructor() {
    super();
    this.state = {
      hello: 'world'
    }
  }
  render () {
    return (
      <div className="imageOutputArea">
        <Mask
          src={this.props.images.mask}
        />
        <MaskedImage
          src={this.props.images.masked}
        />
    </div>)
  }
}

const Mask = (props) => {
  return (
    <div className="mask">
      {props.src ? <h6>Mask</h6> : null}
      <img src={props.src ? endPointUrl+props.src : null} alt=""/>
    </div>
  )
}

const MaskedImage = (props) => {
  return (
    <div className="masked-image">
      <img src={props.src ? endPointUrl+props.src : null} alt=""/>
      {props.src ? <h6>Mask Applied</h6> : null}
        </div>
        )

        }
