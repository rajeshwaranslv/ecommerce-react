import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AC_LIST_PAYMENT, AC_ADD_PAYMENT, AC_VIEW_PAYMENT, AC_HANDLE_INPUT_CHANGE } from '../actions/payment';
import { Redirect } from 'react-router-dom';
// import swal from 'sweetalert';
class editPayment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: '',
            modeError: false,
            modeCountError: false,
            name: '',
            nameError: false,
            nameCountError: false,
            status: '',
            statusError: false,
            editStatus: false,
        }
        this.validation = this.validation.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.back = this.back.bind(this);
    }

    validation() {
        const name = this.props.paymentReducer.paymentInfo.name;
        const mode = this.props.paymentReducer.paymentInfo.mode;
        const status = this.props.paymentReducer.paymentInfo.status;
        const id = this.props.paymentReducer.paymentInfo.id;
        let formData = {
            name: name,
            mode: mode,
            status: status,
            id: id
        }
        this.props.AC_ADD_PAYMENT(formData);
    }

    handleInputChange(event) {
        let name = event.target.id;
        let value = event.target.value;
        this.props.AC_HANDLE_INPUT_CHANGE(name, value);
    }
    componentWillMount() {
        let paymentId = this.props.match.params.id;
        let formData = { id: paymentId }
        this.props.AC_VIEW_PAYMENT(formData);
    }
    back() {
        this.setState({ editStatus: true })
    }
    render() {
        const name = this.props.paymentReducer.paymentInfo.name;
        const mode = this.props.paymentReducer.paymentInfo.mode;
        const status = this.props.paymentReducer.paymentInfo.status;
        console.log("payment mode",mode)
        if (this.state.editStatus) {
            return <Redirect to='/listPayment' />
        }
        return (
            <div className="container-fluid">
                <h3 class="page-title"><span class="page-title-icon bg-gradient-primary text-white me-2" style={{ marginLeft: '37px', marginTop: '47px' }}><i class="mdi mdi-comment-plus-outline"></i></span>Edit Payment</h3>
                <div className="row">
                    <div className="col-md-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <form className="forms-sample" id="editFaq">
                                    <div className="form-group">
                                        <label for="exampleInputUsername1">Payment</label>
                                        <input type="text" autoComplete='off' placeholder="Payment" id="name" value={name} onChange={this.handleInputChange} style={{ borderColor: this.state.color0 }} className="form-control" />
                                        {this.state.paymentError ? <label className="mt-2" style={{ color: 'red' }}>Payment is required</label> : ""}
                                        {this.state.paymentCountError ? <label className="mt-2" style={{ color: 'red' }}>Payment should be atleast 3 characters</label> : ""}

                                    </div>
                                    <div class="form-group">
                                        <label>
                                            Mode:</label>
                                        <div>
                                            <input onChange={this.handleInputChange} checked={mode} type="radio" value="Sandbox" id="mode" name="mode" />Sandbox
                                            <input onChange={this.handleInputChange} checked={mode} type="radio" value="Live" id="mode" name="mode" />Live
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputUsername1">Status</label>
                                        <select className="form-control" id="status" style={{ outline: this.state.color2 }} onChange={this.handleInputChange} >
                                            <option value="">Select Status</option>
                                            <option value="true" selected={status == true}>Active</option>
                                            <option value="false" selected={status == false}>Inactive</option>
                                        </select>
                                        {this.state.statusError ? <label className="mt-2" style={{ color: 'red' }}>Status is required</label> : ""}
                                    </div>
                                    <button type="button" className="btn btn-submit  btn-gradient-primary me-2" style={{
                                        backgroundColor: 'blue',
                                        color: 'white',
                                        borderRadius: '2rem'
                                    }} onClick={this.validation}>Submit</button>
                                    <button type="button" className="btn btn-cancel  btn-gradient-primary me-2" style={{
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
    return {
        paymentReducer: state.PAYMENT_Reducer
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ AC_LIST_PAYMENT, AC_ADD_PAYMENT, AC_VIEW_PAYMENT, AC_HANDLE_INPUT_CHANGE }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(editPayment);