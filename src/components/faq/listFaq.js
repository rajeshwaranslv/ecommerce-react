import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AC_LIST_FAQ, AC_DELETE_FAQ } from '../actions/faq';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom'
class listFaqs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: '',
            answerError: false,
            answerCountError: false,
            question: '',
            questionError: false,
            questionCountError: false,
            status: '',
            statusError: false,
            faqId: '',
            listFaq: true,
            editFaq: false,
            editStatus: false,
            editId: '',
            viewId: ''
        }
        this.delete = this.delete.bind(this);
        this.editFaq = this.editFaq.bind(this);
        this.viewFaq = this.viewFaq.bind(this);
    }
    delete(event) {
        var faqId = event.target.id;
        swal({
            title: "Are you sure?",
            text: "Once deleted, the file will deleted permanently!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                this.deleteFaq(faqId);
                swal("Faq Deleted Successfully!", {
                    buttons: false,
                    icon: "success",
                })
            } else {
                swal('Faq not deleted!',);
            }
        });
    }
    deleteFaq(faqId) {
        var formData = {
            id: faqId
        }
        this.props.AC_LIST_FAQ();
        this.props.AC_DELETE_FAQ(formData);
        this.props.AC_VIEW_FAQ();
    }
    componentDidMount() {
        this.props.AC_LIST_FAQ();
    }
    editFaq(event) {
        let faqId = event.target.id;
        this.setState({ editStatus: true, editId: faqId })
    }
    viewFaq(event) {
        let faqId = event.target.id;
        this.setState({ viewStatus: true, viewId: faqId })
    }
    render() {
        if (this.state.editStatus) {
            return <Redirect to={"/editFaq/" + this.state.editId} />
        }
        else if (this.state.viewStatus) {
            return <Redirect to={"/viewFaq/" + this.state.viewId} />
        }
        var TotalFaq = 0;
        var Active = 0;
        var Inactive = 0;
        var faqList = this.props.faqsReducer.faqList;
        if (faqList) {
            Active = 0;
            TotalFaq = faqList.length;
            Inactive = 0;
        }
        var Faq = this.props.faqsReducer.faqList;
        console.log("=-=-=-table=", Faq)
        var resultArray = [];
        if (Faq == 0) {
            resultArray.push(<label>No data found</label>)
        }
        else {
            for (var i = 0; i < Faq.length; i++) {
                var tempVal = "";
                if (Faq[i].status) {
                    tempVal = "Active";
                    Active++;
                } else {
                    tempVal = "Inactive"
                    Inactive++;
                }
                resultArray.push(<tr key={i} >
                    <th scope="row">{i + 1}</th>
                    <td>{Faq[i].question}</td>
                    <td>{Faq[i].answer}</td>
                    <td>{tempVal}</td>
                    <td>
                        <button type="button" id={Faq[i]._id} onClick={this.viewFaq} class="btn btn-primary m-2">View</button>
                        <button type="button" id={Faq[i]._id} onClick={this.editFaq} class="btn btn-success m-2">Edit</button>
                        <button type="button" id={Faq[i]._id} onClick={this.delete} class="btn btn-danger m-2">Delete</button>
                    </td>
                </tr>
                )
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
                                </span> List FAQ
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
                                        <h4 class="font-weight-normal mb-3">Total FAQ <i class="mdi mdi-chart-line mdi-24px float-right"></i>
                                        </h4>
                                        <h2 class="mb-5">{TotalFaq}</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 stretch-card grid-margin">
                                <div class="card bg-gradient-info card-img-holder text-white">
                                    <div class="card-body">
                                        <img src="assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                                        <h4 class="font-weight-normal mb-3">Active FAQ <i class="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                                        </h4>
                                        <h2 class="mb-5">{Active}</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 stretch-card grid-margin">
                                <div class="card bg-gradient-success card-img-holder text-white">
                                    <div class="card-body">
                                        <img src="assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                                        <h4 class="font-weight-normal mb-3">Inactive FAQ <i class="mdi mdi-diamond mdi-24px float-right"></i>
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
                                            <th scope="col"> Questions</th>
                                            <th scope="col">Answers</th>
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
        faqsReducer: state.FAQ_Reducer
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ AC_LIST_FAQ, AC_DELETE_FAQ }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(listFaqs);

