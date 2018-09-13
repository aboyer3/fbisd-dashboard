import * as Constants from '../constants.js'
import {store} from '../index.js'

export const mapObjectAction = option => ({
    type: Constants.SET_MAP_OBJECT,
    payload: option
  });
