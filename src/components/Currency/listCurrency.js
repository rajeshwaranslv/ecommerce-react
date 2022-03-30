import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AC_LIST_CURRENCY, AC_DELETE_CURRENCY } from '../actions/currency';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom'
class listCurrency extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currencyId: '',
            editStatus: false,
            editId: ''
        }
        this.delete = this.delete.bind(this);
        this.editCurrency = this.editCurrency.bind(this);
        this.viewCurrency = this.viewCurrency.bind(this);
    }
    delete(event) {
        var currencyId = event.target.id;
        swal({
            title: "Are you sure?",
            text: "Once deleted, the file will deleted permanently!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                this.deleteCurrency(currencyId);
                swal("Currency Deleted Successfully!", {
                    buttons: false,
                    icon: "success",
                })
            } else {
                swal('Currency not deleted!',);
            }
        });
    }
    deleteCurrency(currencyId) {
        var formData = {
            id: currencyId
        }
        this.props.AC_LIST_CURRENCY();
        this.props.AC_DELETE_CURRENCY(formData);
        this.props.AC_LIST_CURRENCY();
    }
    editCurrency(event) {
        let currencyId = event.target.id;
        this.setState({ editStatus: true, editId: currencyId })
    }
    viewCurrency(event) {
        let currencyId= event.target.id;
        this.setState({ viewStatus: true, viewId: currencyId })
    }
    componentDidMount() {
        this.props.AC_LIST_CURRENCY();
    }

    render() {
        if (this.state.editStatus) {
            return <Redirect to={"/editCurrency/" + this.state.editId} />
        }
        else if (this.state.viewStatus) {
            return <Redirect to={"/viewCurrency/" + this.state.viewId} />
        }
        var TotalCurrency = 0;
        var Active = 0;
        var Inactive = 0;
        var currencyList = this.props.currencyReducer.currencyList;
        if (currencyList) {
            Active = 0;
            TotalCurrency = currencyList.length;
            Inactive = 0;
        }
        var Currency = this.props.currencyReducer.currencyList;
        console.log("=-=-=-table=", Currency)
        var resultArray = [];
        if (Currency == 0) {
            resultArray.push(<label>No Data Found</label>)
        }
        else {
            for (var i = 0; i < Currency.length; i++) {
                var tempVal = "";
                if (Currency[i].status) {
                    tempVal = "Active";
                    Active++;
                } else {
                    tempVal = "Inactive"
                    Inactive++;
                }
                resultArray.push(<tr key={i} >
                    <th scope="row">{i + 1}</th>
                    <td>{Currency[i].name}</td>
                    <td>{Currency[i].code}</td>
                    <td>{tempVal}</td>
                    <td>
                        <button type="button" id={Currency[i]._id} onClick={this.viewCurrency} class="btn btn-primary m-2">View</button>
                        <button type="button" id={Currency[i]._id} onClick={this.editCurrency} class="btn btn-success m-2">Edit</button>
                        <button type="button" id={Currency[i]._id} onClick={this.delete} class="btn btn-danger m-2">delete</button>
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
                                </span> List Currency
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
                                        <h4 class="font-weight-normal mb-3">Total Currency <i class="mdi mdi-chart-line mdi-24px float-right"></i>
                                        </h4>
                                        <h2 class="mb-5">{TotalCurrency}</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 stretch-card grid-margin">
                                <div class="card bg-gradient-info card-img-holder text-white">
                                    <div class="card-body">
                                        <img src="assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                                        <h4 class="font-weight-normal mb-3">Active Currency <i class="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                                        </h4>
                                        <h2 class="mb-5">{Active}</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 stretch-card grid-margin">
                                <div class="card bg-gradient-success card-img-holder text-white">
                                    <div class="card-body">
                                        <img src="assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                                        <h4 class="font-weight-normal mb-3">Inactive Currency <i class="mdi mdi-diamond mdi-24px float-right"></i>
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
        currencyReducer: state.CURRENCY_Reducer
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ AC_LIST_CURRENCY, AC_DELETE_CURRENCY }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(listCurrency);