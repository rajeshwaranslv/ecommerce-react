import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AC_LIST_CONFIGURATION } from '../actions/config';
import { AC_ADD_CONFIGURATION } from '../actions/config';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';

class addConfiguration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: '',
      slugError: false,
      slugCountError: false,

      name: '',
      nameError: false,
      nameCountError: false,

      description:'',
      descriptionError: false,
      descriptionCountError: false,

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
    const slug = this.state.slug;
    const description=this.state.description;
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

    if (slug) {
      if (slug.length < 1) {
        this.setState({ slugError: false, slugCountError: true })
      }
      else {
        this.setState({ slugError: false, slugCountError: false })
      }
    }
    else {
      this.setState({ slugError: true, slugCountError: false })
    }

    if (status) {
      this.setState({ statusError: false })
    }
    else {
      this.setState({ statusError: true })
    }
    if (name && slug && status && description) {
      var tempVal;
      if (status == 'Active') {
        tempVal = true
      } else {
        tempVal = false
      }
 
      swal("Configuration Added Successfully!", {
        buttons: false,
        timer: 2000,
      });


      this.setState({ name: '', slug: '', status: '',description:'' });
      const userData = {
        name: name,
        slug: slug,
        description:description,
        status: tempVal
      }
      this.props.AC_ADD_CONFIGURATION(userData);
      console.log('========Add Configuration========', userData)
    }
  }
  back() {
    this.setState({ editStatus: true })
  }
  handleInputChange(event) {
    const nameid = event.target.id;
    const namevalue = event.target.value;

    const slugid = event.target.id;
    const slugvalue = event.target.value;

    const descriptionid = event.target.id;
    const descriptionvalue = event.target.value;

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

    if (slugid == "slug") {
      this.setState({ slug: slugvalue })
      if (slugvalue) {
        if (slugvalue.length < 2) {
          this.setState({ slugError: false, slugCountError: true })
        }
        else {
          this.setState({ slugError: false, slugCountError: false })
        }
      }
      else {
        this.setState({ slugError: true, slugCountError: false })
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
    if (descriptionid == "description") {
      this.setState({ description: descriptionvalue })
      if (descriptionvalue) {
        this.setState({ descriptionError: false })
      }
      else {
        this.setState({ descriptionError: true })
      }
    }
  }
  render() {
    if (this.state.editStatus) {
      return <Redirect to='/listConfiguration' />
    }
    return (
      <div class="container-fluid pages" style={{ width: '600px', marginRight: '611px' }}>
        <h3 class="page-title"><span class="page-title-icon bg-gradient-primary text-white me-2" style={{ marginLeft: '37px', marginTop: '47px' }}><i class="mdi mdi-comment-plus-outline"></i></span>Add Configuration</h3>
        <div class="col-12 grid-margin stretch-card">
          <div class="card" >
            <div class="card-body">
              <form class="forms-sample">
                <div class="form-group">
                  <h5 style={{ fontSize: '0.875rem' }}>Configuration</h5>
                  <input type="text" placeholder="Configuration" id="name" onChange={this.handleInputChange} class="form-control" ></input>
                  {this.state.nameError ? <label class="mt-2" style={{ color: 'red' }}>Configuration is required</label> : ""}
                </div>
                <div class="form-group">
                  <h4 style={{ fontSize: '0.875rem' }}>Slug</h4>
                  <input type="text" placeholder="Slug" id="slug"  onChange={this.handleInputChange} class="form-control" ></input>
                  {this.state.slugError ? <label class="mt-2" style={{ color: 'red' }}>Slug is required</label> : ""}
                </div>
                <div class="form-group">
                  <h4 style={{ fontSize: '0.875rem' }}>Description</h4>
                  <input type="text" placeholder="Description" id="description"   onChange={this.handleInputChange} class="form-control" ></input>
                  {this.state.descriptionError ? <label class="mt-2" style={{ color: 'red' }}>Description is required</label> : ""}
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
    configReducer: state.CONFIGURATION_Reducer
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ AC_LIST_CONFIGURATION, AC_ADD_CONFIGURATION }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(addConfiguration)