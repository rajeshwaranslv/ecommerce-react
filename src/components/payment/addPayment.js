import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AC_LIST_PAYMENT } from '../actions/payment';
import { AC_ADD_PAYMENT } from '../actions/payment';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';

class addPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: '',
      name: '',
      nameError: false,
      nameCountError: false,
      status: '',
      statusError: false,
      editStatus: false
    }
    this.validation = this.validation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.back = this.back.bind(this)
  }

  validation() {
    const name = this.state.name;
    const mode = this.state.mode;
    const status = this.state.status
    if (name) {
      if (name.length < 1) {
        this.setState({ nameError: false, nameCountError: true })
      }
      else {
        this.setState({ nameError: false, nameCountError: false })
      }
    }
    else {
      this.setState({ nameError: true, nameCountError: false })
    }
    
    if (mode) {
      this.setState({ modeError: false })
    }
    else {
      this.setState({ modeError: true })
    }

    if (status) {
      this.setState({ statusError: false })
    }
    else {
      this.setState({ statusError: true })
    }
    
    if (name && status) {
      swal("Payment Added Successfully!", {
        buttons: false,
        timer: 2000,
      });
      this.setState({ name: '', mode: '', status: '' });

      var tempVal;
      if (status == 'Active') {
        tempVal = true
      } else {
        tempVal = false
      }
  
      const userData = {
        name: name,
        mode:mode,
        status: tempVal
      }
      this.props.AC_ADD_PAYMENT(userData);
    }
  }
  back() {
    this.setState({ editStatus: true })
  }
  handleInputChange(event) {
    const nameid = event.target.id;
    const namevalue = event.target.value;
    const modeid = event.target.id;
    const modevalue = event.target.value;
    const statusid = event.target.id;
    const statusvalue = event.target.value;
    if (nameid == "name") {
      this.setState({ name: namevalue })
      if (namevalue) {
        if (namevalue.length < 3) {
          this.setState({ nameError: false, nameCountError: true })
        }
        else {
          this.setState({ nameError: false, nameCountError: false })
        }
      }
      else {
        this.setState({ nameError: true, nameCountError: false })
      }
    }

    if (modeid == "mode") {
      this.setState({ mode: modevalue })
      if (modevalue) {
        this.setState({ modeError: false })
      }
      else {
        this.setState({ modeError: true })
      }
    }

    if (statusid == "status") {
      this.setState({ status: statusvalue })
      if (statusvalue) {
        this.setState({ statusError: false })
      }
      else {
        this.setState({ statusError: true })
      }
    }
  }
  render() {
    if (this.state.editStatus) {
      return <Redirect to='/listPayment' />
    }
    return (
      <div class="container-fluid pages" style={{ width: '600px', marginRight: '611px' }}>
        <h3 class="page-title"><span class="page-title-icon bg-gradient-primary text-white me-2" style={{ marginLeft: '37px', marginTop: '47px' }}><i class="mdi mdi-comment-plus-outline"></i></span>Add Payment</h3>
        <div class="col-12 grid-margin stretch-card">
          <div class="card" >
            <div class="card-body">
              <form class="forms-sample">
                <div class="form-group">
                  <h5 style={{ fontSize: '0.875rem' }}>Name</h5>
                  <input type="text" placeholder="name" id="name" value={this.state.name} onChange={this.handleInputChange} class="form-control" ></input>
                  {this.state.nameError ? <label class="mt-2" style={{ color: 'red' }}>Name is required</label> : ""}
                </div>

                <div class="form-group">
                  <label>
                    Mode:</label>
                    <div>
                      <input onChange={this.handleInputChange} type="radio" value="Sandbox" id="mode" name="mode"/>Sandbox
                      <input onChange={this.handleInputChange} type="radio" value="Live" id="mode" name="mode"/>Live
                    </div>
                </div>

                <div class="form-group">
                  <h4 style={{ fontSize: '0.875rem' }}>Status</h4>
                  <select class="form-control" id="status" onChange={this.handleInputChange} >
                    <option selected>Select status</option>
                    <option value="Active" >Active</option>
                    <option value="Inactive" >Inactive</option>
                  </select>
                  {this.state.statusError ? <label class="mt-2" style={{ color: 'red' }}>Status is required</label> : ""}
                </div>
                <button type="button" class="btn btn-submit btn-gradient-primary me-2" style={{ backgroundColor: 'blue', color: 'white', borderRadius: '2rem' }} onClick={this.validation}>Submit</button>
                <button type="button" class="btn btn-cancel btn-gradient-primary me-2" style={{ backgroundColor: 'blue', color: 'white', borderRadius: '2rem' }} onClick={this.back}>Cancel</button>
              </form>
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
  return bindActionCreators({ AC_LIST_PAYMENT, AC_ADD_PAYMENT }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(addPayment);
