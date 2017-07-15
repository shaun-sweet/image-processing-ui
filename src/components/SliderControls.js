import React from 'react'
import 'styles/slider.css';
import 'styles/sliderControls.css';
const colorSpaceLabels = require('config/constants').cspaceLabels;

const sliders = [
  {id: "c1min", label: "Ch 1 Min"},
  {id: "c1max", label: "Ch 1 Max"},
  {id: "c2min", label: "Ch 2 Min"},
  {id: "c2max", label: "Ch 2 Max"},
  {id: "c3min", label: "Ch 3 Min"},
  {id: "c3max", label: "Ch 3 Max"}
];
const Slider = (props) => {
  return <input
    style={{flex: '1'}}
    type='range'
    className="slider"
    name={props.name}
    key={props.name}
    onChange={props.onChange}
    id={props.name}
    step={props.step}
    min={props.min}
    max={props.max}
    value={props.value}
  />
}

const SliderControls = (props) => {
  // TODO Make sliders come from the props (keep in the layout state)
  const selectedColorSpaceLabel = colorSpaceLabels[props.selectedColorSpaceLabel];
  return (
    <div className='slider-controls'>
      {selectedColorSpaceLabel.sliders.map((slider) => {
        return(
          <div className="slider-container" key={slider.id}>
            <div className="slider-titles">
              {slider.label}
            </div>
            <Slider
              type='range'
              className="slider"
              name={slider.id}
              onChange={(e) => props.onChange(e,slider.id)}
              id={slider.id}
              step={props.step}
              min={slider.min}
              value={props.formState[slider.id]}
              max={slider.max}
            />
            <SliderValueDisplay
              onChange={(e) => props.onChange(e,slider.id)}
              value={props.formState[slider.id]}
            />
          </div>)
      })}

    </div>)
}

const renderSliders = (sliders, formState, onChange) => {

}

const SliderValueDisplay = (props) => {
  return <input onChange={props.onChange} className="slider-value-display" type="text" value={props.value} />
}

export default SliderControls;
