import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AC_LIST_PAGE, AC_ADD_PAGE, AC_VIEW_PAGE, AC_HANDLE_INPUT_CHANGE } from '../actions/pages';
// import swal from 'sweetalert';

class viewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            titleError: false,
            titleCountError: false,
            description: '',
            descriptionError: false,
            descriptionCountError: false,
            status: '',
            statusError: false,

        }
        this.validation = this.validation.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

    }

    validation() {
        const title = this.props.pageReducer.pageInfo.title;
        const description = this.props.pageReducer.pageInfo.description;
        const status = this.props.pageReducer.pageInfo.status;
        const id = this.props.pageReducer.pageInfo.id;
        let formData = {
            title: title,
            description: description,
            status: status,
            id: id
        }
        console.log("-=-formData=-=-", formData);
        this.props.AC_ADD_PAGE(formData);
    }

    handleInputChange(event) {
        let name = event.target.id;
        let value = event.target.value;
        this.props.AC_HANDLE_INPUT_CHANGE(name, value);
    }
    componentWillMount() {
        let pageId = this.props.match.params.id;
        let formData = { id: pageId }
        this.props.AC_VIEW_PAGE(formData);
    }
    render() {
        const title = this.props.pageReducer.pageInfo.title;
        const description = this.props.pageReducer.pageInfo.description;
        const status = this.props.pageReducer.pageInfo.status;
        return (
            <div className="container-fluid">
                <h3 class="page-title"><span class="page-title-icon bg-gradient-primary text-white me-2" style={{ marginLeft: '37px', marginTop: '47px' }}><i class="mdi mdi-comment-plus-outline"></i></span>View Page</h3>
                <div className="row">
                    <div className="col-md-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <form className="forms-sample" id="editPage">
                                    <div className="form-group">
                                        <label for="exampleInputUsername1">Title</label>
                                        <input type="text" autoComplete='off' placeholder="Title" id="Title" value={title} onChange={this.handleInputChange} style={{ borderColor: this.state.color0 }} className="form-control" disabled />
                                        {this.state.titleError ? <label className="mt-2" style={{ color: 'red' }}>Title is required</label> : ""}
                                        {this.state.titleCountError ? <label className="mt-2" style={{ color: 'red' }}>Title should be atleast 5 characters</label> : ""}

                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputUsername1">Description</label>
                                        <input type="text" autoComplete='off' placeholder="Description" id="description" value={description} onChange={this.handleInputChange} style={{ borderColor: this.state.color1 }} className="form-control" disabled />
                                        {this.state.descriptionError ? <label className="mt-2" style={{ color: 'red' }}>Description is required</label> : ""}
                                        {this.state.descriptionCountError ? <label className="mt-2" style={{ color: 'red' }}>Description should be atleast 5 characters</label> : ""}

                                    </div>
                                    <div class="form-group">
                                        <h4 style={{ fontSize: '0.875rem' }}>Status</h4>
                                        <select class="form-control" id="status" value={status} style={{ outline: this.state.color2 }} onChange={this.handleInputChange} disabled >
                                            <option value="">Select Status</option>
                                            <option value="true" selected={status == true}>Active</option>
                                            <option value="false" selected={status == false}>Inactive</option>
                                        </select>
                                        {this.state.statusError ? <label class="mt-2" style={{ color: 'red' }}>Status is required</label> : ""}
                                    </div>
                                    <button type="button" className="btn btn-submit btn-gradient-primary me-2" style={{ backgroundColor: 'blue', color: 'white', borderRadius: '2rem' }} onClick={this.validation}>Submit</button>
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
    console.log('map state =====================', state);
    return {
        pageReducer: state.PAGE_Reducer
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ AC_LIST_PAGE, AC_ADD_PAGE, AC_VIEW_PAGE, AC_HANDLE_INPUT_CHANGE }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(viewPage)