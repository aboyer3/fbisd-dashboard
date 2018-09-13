import React from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'
import { connect } from 'react-redux'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import * as turf from '@turf/turf'
import { mapObjectAction } from '../actions/simpleAction.js'


// Don't forget to import the CSS
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';



let Map = class Map extends React.Component {
  map;


  static propTypes = {
    data: PropTypes.object.isRequired,
    active: PropTypes.object.isRequired,
    data2: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    mapObject: PropTypes.object.isRequired
  };


  componentDidUpdate() {
    this.setFill();
  }

   componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [ -95.4989, 29.5872 ],
      zoom: 10.22
    });

    /* controls for drawing selection */
    var draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
          polygon: true,
          trash: true
      }
  });
  this.map.addControl(draw);
  // Disable default box zooming.
  this.map.boxZoom.disable();
  // Create a popup, but don't add it to the map yet.
  var popup = new mapboxgl.Popup({
      closeButton: false
  });
/* above controls for drawing selection */

    this.map.on('load', () => {
      this.map.addSource('countries', {
        type: 'geojson',
        data: this.props.data,
      });

      this.map.addSource('label-source', {
        type: 'geojson',
        data: this.props.data2,
      });

      this.map.addLayer({
        id: 'PASA',
        type: 'fill',
        source: 'countries',
        paint:{
          "fill-opacity":0.6,
      }
      });
      
      this.map.addLayer({
        id: 'PASA-line',
        type: 'line',
        source: 'countries',
        paint:{
          "line-width" : 1.5,
          "line-color" : "#28353d"
      }
      });
      this.setFill();

      this.map.addLayer({
        id: 'labels',
        type: 'symbol',
        source: 'label-source',
        layout: {
          "text-field": "PU: {PU}",
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-size": 12,
          "text-padding": 4
        },
        paint: {
          "text-halo-color": '#f8f8f8',
          "text-halo-width": 1,
          'text-halo-blur': 2
        }
      });

      this.map.addLayer({
        "id": "PASA-highlighted",
        "type": "fill",
        "source": "countries",
        "paint": {
            "fill-outline-color": "#484896",
            "fill-color": "#fbb03b",
            "fill-opacity": 0.75
        },
        "filter": ["in", "PU", ""]
      }); 

      this.map.moveLayer('PASA',"country-label-lg");
      this.map.moveLayer("PASA-line","country-label-lg");
      this.map.moveLayer("labels","country-label-lg");
      this.map.moveLayer("PASA-highlighted","country-label-lg");


      let selectFeatures = (e) => {
    
        var userPolygon = e.features[0];

        // generate bounding box from polygon the user drew
        var polygonBoundingBox = turf.bbox(userPolygon);
      
        var southWest = [polygonBoundingBox[0], polygonBoundingBox[1]];
        var northEast = [polygonBoundingBox[2], polygonBoundingBox[3]];

        var northEastPointPixel = this.map.project(northEast);
        var southWestPointPixel = this.map.project(southWest);
        var features = this.map.queryRenderedFeatures([southWestPointPixel, northEastPointPixel], { layers: ['PASA'] });

        var filter = features.reduce(function(memo, feature) {
            if (turf.intersect(feature, userPolygon)) {
                // only add the property, if the feature intersects with the polygon drawn by the user
              memo.push(feature.properties.PU);
              
            };
                return memo;
        }, ['in', 'PU']);
        this.map.setFilter("PASA-highlighted", filter);
       };

       let deleteFeatures = (e) => {
         this.map.setFilter("PASA-highlighted",["in", "PU", ""])
       }

      this.map.on('draw.create', selectFeatures);
      this.map.on('draw.delete', deleteFeatures);
      this.map.on('draw.update', selectFeatures);




        /*     Function that displays  info about PU on click   */
      
    });
    /*this.map.on('click', 'PASA', function (e) {
        var K5 = e.features[0].properties.CURR_EE_5;
        var currentEnrollment = e.features[0].properties.CURR_Total;
        var sixthEighth = e.features[0].properties.CURR_6_8;
        var nineTwelve = e.features[0].properties.CURR_9_12;
        
  

        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML("Enrollment: "+ currentEnrollment + "<br>" +"EE-5: " + K5 + "<br>"+"6-8th: "+ sixthEighth + "<br>" +"9-12th: "+nineTwelve)
            .addTo(this);
    });*/

  } 

  setFill() {
    //const { property, stops } = this.props.active;
    this.map.setPaintProperty('PASA', 'fill-color', {
      type:'categorical',
    });
  }


  

  render() {
    return (
      <div className='contain col4'>
      <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
      </div>
    );
  }
}
  
function mapStateToProps(state) {
  return {
    data: state.data,
    data2: state.data2,
    active: state.active,
    mapObject:state.mapObject
  };
}

Map = connect(mapStateToProps)(Map);

export default Map;