import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AC_LIST_LANGUAGE, AC_DELETE_LANGUAGE } from '../actions/language';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom'
class Listlanguage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            languageId: '',
            editStatus: false,
            editId: ''
        }
        this.delete = this.delete.bind(this);
        this.editLanguage = this.editLanguage.bind(this);
        this.viewLanguage = this.viewLanguage.bind(this);
    }
    delete(event) {
        var languageId = event.target.id;
        swal({
            title: "Are you sure?",
            text: "Once deleted, the file will deleted permanently!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                this.deleteLanguage(languageId);
                swal("Language Deleted Successfully!", {
                    buttons: false,
                    icon: "success",
                })
            } else {
                swal('Language not deleted!',);
            }
        });
    }
    deleteLanguage(languageId) {
        var formData = {
            id: languageId
        }
        this.props.AC_LIST_LANGUAGE();
        this.props.AC_DELETE_LANGUAGE(formData);
        this.props.AC_LIST_LANGUAGE();
    }
    editLanguage(event) {
        let languageId = event.target.id;
        this.setState({ editStatus: true, editId: languageId })
    }
    viewLanguage(event) {
        let languageId = event.target.id;
        this.setState({ viewStatus: true, viewId: languageId })
    }
    componentDidMount() {
        this.props.AC_LIST_LANGUAGE();
    }

    render() {
        if (this.state.editStatus) {
            return <Redirect to={"/editLanguage/" + this.state.editId} />
        }
        else if (this.state.viewStatus) {
            return <Redirect to={"/viewLanguage/" + this.state.viewId} />
        }
        var TotalLanguage = 0;
        var Active = 0;
        var Inactive = 0;
        var languageList = this.props.languageReducer.languageList;
        if (languageList) {
            Active = 0;
            TotalLanguage = languageList.length;
            Inactive = 0;
        }
        var Language = this.props.languageReducer.languageList;
        console.log("=-=-=-table=", Language)
        var resultArray = [];
        if (Language == 0) {
            resultArray.push(<label>Data is Not Found</label>)
        }
        else {
            for (var i = 0; i < Language.length; i++) {
                var tempVal = "";
                if (Language[i].status) {
                    tempVal = "Active";
                    Active++;
                } else {
                    tempVal = "Inactive"
                    Inactive++;
                }
                resultArray.push(<tr key={i} >
                    <th scope="row">{i + 1}</th>
                    <td>{Language[i].name}</td>
                    <td>{Language[i].code}</td>
                    <td>{tempVal}</td>
                    <td>
                        <button type="button" id={Language[i]._id} onClick={this.viewLanguage} class="btn btn-primary m-2">View</button>
                        <button type="button" id={Language[i]._id} onClick={this.editLanguage} class="btn btn-success m-2" >Edit</button>
                        <button type="button" id={Language[i]._id} onClick={this.delete} class="btn btn-danger m-2">delete</button>
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
                                </span> List Language
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
                                        <h4 class="font-weight-normal mb-3">Total Language <i class="mdi mdi-chart-line mdi-24px float-right"></i>
                                        </h4>
                                        <h2 class="mb-5">{TotalLanguage}</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 stretch-card grid-margin">
                                <div class="card bg-gradient-info card-img-holder text-white">
                                    <div class="card-body">
                                        <img src="assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                                        <h4 class="font-weight-normal mb-3">Active Language <i class="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                                        </h4>
                                        <h2 class="mb-5">{Active}</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 stretch-card grid-margin">
                                <div class="card bg-gradient-success card-img-holder text-white">
                                    <div class="card-body">
                                        <img src="assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                                        <h4 class="font-weight-normal mb-3">Inactive Language <i class="mdi mdi-diamond mdi-24px float-right"></i>
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
                                            <th scope="col">Code</th>
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
        languageReducer: state.LANGUAGE_Reducer
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ AC_LIST_LANGUAGE, AC_DELETE_LANGUAGE }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Listlanguage);