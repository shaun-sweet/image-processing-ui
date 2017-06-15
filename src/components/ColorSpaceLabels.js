import React from 'react'
import 'styles/colorSpaceLabels.css';



const ColorSpaceLabels = (props) => {
  const labels = ["BGR", "HSV", "HLS", "Lab", "Luv", "YCrCb", "XYZ", "Grayscale"];

  const renderColorSpaceLabels = () => {
    return labels.map(label => {
      return (
        <div key={label}>
          <input type="radio" name="colorSpaceLabel" value={label} />
          <label htmlFor={label}>{label}</label>
        </div>
      )
    });
  };
  return (
    <div>
      {renderColorSpaceLabels()}
    </div>
      )
}

export default ColorSpaceLabels;
