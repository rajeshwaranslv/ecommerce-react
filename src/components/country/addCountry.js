import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AC_LIST_COUNTRY } from '../actions/country';
import { AC_ADD_COUNTRY } from '../actions/country';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';

class addCountry extends React.Component {
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
      editStatus: false
    }
    this.validation = this.validation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.back = this.back.bind(this)
  }

  validation() {
    var nameauth;
    const name = this.state.name;
    const code = this.state.code;
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

    if (code) {
      if (code.length < 1) {
        this.setState({ codeError: false, codeCountError: true })
      }
      else {
        this.setState({ codeError: false, codeCountError: false })
      }
    }
    else {
      this.setState({ codeError: true, codeCountError: false })
    }

    if (status) {
      this.setState({ statusError: false })
    }
    else {
      this.setState({ statusError: true })
    }
    if (name && code && status) {
      var tempVal;
      if (status == 'Active') {
        tempVal = true
      } else {
        tempVal = false
      }
      // document.getElementById('addCountry').reset();
      swal("Country Added Successfully!", {
        buttons: false,
        timer: 2000,
      });
      this.setState({ name: '', code: '', status: '' });
      const userData = {
        name: name,
        code: code,
        status: tempVal
      }
      this.props.AC_ADD_COUNTRY(userData);
      console.log('========Add COUNTRY========', userData)
    }
  }
  back() {
    this.setState({ editStatus: true })
  }
  handleInputChange(event) {
    const nameid = event.target.id;
    const namevalue = event.target.value;
    const codeid = event.target.id;
    const codevalue = event.target.value;
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

    if (codeid == "code") {
      this.setState({ code: codevalue })
      if (codevalue) {
        if (codevalue.length < 2) {
          this.setState({ codeError: false, codeCountError: true })
        }
        else {
          this.setState({ codeError: false, codeCountError: false })
        }
      }
      else {
        this.setState({ codeError: true, codeCountError: false })
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
      return <Redirect to='/listCountry' />
    }
    return (
      <div class="container-fluid pages" style={{ width: '600px', marginRight: '611px' }}>
        <h3 class="page-title"><span class="page-title-icon bg-gradient-primary text-white me-2" style={{ marginLeft: '37px', marginTop: '47px' }}><i class="mdi mdi-comment-plus-outline"></i></span>Add Country</h3>
        <div class="col-12 grid-margin stretch-card">
          <div class="card" >
            <div class="card-body">
              <form class="forms-sample">
                <div class="form-group">
                  <h5 style={{ fontSize: '0.875rem' }}>Country</h5>
                  <input type="text" placeholder="Country" id="name" value={this.state.name} onChange={this.handleInputChange} class="form-control" ></input>
                  {this.state.nameError ? <label class="mt-2" style={{ color: 'red' }}>Name is required</label> : ""}

                </div>
                <div class="form-group">
                  <h4 style={{ fontSize: '0.875rem' }}>Code</h4>
                  <input type="text" placeholder="Code" id="code" value={this.state.code} onChange={this.handleInputChange} class="form-control" ></input>
                  {this.state.codeError ? <label class="mt-2" style={{ color: 'red' }}>Code is required</label> : ""}
                </div>
                <div class="form-group">
                  <h4 style={{ fontSize: '0.875rem' }}>Status</h4>
                  <select class="form-control" id="status" onChange={this.handleInputChange} >
                    <option selected>Select status</option>
                    <option value="true" >Active</option>
                    <option value="false" >Inactive</option>
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
  console.log('map state', state);
  return {
    countryReducer: state.COUNTRY_Reducer
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ AC_LIST_COUNTRY, AC_ADD_COUNTRY }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(addCountry);
