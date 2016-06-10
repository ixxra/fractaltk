import json
import numpy as np


def openJsonFractal(fname, size):
    '''
    Open a fractal saved as json. It is expected that the array be of
    `size^2` elements.
    @param fname: Filename of json file with the fractal contents.
    @param size: The fractal is an array of `size^2` elements
    @returns: `numpy.ndarray` of shape `(size, size)` with file contents.
    '''
    with open(fname) as f:
        return np.array(json.load(f)).reshape((size, size))
