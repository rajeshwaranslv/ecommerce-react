import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AC_LIST_NEWSLETTER, AC_DELETE_NEWSLETTER} from '../actions/newsletter';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom'
import Parser from 'html-react-parser';
class ListNewsletter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            nameerror: false,
            nameCountError: false,
            subject: '',
            subjectError: false,
            subjectCountError: false,            
            status: '',
            statusError: false,
            newsId: '',
            listnews: true,
            editnews: false,
            editStatus: false,
            editId: '',
            viewId: ''
        }
        this.delete = this.delete.bind(this);
        this.editnews = this.editnews.bind(this);
        this.viewnews = this.viewnews.bind(this);
    }
    delete(event) {
        var newsId = event.target.id;
        swal({
            title: "Are you sure?",
            text: "Once deleted, the file will deleted permanently!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                this.deletenews(newsId);
                swal("Newsletter Deleted Successfully!", {
                    buttons: false,
                    icon: "success",
                })
            } else {
                swal('Newsletter not deleted!',);
            }
        });
    }
    deletenews(newsId) {
        var formData = {
            id: newsId
        }
        this.props.AC_LIST_NEWSLETTER();
        this.props.AC_DELETE_NEWSLETTER(formData);
        this.props.AC_VIEW_NEWSLETTER();
        setTimeout(
            () => this.setState({ listImage: true }),
            3000
        );
    }
    componentDidMount() {
        this.props.AC_LIST_NEWSLETTER();
    }
    editnews(event) {
        let newsId = event.target.id;
        this.setState({ editStatus: true, editId: newsId })
    }
    viewnews(event) {
        let newsId = event.target.id;
        this.setState({ viewStatus: true, viewId: newsId })
    }
    render() {
        if (this.state.editStatus) {
            return <Redirect to={"/editnewsletter/" + this.state.editId} />
        }
        else if (this.state.viewStatus) {
            return <Redirect to={"/viewnewsletter/" + this.state.viewId} />
        }
        var Totalnews = 0;
        var Active = 0;
        var Inactive = 0;
        var newsList = this.props.newsletterReducer.newsletterList;
        if (newsList) {
            Active = 0;
            Totalnews = newsList.count;
            Inactive = 0;
        }
        var news = this.props.newsletterReducer.newsletterList.data;
        console.log("=-=-=-table=", news)
        var resultArray = [];
        if (news && news.length == 0) {
            resultArray.push(<label>No data found</label>)
        }
        if(news) {
            for (var i = 0; i < news.length; i++) {
                var tempVal = "";
                if (news[i].status) {
                    tempVal = "Active";
                    Active++;
                } else {
                    tempVal = "Inactive"
                    Inactive++;
                }
                resultArray.push(<tr key={i} >
                    <th scope="row">{i + 1}</th>
                    <td>{news[i].name}</td>
                    <td>{news[i].subject}</td>
                    <td>{Parser(news[i].template)}</td>
                    <td>{tempVal}</td>
                    <td>
                        <button type="button" id={news[i]._id} onClick={this.viewnews} class="btn btn-primary m-2">View</button>
                        <button type="button" id={news[i]._id} onClick={this.editnews} class="btn btn-success m-2">Edit</button>
                        <button type="button" id={news[i]._id} onClick={this.delete} class="btn btn-danger m-2">Delete</button>
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
                                </span> List Newsletter
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
                                        <h4 class="font-weight-normal mb-3">Total Newsletter <i class="mdi mdi-chart-line mdi-24px float-right"></i>
                                        </h4>
                                        <h2 class="mb-5">{Totalnews}</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 stretch-card grid-margin">
                                <div class="card bg-gradient-info card-img-holder text-white">
                                    <div class="card-body">
                                        <img src="assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                                        <h4 class="font-weight-normal mb-3">Active Newsletter <i class="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                                        </h4>
                                        <h2 class="mb-5">{Active}</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 stretch-card grid-margin">
                                <div class="card bg-gradient-success card-img-holder text-white">
                                    <div class="card-body">
                                        <img src="assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                                        <h4 class="font-weight-normal mb-3">Inactive Newsletter <i class="mdi mdi-diamond mdi-24px float-right"></i>
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
                                            <th scope="col">Name</th>
                                            <th scope="col">Subject</th>
                                            <th scope="col">Template</th>
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
        newsletterReducer: state.NEWSLETTER_Reducer
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ AC_LIST_NEWSLETTER, AC_DELETE_NEWSLETTER }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ListNewsletter);