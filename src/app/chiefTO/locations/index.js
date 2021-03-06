import React, {Component, Fragment} from 'react'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    add_location,
    edit_location,
    delete_location,
    get_list_locations,
    get_search_list_locations,
    reverse_list_locations
} from './ducks'
import {getFIO} from "../../commonComponents/Const";
import {get_list_technicians, edit_technician} from "../technicians/ducks";

class Locations extends Component {
    state = {
        name: "",
        popupState: "",
        idEditElement: null,
        posEditElement: null
    };

    componentDidMount() {
        this.props.get_list_locations();
        this.props.get_list_technicians();
    }

    /*Функция для поиска локаций (фильтрование списков локаций)*/
    search_locations = event => {
        const value = event.target.value.toLowerCase();

        const filterList = this.props.list_locations.filter(location => {
            return location.name.toLowerCase().includes(value);
        });
        if (!this.props.sortUp_locations) {
            filterList.reverse();
        }
        this.props.get_search_list_locations(filterList);
    };
    handleSelectAddLocation = () => {
        this.setState({
            popupState: "add",
            name: "",
        });
    };
    handleSelectEditLocation = (name, id, pos) => {
        this.setState({
            popupState: "edit",
            name: name,
            idEditElement: id,
            posEditElement: pos
        });
    };
    handleSubmitAddLocation = event => {
        event.preventDefault();
        const data = JSON.stringify({name: this.state.name});
        this.props.add_location(data);
    };
    handleSubmitEditLocation = event => {
        event.preventDefault();
        const data = this.props.list_locations;
        data[this.state.posEditElement].name = this.state.name;
        const body = data[this.state.posEditElement];
        this.props.edit_location(body, this.state.posEditElement);
    };
    handleSubmitDeleteLocation = (id, pos) => {
        const data = this.props.list_locations;

        let deletedTechnicians = data[pos].technicians.map(x => x.oid);

        deletedTechnicians.map(technicianOid => {
            let indEditTechnician = this.props.list_technicians.findIndex(x => x.oid === technicianOid);
            let indDelLocation = this.props.list_technicians[indEditTechnician].zones.findIndex(x => x.oid === id);
            this.props.list_technicians[indEditTechnician].zones.splice(indDelLocation, 1);
            this.props.edit_technician(0, this.props.list_technicians[indEditTechnician]);
        });
        this.props.delete_location(id, pos);
    };
    handleChangeNameLocation = event => {
        event.preventDefault();
        this.setState({name: event.target.value});
    };

    render() {
        const list_locations = Object.values(this.props.search_list_locations);
        const arrow = this.props.sortUp_locations ? <i className="fas fa-angle-down"> </i> :
            <i className="fas fa-angle-up"> </i>;

        return (
            <Fragment>
                <div className="row">
                    <form className="col-sm-8 col-xl-10 mt-3">
                        <input className="form-control" type="search" placeholder="Поиск по локациям"
                               aria-label="Search" onChange={this.search_locations}/>
                    </form>
                    <div className="col-sm-4 col-xl-2 mt-3">
                        <button className="btn btn-outline-danger col-12" data-toggle="modal"
                                data-target="#interactLocation"
                                onClick={this.handleSelectAddLocation}>Добавить
                            локацию
                        </button>
                    </div>
                </div>
                <table className="table mt-3 text-center">
                    <thead className="thead-light">
                    <tr className="d-flex">
                        <th className="col sort-button"
                            onClick={this.props.reverse_list_locations}>Название {arrow}</th>
                        <th className="col">Кол-во объектов</th>
                        <th className="col">Техники</th>
                        <th className="col-1"/>
                    </tr>
                    </thead>
                    <tbody>
                    {list_locations.map((location, i) => {
                        let technicians = location.technicians === undefined ? [] : location.technicians.map(technician => getFIO((technician.user || {}).ref));
                        technicians.map(technician => technician);
                        return (
                            <tr key={i.toString()} className="d-flex">
                                <td className="col">{location.name}</td>
                                <td className="col">Кол-во объектов</td>
                                <td className="col">{technicians}</td>
                                <td className="col-1">
                                    <button className="font-awesome-button" data-toggle="modal"
                                            data-target="#interactLocation"
                                            onClick={() => this.handleSelectEditLocation(location.name, location.oid, i)}>
                                        <i className="fas fa-pencil-alt"/>
                                    </button>
                                    <button type="button" className="btn delete_button"
                                            data-toggle="modal"
                                            data-target="#deleteLocation"
                                            onClick={() => this.handleSubmitDeleteLocation(location.oid, i)}>
                                        <i className="fas fa-trash-alt"/>
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>

                {/*Модальное окно добавления/редактирования локации*/}

                <div id="interactLocation" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form id="interactLocation"
                                  onSubmit={this.state.popupState === "add" ? this.handleSubmitAddLocation : this.handleSubmitEditLocation}>
                                <div className="modal-header">
                                    <h4 className="modal-title">{this.state.popupState === "add" ? 'Создание' : 'Редактирование'} локации</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div className="modal-body pt-2 pb-2">
                                    <label htmlFor="interactLocationName">Название</label>
                                    <input className="form-control" id="interactLocationName" type="text"
                                           placeholder="Введите название локации"
                                           onChange={this.handleChangeNameLocation} required
                                           value={this.state.name}/>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-outline-danger">
                                        {this.state.popupState === "add" ? 'Добавить' : 'Изменить'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = ({listLocations, listTechnicians}) => ({
    list_locations: listLocations.list_locations,
    search_list_locations: listLocations.search_list_locations,
    sortUp_locations: listLocations.sortUp_locations, /*Для отображения стрелки сортировки вверх/вниз */
    list_technicians: listTechnicians.list_technicians,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            add_location,
            edit_location,
            delete_location,
            get_list_locations,
            get_search_list_locations,
            reverse_list_locations,
            get_list_technicians,
            edit_technician
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Locations)