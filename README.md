Image Processing

Start command: ```npm start```


# Web interface

### Colorspace buttons

Need buttons. Only one able to be selected at a time.

Labels:
- BGR (default)
- HSV
- HLS
- Lab
- Luv
- YCrCb
- XYZ
- Grayscale

### Sliders

Need six sliders (eventually only three):

Labels:
- Channel 1 Min
- Channel 2 Max
- Channel 3 Min
- Channel 4 Max
- Channel 5 Min
- Channel 6 Max

Current implementation assumes the slider ranges are all 0 to 100. We need to change this before deployment.
The allowable slider range should depend on the colorspace selected:

- BGR: `0, 255, 0, 255, 0, 255`
- HSV: `0, 180, 0, 255, 0, 255`
- HLS: same as HSV
- Lab: `0, 255, 1, 255, 1, 255`
- Luv: same as BGR
- YCrCb: same as BGR
- XYZ: same as BGR
- Grayscale: same as BGR

All sliders should have a step size of one.

Possibly we could have different labels depending on the selected colorspace? For e.g., in the BGR colorspace, the labels could be Channel 1 (B) Min, Channel 6 (R) Max, or something.

Nice-to-have: Grayscale will only use the first two sliders (it's a one-channel image). If we could gray-out the other four sliders and not allow the user to interact with them, or otherwise find a way to notify them that the other four sliders will not affect the image.

Preferrably when a user switches the colorspace, we would try to move the sliders to a similar position in the new colorspace. I.e., 255 from the first slider in the BGR colorspace should be 180 in the HSV colorspace.

### Python script trigger

At first we can simply create a button, and when the user presses that button, it will get the current slider values and run the script for that.

Eventually it would be nice to automagically trigger once the user changes the slider position (waiting until mouse release).

### Image view window

Upon upload, the normal full-color image should be displayed. Then once the python script is triggered, we need to load the new output image into the image window.

# I/O

### Input

To run the python script, we need to send a JSON object into the python script `cspaceIO.py`. The JSON object needs to include the fields `path`, `cspaceLabel`, and `sliderPos`. The field `path` is itself an object with the fields `srcPath` and `dstPath`, which are the paths to the source and output images. `cspaceLabel` should be a string, with the same values allowed as the colorspace buttons, and `sliderPos` needs to be a list of the six slider positions (should be six integers).

### Output

The python script `cspaceIO.py` does not output anything, only writes the image to the specified output path.
