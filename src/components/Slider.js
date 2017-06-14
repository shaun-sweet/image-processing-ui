import React from 'react'
import 'styles/slider.css';

const Slider = (props) => {
  return <input
    type='range'
    className="slider"
    name={props.name}
    onChange={props.onChange}
    id={props.name}
    step={props.step}
    min={props.min}
    max={props.max}
         />
}

export default Slider;
