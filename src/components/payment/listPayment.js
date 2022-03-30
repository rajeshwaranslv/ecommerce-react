import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AC_LIST_PAYMENT, AC_DELETE_PAYMENT } from '../actions/payment';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom'
class listPayment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentId: '',
            editStatus: false,
            editId: ''
        }
        this.delete = this.delete.bind(this);
        this.editPayment = this.editPayment.bind(this);
        this.viewPayment = this.viewPayment.bind(this);
    }
    delete(event) {
        var paymentId = event.target.id;
        swal({
            title: "Are you sure?",
            text: "Once deleted, the file will deleted permanently!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                this.deletePayment(paymentId);
                swal("Payment Deleted Successfully!", {
                    buttons: false,
                    icon: "success",
                })
            } else {
                swal('Payment not deleted!',);
            }
        });
    }
    deletePayment(paymentId) {
        var formData = {
            id: paymentId
        }
        this.props.AC_LIST_PAYMENT();
        this.props.AC_DELETE_PAYMENT(formData);
        this.props.AC_LIST_PAYMENT();
    }
    editPayment(event) {
        let paymentId = event.target.id;
        this.setState({ editStatus: true, editId: paymentId })
    }
    viewPayment(event) {
        let paymentId = event.target.id;
        this.setState({ viewStatus: true, viewId: paymentId })
    }
    componentDidMount() {
        this.props.AC_LIST_PAYMENT();
    }

    render() {
        if (this.state.editStatus) {
            return <Redirect to={"/editPayment/" + this.state.editId} />
        }
        else if (this.state.viewStatus) {
            return <Redirect to={"/viewPayment/" + this.state.viewId} />
        }
        var TotalPayment = 0;
        var Active = 0;
        var Inactive = 0;
        var paymentList = this.props.paymentReducer.paymentList;
        if (paymentList) {
            Active = 0;
            TotalPayment = paymentList.length;
            Inactive = 0;
        }
        var Payment = this.props.paymentReducer.paymentList;
        var resultArray = [];
        if (Payment == 0) {
            resultArray.push(<label>No data found</label>)
        }
        else {
            for (var i = 0; i < Payment.length; i++) {
                var tempVal = "";
                if (Payment[i].status) {
                    tempVal = "Active";
                    Active++;
                } else {
                    tempVal = "Inactive"
                    Inactive++;
                }
                resultArray.push(<tr key={i} >
                    <th scope="row">{i + 1}</th>
                    <td>{Payment[i].name}</td>
                    <td>{Payment[i].mode}</td>
                    <td>{tempVal}</td>
                    <td>
                        <button type="button" id={Payment[i]._id} onClick={this.viewPayment} class="btn btn-primary m-2">View</button>
                        <button type="button" id={Payment[i]._id} onClick={this.editPayment} class="btn btn-success m-2">Edit</button>
                        <button type="button" id={Payment[i]._id} onClick={this.delete} class="btn btn-danger m-2">delete</button>
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
                                </span> List Payment
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
                                        <h4 class="font-weight-normal mb-3">Total Payment <i class="mdi mdi-chart-line mdi-24px float-right"></i>
                                        </h4>
                                        <h2 class="mb-5">{TotalPayment}</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 stretch-card grid-margin">
                                <div class="card bg-gradient-info card-img-holder text-white">
                                    <div class="card-body">
                                        <img src="assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                                        <h4 class="font-weight-normal mb-3">Active Payment <i class="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                                        </h4>
                                        <h2 class="mb-5">{Active}</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 stretch-card grid-margin">
                                <div class="card bg-gradient-success card-img-holder text-white">
                                    <div class="card-body">
                                        <img src="assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                                        <h4 class="font-weight-normal mb-3">Inactive Payment <i class="mdi mdi-diamond mdi-24px float-right"></i>
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
                                            <th scope="col">Mode</th>
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
    return {
        paymentReducer: state.PAYMENT_Reducer
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ AC_LIST_PAYMENT, AC_DELETE_PAYMENT }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(listPayment);