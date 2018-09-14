import { connect } from 'react-redux'
import { mapObjectAction } from '../../actions/simpleAction.js'
import Map from '../map.js'

const mapStateToProps = state => ({
    data: state.data,
    data2: state.data2,
    //mapObject: state.mapObject
})

const mapDispatchToProps = dispatch => {
    return {
        mapObjectAction: (option) => {
            dispatch(mapObjectAction(option))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)