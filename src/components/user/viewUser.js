import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AC_LIST_USER, AC_VIEW_USER } from '../actions/user';
class viewUser extends React.Component {
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
        }
    }

    validation() {
        const name = this.props.userReducer.userInfo.name;
        const email = this.props.userReducer.userInfo.email;
        const mobile = this.props.userReducer.userInfo.mobile;
        const id = this.props.userReducer.userInfo.id;
        let formData = {
            name : name,
            email:email,
            mobile:mobile,
            id : id
        }
        console.log("-=-formData=-=-",formData);
    }

    handleInputChange(event) {
        let name = event.target.id;
        let value = event.target.value;
        this.props.AC_HANDLE_INPUT_CHANGE(name,value);
    }
    componentWillMount() {
        let userId = this.props.match.params.id;
        let formData = {id:userId}
        this.props.AC_VIEW_USER(formData);
    }


    render() {
        const name = this.props.userReducer.userInfo.name;
        const email = this.props.userReducer.userInfo.email;
        const mobile = this.props.userReducer.userInfo.mobile;
        return (
            <div className="container-fluid">
                <h3 class="page-title"><span class="page-title-icon bg-gradient-primary text-white me-2" style={{ marginLeft: '37px', marginTop: '47px' }}><i class="mdi mdi-comment-plus-outline"></i></span>View User</h3>
                <div className="row">
                    <div className="col-md-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <form className="forms-sample" id="editFaq">
                                    <div className="form-group">
                                        <label for="exampleInputUsername1">Name</label>
                                        <input type="text" autoComplete='off' placeholder="Country" id="name" value={name} style={{ borderColor: this.state.color0 }} className="form-control" disabled/>

                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputUsername1">Email</label>
                                        <input type="text" autoComplete='off' placeholder="Code" id="code" value={email}  style={{ borderColor: this.state.color1 }} className="form-control" disabled/>

                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputUsername1">Mobile</label>
                                        <input type="text" autoComplete='off' placeholder="Code" id="code" value={mobile} style={{ borderColor: this.state.color1 }} className="form-control" disabled/>

                                    </div>
                                    <button type="button" className="btn btn-gradient-primary me-2" style={{
                                        backgroundColor: 'blue',
                                        color: 'white'
                                    }} onClick={this.validation}>Back</button>
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
        userReducer: state.USER_Reducer
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ AC_LIST_USER, AC_VIEW_USER}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(viewUser);