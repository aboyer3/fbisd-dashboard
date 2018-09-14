import * as Constants from '../constants.js'
import data from '../data/PASA.json'
import data2 from '../data/labelPoint.json'

const initialState: State = {
  data,
  data2,
  mapObject:{},
};

function Reducer(state=initialState, action) {
  switch (action.type) {
    case Constants.SET_ACTIVE_OPTION:
      return Object.assign({}, state, {
        active: action.option
      });
    case Constants.SET_MAP_OBJECT:
      return Object.assign({}, state, {
        mapObject: action.mapObject
    });
    default:
      return state;
  }
}

export { Reducer, initialState };