import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as allConst from '../../commonComponents/Const';
import $ from 'jquery';
import {setDialogMode} from "../../commonComponents/Reducer";
import {setArrayUserArrays, setUserInArray} from "../Reducer";

class AddEditDialogBox extends Component {
    state = {
        currentRoleKey: 2,//ключ выбранной роли
    };
    clearDialog = () => {
        $('#addLastName').val('');
        $('#addFirstName').val('');
        $('#addMiddleName').val('');
        $('#addLogin').val('');
        $('#addPassword').val('');
        $('#addLoginPhone').val('');
        $('#selectRole').val(2);
        this.props.setDialogModeInStore(0);//создание
        $('#headerModal').html("Создание");
    };
    setRole = (event) => {
        this.setState({currentRoleKey: event.currentTarget.value});
    };
    clickButton = () => {
        let user = {
            typeId: +(this.state.currentRoleKey),
            firstName: $('#addFirstName').val(),
            lastName: $('#addLastName').val(),
            middleName: $('#addMiddleName').val(),
            account: {
                login: $('#addLogin').val(),
                password: $('#addPassword').val(),
                loginPhone: {
                    value: $('#addLoginPhone').val(),
                }
            }
        };
        this.props.dialogMode === 0 ? this.addUserAPI(user) : this.editUserAPI();
        this.clearDialog();
    };
    addUserAPI = (data) => {
        // eslint-disable-next-line
        fetch(`${allConst.IP_HOST}` + '/api/user/add', {
            method: 'POST',
            headers: {SessionToken: `${allConst.USER_DATA.sessionToken}`},
            body: JSON.stringify(data)
        }).then(function (response) {
            return response.json();
        }).then(response => {
            if (Number.isInteger(response)) this.props.setUserInArrayStore(data);
        }).catch((error) => {
            console.log(error.message);
        });
    };
    editUserAPI = () => {

    };

    render() {
        let itemsSetRoles = [];
        allConst.ROLES.forEach(function (itemMap, i) {
            itemsSetRoles.push(<option value={i} key={i}>{itemMap}</option>);
        });
        return (
            <div id="myModal" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 id="headerModal"
                                className="modal-title">{this.props.dialogMode === 0 ? 'Создание' : 'Редактирование'}</h4>
                            <button type="button" className="close" data-dismiss="modal"
                                    onClick={this.clearDialog}>&times;</button>
                        </div>
                        <div className="modal-body pt-4 pb-4">

                            <label htmlFor="lastName">Фамилия</label>
                            <input className="form-control" id="addLastName" type="search"
                                   placeholder="Введите фамилию" aria-label="Search"/>

                            <label htmlFor="firstName">Имя</label>
                            <input className="form-control" id="addFirstName" type="search"
                                   placeholder="Введите имя" aria-label="Search"/>

                            <label htmlFor="middleName">Отчетсво</label>
                            <input className="form-control" id="addMiddleName" type="search"
                                   placeholder="Введите отчество" aria-label="Search"/>

                            <label htmlFor="login">Логин</label>
                            <input className="form-control" id="addLogin" type="search"
                                   placeholder="Введите логин" aria-label="Search"/>

                            <label htmlFor="password">Пароль</label>
                            <input className="form-control" id="addPassword" type="search"
                                   placeholder="Введите пароль" aria-label="Search"/>

                            <label htmlFor="loginPhone">Телефон</label>
                            <input className="form-control" id="addLoginPhone" type="search"
                                   placeholder="Введите телефон" aria-label="Search"/>

                            <label htmlFor="role">Роль</label>
                            <select id="selectRole" className="form-control" onClick={this.setRole}>
                                {itemsSetRoles}
                            </select>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-danger" data-dismiss="modal"
                                    onClick={this.clickButton}>Добавить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// приклеиваем данные из store
const mapStateToProps = store => {
    return {
        dialogMode: store.commonReducer.dialogMode,
        arrayUserArrays: store.administratorReducer.arrayUserArrays,
    }
};
//функции для ассинхронного ввода
const mapDispatchToProps = dispatch => {
    return {
        setDialogModeInStore: mode => dispatch(setDialogMode(mode)),
        setUserInArrayStore: user => dispatch(setUserInArray(user)),
        //setArrayUserArraysInStore: array => dispatch(setArrayUserArrays(array)),
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddEditDialogBox)