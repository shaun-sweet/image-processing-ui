import React from 'react'
import 'styles/imageOutputArea.css';
import endPointUrl from 'environment';


const ImageOutputArea = (props) => {
  return (
    <div className="imageOutputArea">
      <img src={props.src ? endPointUrl+props.src : null} alt=""/>
    </div>
  )
}

export default ImageOutputArea;
