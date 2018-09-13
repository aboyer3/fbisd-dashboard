import React from 'react';
import data from '../data/PASA.json'
import  polylabel  from './polylabel.js'

/*console.log(data.features[0].geometry.coordinates);

let polygon = data.features[0].geometry.coordinates;

var p = polylabel(polygon, 1.0);
console.log('This is the result: ' + p);*/
let oldArr = data.features;

let newArr = oldArr.map((val, index, oldArr)=>{
    return {
        "type": "Feature",
        "properties":val.properties,
        "geometry":{
            "type":"Point",
            "coordinates": polylabel(val.geometry.coordinates ,1.0)
        }
    }
});

class MapboxFunction extends React.Component {
    render(){
        return(<div>hello</div>);
    }
} export default (MapboxFunction);