import * as Constants from '../constants.js'
import data from '../PASA.json'
import data2 from '../labelPoint.json'

const initialState: State = {
  data,
  data2,
  options,
  active: options[0],
  mapObject:{},
  
};

function Reducer(state=initialState, action = {}) {
  const { type, payload } = action;
  switch (action.type) {
    case Constants.SET_ACTIVE_OPTION:
      return Object.assign({}, state, {
        active: action.option
      });
    case Constants.SET_MAP_OBJECT:
      return Object.assign({}, state, {
        mapObject: action.payload
    });
    default:
      return state;
  }
}

export { Reducer, initialState };