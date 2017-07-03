import cv2
import numpy as np



__author__ = "Alexander Reynolds"
__email__ = "ar@reynoldsalexander.com"



"""Private helper functions"""



def __cspaceSwitch(img, cspace):
    """Coverts the colorspace of img from BGR to cspace

    Keyword arguments: 
        img -- the image to convert
        cspace -- the colorspace to convert to; see keys in main()

    Returns:
        img -- img with the converted colorspace
    """
    if cspace is 0:
        return img
    convert_code = {
        1: cv2.COLOR_BGR2HSV,
        2: cv2.COLOR_BGR2HLS,
        3: cv2.COLOR_BGR2Lab,
        4: cv2.COLOR_BGR2Luv,
        5: cv2.COLOR_BGR2YCrCb,
        6: cv2.COLOR_BGR2XYZ,
        7: cv2.COLOR_BGR2GRAY
    }[cspace]
    img = cv2.cvtColor(img, convert_code)

    return img


def __cspaceBounds(cspace, slider_pos):
    """Calculates the lower and upper bounds for thresholding a 
    colorspace based on the thresholding slider positions.

    Keyword arguments:
        cspace -- the colorspace to find bounds of; see keys in main()
        slider_pos -- the positions of the thresholding trackbars; length 6 list

    Returns:
        lowerb -- np.array containing the lower bounds for each channel threshold
        upperb -- np.array containing the upper bounds for each channel threshold
    """

    min_dict = {3: np.array([0,1,1])}
    max_dict = {1: np.array([180,255,255]), 2: np.array([180,255,255])}

    mins = min_dict.get(cspace, np.array([0,0,0]))
    maxs = max_dict.get(cspace, np.array([255,255,255]))

    lowerb = np.array([bar_positions[0], bar_positions[2], bar_positions[4]])
    upperb = np.array([bar_positions[1], bar_positions[3], bar_positions[5]])
    lowerb = lowerb * (maxs-mins) / 100 + mins # put in the correct range
    upperb = upperb * (maxs-mins) / 100 + mins

    if cspace is 7: lowerb, upperb = lowerb[0], upperb[0]

    return lowerb, upperb


def __cspaceRange(img, cspace, lowerb, upperb):
    """Thresholds img in cspace with lowerb and upperb

    Keyword arguments:
        img -- the image to be thresholded
        cspace -- the colorspace to threshold in; see keys in main()

    Returns:
        mask -- a binary image that has been thresholded
    """
    img = __cspaceSwitch(img, cspace)
    mask = cv2.inRange(img, lowerb, upperb)

    return mask

def __applyMask(img, mask):
    """Applies a mask to an image

    Keyword arguments:
        img -- the image to be masked
        mask -- the mask (non-zero values are included, zero values are excluded)

    Returns:
        masked_img -- the input img with mask applied
    """

    masked_img = cv2.bitwise_and(img, img, mask=mask)

    return masked_img



"""Main public function"""



def main(img, cspace, slider_pos):
    """Computes the colorspace thresholded image based on 
    slider positions and selected colorspace.

    Inputs:
        img -- input image
        cspace -- see colorspace keys below (int)
        slider_pos -- positions of the six sliders (6-long int list)

    Colorspace keys:
        0 -- BGR        1 -- HSV        2 -- HLS        3 -- Lab        
        4 -- Luv        5 -- YCrCb      6 -- XYZ        7 -- Grayscale

    returns
        mask -- mask created from thresholding the image
        masked_img -- masked image
    """
    lowerb, upperb = __cspaceBounds(cspace, slider_pos)
    mask = __cspaceRange(img, cspace, lowerb, upperb)
    masked_img = __applyMask(img, mask)
    
    return mask, masked_img
