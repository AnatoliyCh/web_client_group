import React from 'react'
import {Switch, Route} from 'react-router-dom'
import * as allConst from './commonComponents/Const'
import ChiefTO from './chiefTO';
import Administrator from './Administrator';
import Customer from './Customer';
import Accountant from './Accountant';
import LoginPage from './commonComponents/LoginPage';
import Page404 from './commonComponents/Page404';

const App = () => (
    <Switch>
        <Route exact path={`${allConst.ROOT_DIRECTORY}`} component={LoginPage}/>
        <Route path={`${allConst.PATH_ADMINISTRATOR}`} component={Administrator}/>
        <Route path={`${allConst.PATH_CHIEFTO}`} component={ChiefTO}/>
        <Route path={`${allConst.PATH_CHIEF}`} component={ChiefTO}/>
        <Route path={`${allConst.PATH_ACCOUNTANT}`} component={Accountant}/>
        <Route path={`${allConst.PATH_CUSTOMER}`} component={Customer}/>
        <Route path={`${allConst.PATH_STOREKEEPER}`} component={ChiefTO}/>
        <Route path={`${allConst.PATH_LAWYER}`} component={ChiefTO}/>
        <Route component={Page404}/>
    </Switch>
);


export default App
