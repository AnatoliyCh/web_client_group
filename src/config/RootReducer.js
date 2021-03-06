import {combineReducers} from 'redux'
import commonReducer from "../app/commonComponents/Reducer";

import counter from '../app/chiefTO/home/ducks';
import listTechnicians from '../app/chiefTO/technicians/ducks';
import listFacility from '../app/chiefTO/facility/ducks';
import listLocations from '../app/chiefTO/locations/ducks';
import listFacilityCoordinates from '../app/chiefTO/maps/ducks';
import listMaintenance from '../app/chiefTO/calendar/ducks';
import listOrder from '../app/chiefTO/order/ducks';
import administratorReducer from '../app/Administrator/Reducer';

export default combineReducers({
    commonReducer,
    administratorReducer,
    counter,
    listTechnicians,
    listFacility,
    listLocations,
    listFacilityCoordinates,
    listMaintenance,
    listOrder
})