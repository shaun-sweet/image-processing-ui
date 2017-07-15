import React from 'react'
import 'styles/colorspaceLabels.css';



const ColorspaceLabels = (props) => {

  if (!props.hasBeenRendered) {
    return (
      <div onClick={props.onClick} className="colorspace-labels">
        {renderColorspaceLabels(props.selectionCallback)}
      </div>
    )
  } else {
    return (
      <div className="colorspace-labels">
        {renderColorspaceLabels(props.selectionCallback)}
      </div>
    )
  }
}


const renderColorspaceLabels = (selectionCallback) => {
  const labels = ["BGR", "HSV", "HLS", "Lab", "Luv", "YCrCb", "XYZ", "Grayscale"];
  return labels.map(label => {
    return (
      <div key={label}>
        <input id={label} type="radio" name="colorSpaceLabel" value={label} />
        <label onClick={(e) => selectionCallback(label)} htmlFor={label}>{label}</label>
      </div>
    )
  });
};

export default ColorspaceLabels;
