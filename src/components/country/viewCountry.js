import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AC_LIST_COUNTRY, AC_ADD_COUNTRY, AC_VIEW_COUNTRY, AC_HANDLE_INPUT_CHANGE } from '../actions/country';
import { Redirect } from 'react-router-dom';
// import swal from 'sweetalert';
class viewCountry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            codeError: false,
            codeCountError: false,
            name: '',
            nameError: false,
            nameCountError: false,
            status: '',
            statusError: false,
            editStatus:false
        }
        this.validation = this.validation.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.back=this.back.bind(this)
    }

    validation() {
        const name = this.props.countryReducer.countryInfo.name;
        const code = this.props.countryReducer.countryInfo.code;
        const status = this.props.countryReducer.countryInfo.status;
        const id = this.props.countryReducer.countryInfo.id;
        let formData = {
            name : name,
            code : code,
            status : status,
            id : id
        }
        console.log("-=-formData=-=-",formData);
        this.props.AC_ADD_COUNTRY(formData);
    }

    handleInputChange(event) {
        let name = event.target.id;
        let value = event.target.value;
        this.props.AC_HANDLE_INPUT_CHANGE(name,value);
    }
    componentWillMount() {
        let countryId = this.props.match.params.id;
        let formData = {id:countryId}
        this.props.AC_VIEW_COUNTRY(formData);
    }
    back(){
        this.setState({ editStatus: true })
      }
    render() {
        if (this.state.editStatus) {
            return <Redirect to='/listCountry' />
          }
        const name = this.props.countryReducer.countryInfo.name;
        const code = this.props.countryReducer.countryInfo.code;
        const status = this.props.countryReducer.countryInfo.status;
        return (
            <div className="container-fluid">
            <h3 class="page-title"><span class="page-title-icon bg-gradient-primary text-white me-2" style={{ marginLeft: '37px', marginTop: '47px' }}><i class="mdi mdi-comment-plus-outline"></i></span>View Country</h3>
                <div className="row">
                    <div className="col-md-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <form className="forms-sample" id="editFaq">
                                    <div className="form-group">
                                        <label for="exampleInputUsername1">Country</label>
                                        <input type="text" autoComplete='off' placeholder="Country" id="name" value={name} onChange={this.handleInputChange} style={{ borderColor: this.state.color0 }} className="form-control" disabled/>
                                        {this.state.countryError ? <label className="mt-2" style={{ color: 'red' }}>Country is required</label> : ""}
                                        {this.state.countryCountError ? <label className="mt-2" style={{ color: 'red' }}>Country should be atleast 3 characters</label> : ""}

                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputUsername1">Code</label>
                                        <input type="text" autoComplete='off' placeholder="Code" id="code" value={code} onChange={this.handleInputChange} style={{ borderColor: this.state.color1 }} className="form-control" disabled/>
                                        {this.state.codeError ? <label className="mt-2" style={{ color: 'red' }}>Code is required</label> : ""}
                                        {this.state.codeCountError ? <label className="mt-2" style={{ color: 'red' }}>Code should be atleast 2 characters</label> : ""}

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
                                    <button type="button" className="btn btn-submit btn-submit btn-gradient-primary me-2" style={{
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
        countryReducer: state.COUNTRY_Reducer
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ AC_LIST_COUNTRY, AC_ADD_COUNTRY, AC_VIEW_COUNTRY,AC_HANDLE_INPUT_CHANGE }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(viewCountry);