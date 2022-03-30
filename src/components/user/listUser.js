import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AC_LIST_USER} from '../actions/user';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom'
class listUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
        }
        this.viewUser = this.viewUser.bind(this);
    }

    viewUser(event) {
        let userId= event.target.id;
        this.setState({ viewStatus: true, viewId: userId })
    }
    componentDidMount() {
        this.props.AC_LIST_USER();
    }

    render() {
        if (this.state.viewStatus) {
            return <Redirect to={"/viewUser/" + this.state.viewId} />
        }
        var User = this.props.userReducer.userList;
        console.log("=-=-=-table=", User)
        var resultArray = [];
        if (User == 0) {
            resultArray.push(<label>No Data Found</label>)
        }
        else {
            for (var i = 0; i < User.length; i++) {
                resultArray.push(<tr key={i} >
                    <th scope="row">{i + 1}</th>
                    <td>{User[i].name}</td>
                    <td>{User[i].email}</td>
                    <td>{User[i].mobile}</td>
                    <td>
                        <button type="button" id={User[i]._id} onClick={this.viewUser} class="btn btn-success">View</button>
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
                                </span> List User
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
                            <div class="table">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">S.No</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Mobile</th>
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
        userReducer: state.USER_Reducer
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ AC_LIST_USER }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(listUser);