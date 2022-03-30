import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AC_LIST_CONFIGURATION, AC_ADD_CONFIGURATION, AC_VIEW_CONFIGURATION, AC_HANDLE_INPUT_CHANGE } from '../actions/config';
import { Redirect } from 'react-router-dom';
// import swal from 'sweetalert';
class viewConfiguration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slug: '',
            slugError: false,
            slugCountError: false,
            
            name: '',
            nameError: false,
            nameCountError: false,

            description: '',
            descriptionError: false,
            descriptionCountError: false,

            status: '',
            statusError: false,
            editStatus:false
        }
        this.validation = this.validation.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.back=this.back.bind(this)
    }

    validation() {
        const name = this.props.configReducer.configInfo.name;
        const slug = this.props.configReducer.configInfo.slug;
        const description = this.props.configReducer.configInfo.description;
        const status = this.props.configReducer.configInfo.status;
        const id = this.props.configReducer.configInfo.id;
        let formData = {
            name : name,
            slug : slug,
            description:description,
            status : status,
            id : id
        }
        console.log("-=-formData=-=-",formData);
        this.props.AC_ADD_CONFIGURATION(formData);
    }

    handleInputChange(event) {
        let name = event.target.id;
        let value = event.target.value;
        this.props.AC_HANDLE_INPUT_CHANGE(name,value);
    }
    componentWillMount() {
        let configId = this.props.match.params.id;
        let formData = {id:configId}
        this.props.AC_VIEW_CONFIGURATION(formData);
    }
    back(){
        this.setState({ editStatus: true })
      }
    render() {
        if (this.state.editStatus) {
            return <Redirect to='/listConfig' />
          }
        const name = this.props.configReducer.configInfo.name;
        const slug = this.props.configReducer.configInfo.description;
        const description = this.props.configReducer.configInfo.slug;
        const status = this.props.configReducer.configInfo.status;
        return (
            <div className="container-fluid">
            <h3 class="page-title"><span class="page-title-icon bg-gradient-primary text-white me-2" style={{ marginLeft: '37px', marginTop: '47px' }}><i class="mdi mdi-comment-plus-outline"></i></span>View Country</h3>
                <div className="row">
                    <div className="col-md-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <form className="forms-sample" id="editFaq">
                                    <div className="form-group">
                                        <label for="exampleInputUsername1">Configuration</label>
                                        <input type="text" autoComplete='off' placeholder="Configuration" id="name" value={name} onChange={this.handleInputChange} style={{ borderColor: this.state.color0 }} className="form-control" disabled/>
                                        {this.state.configError ? <label className="mt-2" style={{ color: 'red' }}>Configuration is required</label> : ""}
                                        {this.state.configCountError ? <label className="mt-2" style={{ color: 'red' }}>Configuration should be atleast 3 characters</label> : ""}

                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputUsername1">Slug</label>
                                        <input type="text" autoComplete='off' placeholder="Code" id="slug" value={slug} onChange={this.handleInputChange} style={{ borderColor: this.state.color1 }} className="form-control" disabled/>
                                        {this.state.slugError ? <label className="mt-2" style={{ color: 'red' }}>Slug is required</label> : ""}
                                        {this.state.slugCountError ? <label className="mt-2" style={{ color: 'red' }}>Slug should be atleast 2 characters</label> : ""}

                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputUsername2">Description</label>
                                        <input type="text" autoComplete='off' placeholder="Description" id="description" value={description} onChange={this.handleInputChange} style={{ borderColor: this.state.color1 }} className="form-control" disabled/>
                                        {this.state.descriptionError ? <label className="mt-2" style={{ color: 'red' }}>Description is required</label> : ""}
                                        {this.state.descriptionCountError ? <label className="mt-2" style={{ color: 'red' }}>Description should be atleast 2 characters</label> : ""}

                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputUsername1">STATUS</label>
                                        <select className="form-control" id="status" style={{ outline: this.state.color2 }} onChange={this.handleInputChange} disabled>
                                            <option value="">Select Status</option>
                                            <option value="true" selected={status == true}>Active</option>
                                            <option value="false" selected={status == false}>Inactive</option>
                                        </select>
                                        {this.state.statusError ? <label className="mt-2" style={{ color: 'red' }}>Status is required</label> : ""}
                                    </div>
                                    <button type="button" className="btn btn-submit btn-gradient-primary me-2" style={{
                                        backgroundColor: 'blue',
                                        color: 'white',
                                        borderRadius:'2rem'
                                    }} onClick={this.back}>Back</button>
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
        configReducer: state.CONFIGURATION_Reducer
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ AC_LIST_CONFIGURATION, AC_ADD_CONFIGURATION, AC_VIEW_CONFIGURATION,AC_HANDLE_INPUT_CHANGE }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(viewConfiguration);