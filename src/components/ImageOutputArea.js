import React from 'react'
import 'styles/imageOutputArea.css';
import endPointUrl from 'environment';


const ImageOutputArea = (props) => {
  return (
    <div className="imageOutputArea">
      <Mask
        src={props.src}
      />
      <MaskedImage

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

    </div>
  )

}
