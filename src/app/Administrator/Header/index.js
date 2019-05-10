import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import './styles.css';

import * as allConst from '../../commonComponents/Const'

const Header = ({match}) => (
    <Fragment>
        <nav className="navbar navbar-expand-xl navbar-light bg-light">
            <Link to={`${match.url}/users`} className="navbar-brand">
                <img src={require('../../../static/HeaderLogo.jpg')} width="30" height="30"
                     className="d-inline-block align-top mr-2" alt=""/>
                Огнезащитная корпорация</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"> </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <div className="navbar-nav mr-auto">
                    <Link to={`${match.url}/users`} className="nav-item nav-link">Пользователи</Link>
                    <Link to={`${match.url}/archived`} className="nav-item nav-link">Архив</Link>
                    <button id="btnNewUser" className="btn btn-sm btn-outline-secondary"
                            data-toggle="modal" data-target="#myModal">
                        <i className="fas fa-user-plus fa-lg"/> Создание нового пользователя
                    </button>
                </div>
                <div className="textRight">
                    <div>{allConst.ROLES.get(allConst.USER_DATA.typeId)}</div>
                    <div>{allConst.USER_DATA.lastName} {allConst.USER_DATA.firstName}</div>
                </div>
                <img className="textRight" src={require('../../../static/EmptyUser.jpg')} width="50" height="50" alt=""/>
            </div>
        </nav>
    </Fragment>
);

export default Header;