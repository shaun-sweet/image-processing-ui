import React from 'react'
import 'styles/colorspaceLabels.css';

const ColorspaceLabels = (props) => {
  const labels = ["BGR", "HSV", "HLS", "Lab", "Luv", "YCrCb", "XYZ", "Grayscale"];

  const renderColorspaceLabels = () => {
    return labels.map(label => {
      return (
        <div key={label}>
          <input id={label} type="radio" name="colorSpaceLabel" value={label} />
          <label htmlFor={label}>{label}</label>
        </div>
      )
    });
  };
  return (
    <div className="colorspace-labels">
      {renderColorspaceLabels()}
    </div>
      )
}

export default ColorspaceLabels;
