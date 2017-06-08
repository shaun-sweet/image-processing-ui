import React from 'react'
import 'styles/slider.css';

const Slider = (props) => {
  return <input
    type='range'
    className="slider"
    onChange={props.onChange}
    id={props.name}
    step={props.step}
    min={props.min}
    max={props.max}
    value={props.defaultValue || "0"} />
}

export default Slider;
