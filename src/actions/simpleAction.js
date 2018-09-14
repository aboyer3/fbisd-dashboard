import * as Constants from '../constants.js'
import {store} from '../index.js'

export const mapObjectAction = mapObject => ({
    type: Constants.SET_MAP_OBJECT,
    mapObject
  });
