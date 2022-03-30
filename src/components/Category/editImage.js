import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AC_ADD_IMAGE, AC_LIST_IMAGES, AC_VIEW_IMAGE, AC_HANDLE_INPUT_CHANGE } from '../actions/category';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';

class editImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewStatus: false,
            file: ''
        }
        this.back = this.back.bind(this);
        this.inputchange = this.inputchange.bind(this);
        this.validation = this.validation.bind(this);
    }

    back() {
        this.setState({ viewStatus: true });
    }
    componentWillMount() {
        let imageId = this.props.match.params.id;
        let formData = { id: imageId }
        this.props.AC_VIEW_IMAGE(formData);
    }
    validation() {
        console.log("validation", this.props);
        const category = this.props.images_Reducer.imageInfo.category;
        const filedata = this.state.file
        const status = this.props.images_Reducer.imageInfo.status;
        const id = this.props.match.params.id;

        if (category && filedata && status) {
            document.getElementById('addImage').reset();
            swal("Image edited Successfully!", {
                buttons: false,
                icon: "success"
            });
            this.setState({ category: '', filedata: '', status: '' });
        }

        let formdata = new FormData();
        formdata.append("category", category);
        formdata.append('image', filedata);
        formdata.append("status", status);
        formdata.append("id", id);
        this.props.AC_ADD_IMAGE(formdata);
    }
    inputchange(event) {
        console.log("event");
        let category = event.target.id;
        let value = event.target.value
        if (category == 'status') {
            let status = value == 'active' ? true : false
            console.log("imagestatus", status);
            this.props.AC_HANDLE_INPUT_CHANGE(category, status)
        } else {
            this.props.AC_HANDLE_INPUT_CHANGE(category, value)
        }
        if (category == 'upload') {
            let file = event.target.files[0];
            this.setState({ file: file })
        }
    }
    render() {
        const category = this.props.images_Reducer.imageInfo.category;
        var datalist = this.props.images_Reducer.listImages;
        const filename = this.props.images_Reducer.imageInfo.filename;
        const status = this.props.images_Reducer.imageInfo.status;
        if (this.state.viewStatus) {
            return <Redirect to='/listImages' />
        }

        return (
            <div className="container-fluid">
                <h3 class="page-title"><span class="page-title-icon bg-gradient-primary text-white me-2" style={{ marginLeft: '37px', marginTop: '47px' }}><i class="mdi mdi-comment-plus-outline"></i></span>Edit Image</h3>
                <div className="row">
                    <div className="col-md-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <form className="forms-sample" id="editImage">
                                    <div className="form-group">
                                        <label for="exampleInputUsername1">Category</label>
                                        <input type="text" autoComplete='off' onChange={this.inputchange} placeholder="Category" id="category" value={category} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputUsername1">Image</label>
                                        <td ><img className='="img-thumbnail' style={{ width: "100px", height: "100px" }} src={"http://localhost:8000/uploads/" + filename}></img></td><br />
                                        <input type="file" id="upload" ref="file" name="user[image]" multiple="true" onChange={this.inputchange} style={{ borderColor: this.state.color1, }}></input>
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputUsername1">Status</label>
                                        <select className="form-control" id="status" onChange={this.inputchange} style={{ backgroundColor: 'white' }} >
                                            <option value="Status">Select Status</option>
                                            <option value="active" selected={status == true}>Active</option>
                                            <option value="inactive" selected={status == false}>Inactive</option>
                                        </select>
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
            </div>
        );
    }
}
function mapStateToProps(state) {
    console.log('map state', state);
    return {
        images_Reducer: state.imagesReducer
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ AC_ADD_IMAGE, AC_LIST_IMAGES, AC_VIEW_IMAGE, AC_HANDLE_INPUT_CHANGE }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(editImage);
