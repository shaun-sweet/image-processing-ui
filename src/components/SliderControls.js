import React from 'react'
import 'styles/slider.css';
import 'styles/sliderControls.css';
// cspaceLabels = [
//   {
//     name: "BGR",
//     sliderValues: [0, 255, 0, 255, 0, 255]
//   }
// ]
const sliders = ["c1min", "c1max", "c2min", "c2max", "c3min", "c3max"];
const Slider = (props) => {
  return <input
    type='range'
    className="slider"
    name={props.name}
    key={props.name}
    onChange={props.onChange}
    id={props.name}
    step={props.step}
    min={props.min}
    max={props.max}
         />
}

const SliderControls = (props) => {
  return (
    <div className='slider-controls'>
      {sliders.map((slider) => {
        return(
          <div className="slider-container" key={slider}>

            <Slider
              type='range'
              className="slider"
              name={slider}
              onChange={props.onChange}
              id={slider}
              step={props.step}
              min={props.min}
              value={props.value}
              max={props.max}
            />
            <SliderValueDisplay
              id={slider}
              value={props.value}
            />
          </div>)
      })}

    </div>)
}

const SliderValueDisplay = (props) => {
  return <input className="slider-value-display" id={props.name} type="text" value={props.value} />
}

export default SliderControls;
