import React from 'react'
import 'styles/slider.css';
[
  {
    name: "c1min",
    
  }
]
const sliders = ["c1min", "c1max", "c2min", "c2max", "c3min", "c3max"];
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

const SliderControls = (props) => {
  return (
    <div style={{display: 'flex', flexFlow: 'column'}}>
      {sliders.map(slider =>
        <Slider
          type='range'
          className="slider"
          name={slider}
          onChange={props.onChange}
          id={slider}
          step={props.step}
          min={props.min}
          max={props.max}
        />
      )}</div>)
}

export default SliderControls;
