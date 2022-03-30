import React from 'react';
import { AC_ADD_IMAGE, AC_LIST_IMAGES } from "../actions/category";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import Default from "../../images/default image.png";
import { Redirect } from 'react-router-dom';

class addImage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            category: '',
            categoryError: false,
            categoryCountError: false,
            color0: '',
            file: {},
            fileError: '',
            color1: "",
            status: '',
            statusError: false,
            color2: '',
            imagedefault: Default,
            imgSrc: '',
            editStatus: false
        }
        this.validation = this.validation.bind(this)
        this.inputchange = this.inputchange.bind(this);
        this.back = this.back.bind(this)
    }
    componentDidMount() {
        this.props.AC_LIST_IMAGES();
    }
    validation() {
        const category = this.state.category;
        const filedata = this.state.file;
        const status = this.state.status

        if (category) {
            if (category.length < 5) {
                this.setState({ categoryError: false, categoryCountError: true, color0: "red" })
            }
            else {
                this.setState({ categoryError: false, categoryCountError: false, color0: "" })
            }
        }
        else {
            this.setState({ categoryError: true, categoryCountError: false, color0: "red" })
        }
        if (filedata.name) {
            this.setState({ fileError: false })
        }
        else {
            this.setState({ fileError: true })
        }
        console.log("--=-=filedata", filedata.name)


        if (status) {
            this.setState({ statusError: false, color2: '' })
        }
        else {
            this.setState({ statusError: true, color2: '1px solid red' })
        }

        if (category && filedata && status) {
            document.getElementById('addImage').reset();
            swal("Image Added Successfully!", {
                buttons: false,
                icon: "success"
            });
            this.setState({ category: '', filedata: '', status: '' });
        }
        var tempVal;
        if (status == 'active') {
            tempVal = true
        } else {
            tempVal = false
        }
        var formdata = new FormData();
        formdata.append("category", category);
        formdata.append('image', filedata);
        formdata.append("status", tempVal);
        this.props.AC_LIST_IMAGES();
        this.props.AC_ADD_IMAGE(formdata);
        this.props.AC_LIST_IMAGES();
    }


    inputchange(event) {
        const fileid = event.target.id;
        const fieldId = event.target.id;
        const fieldValue = event.target.value;

        if (fieldId == "category") {
            this.setState({ category: fieldValue })
            if (fieldValue) {
                if (fieldValue.length < 1) {
                    this.setState({ categoryError: false, categoryCountError: true, color0: 'red' })
                }
                else {
                    this.setState({ categoryError: false, categoryCountError: false, color0: '' })
                }
            }
            else {
                this.setState({ categoryError: true, categoryCountError: false, color0: '' })
            }
        }
        if (fileid === "upload") {
            let file = event.target.files[0];
            this.setState({ file: file, fileError: false })
        }
        var file = this.refs.file.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            this.setState({
                imgSrc: [reader.result]
            })
        }.bind(this);
        console.log("url", url)

        if (fieldId === "status") {
            this.setState({ status: fieldValue })
            if (fieldValue) {
                this.setState({ statusError: false, color2: '' })
            }
            else {
                this.setState({ statusError: true, color2: '1px solid red' })
            }
        }
    }
    back() {
        this.setState({ editStatus: true })
    }
    render() {
        if (this.state.editStatus) {
            return <Redirect to='/listImages' />
        }
        return (
            <>
                <div class="container-fluid pages" style={{ width: '600px', marginRight: '611px' }}>
                    <h3 class="page-title"><span class="page-title-icon bg-gradient-primary text-white me-2" style={{ marginLeft: '37px', marginTop: '47px' }}><i class="mdi mdi-comment-plus-outline"></i></span>Add Image</h3>
                    <div class="col-12 grid-margin stretch-card">
                        <div class="card" >
                            <div class="card-body">
                                <form className="forms-sample" id="addImage">
                                    <div className="form-group">
                                        <label for="exampleInputUsername1">Category</label>
                                        <input type="text" autoComplete='off' placeholder="Category" id="category" value={this.state.category} onChange={this.inputchange} style={{ borderColor: this.state.color0 }} className="form-control" />
                                        {this.state.categoryError ? <label className="mt-2" style={{ color: 'red' }}>Categroy is required</label> : ""}
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputUsername1">Image</label>
                                        {this.state.imgSrc ?
                                            <img src={this.state.imgSrc} style={{ width: "100px", height: "100px" }} class=" round rounded ml-auto d-block" alt="" /> :
                                            <img src={Default} style={{ width: "100px", height: "100px" }} class=" round rounded ml-auto d-block" alt="" />}
                                        <br />
                                        <input type="file" id="upload" ref="file" name="user[image]" multiple="true" onChange={this.inputchange} style={{ borderColor: this.state.color1, }}></input>
                                        <br />
                                        {this.state.fileError ? <label className="mt-2" style={{ color: 'red' }}>Image is required</label> : ""}
                                    </div>

                                    <div className="form-group" >
                                        <label for="exampleInputUsername1">Status</label>
                                        <select className="form-control" id="status" onChange={this.inputchange} style={{ backgroundColor: 'white' }} onChange={this.inputchange} style={{ borderColor: this.state.color0 }} >
                                            <option value="Status">Status</option>
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                        {this.state.statusError ? <label className="mt-2" style={{ color: 'red' }}>Status is required</label> : ""}
                                    </div>
                                    <button type="button" className="btn btn-submit btn-gradient-primary me-2" style={{
                                        backgroundColor: 'blue',
                                        color: 'white',
                                        borderRadius: '2rem'
                                    }} onClick={this.validation}>Submit</button>
                                    <button type="button" className="btn btn-cancel btn-gradient-primary me-2" style={{
                                        backgroundColor: 'blue',
                                        color: 'white',
                                        borderRadius: '2rem'
                                    }} onClick={this.back}>Cancel</button>
                                </form>
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
        image: state.imagesReducer
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ AC_ADD_IMAGE, AC_LIST_IMAGES }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(addImage);
