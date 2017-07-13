import React from 'react'
import 'styles/imageOutputArea.css';
import endPointUrl from 'config/environment';


const ImageOutputArea = (props) => {
  return (
    <div className="imageOutputArea">
      <Mask
        src={props.images.mask}
      />
      <MaskedImage
        src={props.images.masked}
      />
    </div>
  )
}

export default ImageOutputArea;


const Mask = (props) => {
  return (
    <div className="mask">
      <img src={props.src ? endPointUrl+props.src : null} alt=""/>
    </div>
  )
}

const MaskedImage = (props) => {
  return (
    <div className="masked-image">
      <img src={props.src ? endPointUrl+props.src : null} alt=""/>
    </div>
  )

}
