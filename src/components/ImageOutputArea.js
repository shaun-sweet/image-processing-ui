import React from 'react'
import 'styles/imageOutputArea.css';

const ImageOutputArea = (props) => {
  return (
    <div className="imageOutputArea">
      <img src={props.src ? "http://1665712a.ngrok.io/"+props.src : null} alt=""/>
    </div>
  )
}

export default ImageOutputArea;
