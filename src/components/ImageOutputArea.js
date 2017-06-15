import React from 'react'
import 'styles/imageOutputArea.css';
const endpointUrl = require('config/constants').endpointUrl;


const ImageOutputArea = (props) => {
  return (
    <div className="imageOutputArea">
      <img src={props.src ? endpointUrl+props.src : null} alt=""/>
    </div>
  )
}

export default ImageOutputArea;
