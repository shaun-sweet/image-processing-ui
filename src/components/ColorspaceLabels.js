import React from 'react'
import 'styles/colorspaceLabels.css';



const ColorspaceLabels = (props) => {

  if (!props.hasBeenRendered) {
    return (
      <div onClick={props.onClick} className="colorspace-labels">
        <div key="BGR">
          <input checked id="BGR" type="radio" name="colorSpaceLabel" value="BGR" />
          <label htmlFor="BGR">BGR</label>
        </div>
        {renderColorspaceLabels(props.onChange)}
      </div>
    )
  } else {
    return (
      <div className="colorspace-labels">
        <div key="BGR">
          <input id="BGR" type="radio" name="colorSpaceLabel" value="BGR" />
          <label htmlFor="BGR">BGR</label>
        </div>
        {renderColorspaceLabels(props.onChange)}
      </div>
    )
  }
}


const renderColorspaceLabels = (onChange) => {
  const labels = ["HSV", "HLS", "Lab", "Luv", "YCrCb", "XYZ", "Grayscale"];
  return labels.map(label => {
    return (
      <div key={label}>
        <input onChange={onChange} id={label} type="radio" name="colorSpaceLabel" value={label} />
        <label htmlFor={label}>{label}</label>
      </div>
    )
  });
}

export default ColorspaceLabels;
