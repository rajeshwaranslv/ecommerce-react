import React from 'react';
import { Link } from 'react-router-dom';
import { AC_ADD_IMAGE, AC_LIST_IMAGES, AC_DELETE_IMAGE } from "../actions/category";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom'

class listImages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listImage: true,
            viewStatus: false
        }
        this.deleteImage = this.deleteImage.bind(this)
        this.deleteImageOperation = this.deleteImageOperation.bind(this)
        this.viewImage = this.viewImage.bind(this);
        this.editImage = this.editImage.bind(this);

    }
    componentWillMount() {
        this.props.AC_LIST_IMAGES();
    }
    editImage(event) {
        let imageId = event.target.id;
        this.setState({ editStatus: true, editId: imageId })
    }
    viewImage(event) {
        let imageId = event.target.id;
        this.setState({ viewStatus: true, viewId: imageId })
    }
    deleteImage(event) {
        var datalistId = event.target.id;
        var deleteImageid = event.target.id;
        swal({
            title: "Are you sure?",
            text: "Do you want to Delete the Image!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.deleteImageOperation(datalistId);
                    swal("Image Deleted Successfully!", {
                        buttons: false,
                        icon: "success",
                    })
                } else {
                    swal('Image not deleted!',);
                }
            });
    }
    deleteImageOperation(datalistId) {
        var userData = {
            id: datalistId
        }

        this.props.AC_LIST_IMAGES();
        this.props.AC_DELETE_IMAGE(userData);
        this.props.AC_LIST_IMAGES();
        setTimeout(
            () => this.setState({ listImage: true }),
            3000
        );
    }

    render() {
        if (this.state.viewStatus) {
            return <Redirect to={'/viewImage' + '/' + this.state.viewId} />
        }
        if (this.state.editStatus) {
            return <Redirect to={'/editImage' + '/' + this.state.editId} />
        }
        var datalist = this.props.imagesReducer.listImages;
        var activecount = 0;
        var inactivecount = 0;
        var totalcount = 0;
        if (datalist) {
            activecount = 0;
            inactivecount = 0;
            totalcount = datalist.length;
        }
        var resultArray = [];
        if (datalist == 0) {
            resultArray.push(<label>No data found</label>)
        }
        else {
            for (var i = 0; i < datalist.length; i++) {
                var tempVal = "";
                if (datalist[i].status) {
                    tempVal = "Active";
                    activecount++;
                } else {
                    tempVal = "Inactive"
                    inactivecount++;
                }
                resultArray.push(<tr key={i} >
                    <td>{i + 1}</td>
                    <td>{datalist[i].category}</td>
                    <td ><img className='="img-thumbnail' src={"http://localhost:8000/uploads/" + datalist[i].filename}></img></td>
                    <td>{tempVal}</td>
                    <td>
                        <button type="button" id={datalist[i]._id} onClick={this.viewImage} class="btn btn-primary m-2">View</button>
                        <button type="button" id={datalist[i]._id} onClick={this.editImage} class="btn btn-success m-2">Edit</button>
                        <button type="button" id={datalist[i]._id} onClick={this.deleteImage} class="btn btn-danger m-2">Delete</button>
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
                                </span> List Image
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
                                        <h4 class="font-weight-normal mb-3">Total Image <i class="mdi mdi-chart-line mdi-24px float-right"></i>
                                        </h4>
                                        <h2 class="mb-5">{totalcount}</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 stretch-card grid-margin">
                                <div class="card bg-gradient-info card-img-holder text-white">
                                    <div class="card-body">
                                        <img src="assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                                        <h4 class="font-weight-normal mb-3">Active Image <i class="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                                        </h4>
                                        <h2 class="mb-5">{activecount}</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 stretch-card grid-margin">
                                <div class="card bg-gradient-success card-img-holder text-white">
                                    <div class="card-body">
                                        <img src="assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                                        <h4 class="font-weight-normal mb-3">Inactive Image <i class="mdi mdi-diamond mdi-24px float-right"></i>
                                        </h4>
                                        <h2 class="mb-5">{inactivecount}</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="table">
                                <table class="table" >
                                    <thead>
                                        <tr>
                                            <th scope="col">S.No</th>
                                            <th scope="col"> Category</th>
                                            <th scope="col">Image</th>
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
        )
    }
}

function mapStateToProps(state) {

    return {

        imagesReducer: state.imagesReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ AC_ADD_IMAGE, AC_LIST_IMAGES, AC_DELETE_IMAGE }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(listImages);

