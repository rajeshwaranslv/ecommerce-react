import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AC_LIST_CONFIGURATION, AC_DELETE_CONFIGURATION } from '../actions/config';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom'
class listConfiguration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            configId: '',
            editStatus: false,
            editId: ''
        }
        this.delete = this.delete.bind(this);
        this.editConfig = this.editConfig.bind(this);
        this.viewConfig = this.viewConfig.bind(this);
    }
    delete(event) {
        var configId = event.target.id;
        swal({
            title: "Are you sure?",
            text: "Once deleted, the file will deleted permanently!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                this.deleteConfig(configId);
                swal("Configuration Deleted Successfully!", {
                    buttons: false,
                    icon: "success",
                })
            } else {
                swal('Configuration not deleted!',);
            }
        });
    }
    deleteConfig(configId) {
        var formData = {
            id: configId
        }
        this.props.AC_LIST_CONFIGURATION();
        this.props.AC_DELETE_CONFIGURATION(formData);
        this.props.AC_LIST_CONFIGURATION();
    }
    editConfig(event) {
        let configId = event.target.id;
        this.setState({ editStatus: true, editId: configId })
    }
    viewConfig(event) {
        let configId = event.target.id;
        this.setState({ viewStatus: true, viewId: configId })
    }
    componentDidMount() {
        this.props.AC_LIST_CONFIGURATION();
    }

    render() {
        if (this.state.editStatus) {
            return <Redirect to={"/editConfig/" + this.state.editId} />
        }
        else if (this.state.viewStatus) {
            return <Redirect to={"/viewConfig/" + this.state.viewId} />
        }
        var TotalConfig = 0;
        var Active = 0;
        var Inactive = 0;
        var configList = this.props.configReducer.configList;
        if (configList) {
            Active = 0;
            TotalConfig = configList.length;
            Inactive = 0;
        }
        var Config = this.props.configReducer.configList;
        console.log("=-=-=-table=", Config)
        var resultArray = [];
        if (Config == 0) {
            resultArray.push(<label>Data is Not Found</label>)
        }
        else {
            for (var i = 0; i < Config.length; i++) {
                var tempVal = "";
                if (Config[i].status) {
                    tempVal = "Active";
                    Active++;
                } else {
                    tempVal = "Inactive"
                    Inactive++;
                }
                resultArray.push(<tr key={i} >
                    <th scope="row">{i + 1}</th>
                    <td>{Config[i].name}</td>
                    <td>{Config[i].slug}</td>
                    <td>{Config[i].description}</td>
                    <td>{tempVal}</td>
                    <td>
                        <button type="button" id={Config[i]._id} onClick={this.viewConfig} class="btn btn-primary m-2">View</button>
                        <button type="button" id={Config[i]._id} onClick={this.editConfig} class="btn btn-success  m-2">Edit</button>
                        <button type="button" id={Config[i]._id} onClick={this.delete} class="btn btn-danger  m-2">delete</button>
                    </td>
                </tr>)
            }
        }
        return (
            <>
                <div class="main-panel" >
                    <div class="content-wrapper" style={{ background: 'white' }} >
                        <div class="page-header">
                            <h3 class="page-title">
                                <span class="page-title-icon bg-gradient-primary text-white me-2">
                                    <i class="mdi mdi-home"></i>
                                </span> List Configuration
                            </h3>
                            <nav aria-label="breadcrumb">
                                <ul class="breadcrumb">
                                    <li class="breadcrumb-item active" aria-current="page">
                                        <span></span>Overview <i class="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div class="row">
                            <div class="col-md-4 stretch-card grid-margin">
                                <div class="card bg-gradient-danger card-img-holder text-white">
                                    <div class="card-body">
                                        <img src="assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                                        <h4 class="font-weight-normal mb-3">Total Configuration <i class="mdi mdi-chart-line mdi-24px float-right"></i>
                                        </h4>
                                        <h2 class="mb-5">{TotalConfig}</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 stretch-card grid-margin">
                                <div class="card bg-gradient-info card-img-holder text-white">
                                    <div class="card-body">
                                        <img src="assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                                        <h4 class="font-weight-normal mb-3">Active Configurations <i class="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                                        </h4>
                                        <h2 class="mb-5">{Active}</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 stretch-card grid-margin">
                                <div class="card bg-gradient-success card-img-holder text-white">
                                    <div class="card-body">
                                        <img src="assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                                        <h4 class="font-weight-normal mb-3">Inactive Configurations <i class="mdi mdi-diamond mdi-24px float-right"></i>
                                        </h4>
                                        <h2 class="mb-5">{Inactive}</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="table">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">S.No</th>
                                            <th scope="col"> Name</th>
                                            <th scope="col">Slug</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {resultArray}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        );
    }
}
function mapStateToProps(state) {
    console.log('map state', state);
    return {
        configReducer: state.CONFIGURATION_Reducer
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ AC_LIST_CONFIGURATION, AC_DELETE_CONFIGURATION }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(listConfiguration);
