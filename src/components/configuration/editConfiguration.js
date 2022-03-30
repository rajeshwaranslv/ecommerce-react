import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  AC_ADD_CONFIGURATION_OPTION,
  AC_LIST_CONFIGURATION_OPTION,
  AC_DELETE_CONFIGURATION_OPTION,
  AC_VIEW_CONFIGURATION_OPTION,
} from "../actions/configOptions";
import {
  AC_LIST_CONFIGURATION,
  AC_ADD_CONFIGURATION,
  AC_VIEW_CONFIGURATION,
  AC_HANDLE_INPUT_CHANGE,
} from "../actions/config";
import { Redirect } from "react-router-dom";
// import swal from 'sweetalert';
 
class editConfiguration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //slug
      slug: "",
      slugError: false,
      slugCountError: false,
      //name
      name: "",
      nameError: false,
      nameCountError: false,
      //description
      description: "",
      descriptionError: false,
      descriptionCountError: false,
      //status
      status: "",
      statusError: false,
      editStatus: false,
      //slug Option
      slugOption: "",
      slugOptionError: false,
      slugOptionCountError: false,
      //Name Option
      nameOption: "",
      nameErrorOption: false,
      nameCountErrorOption: false,

      //sort Option
      sortOption: "",
      sortErrorOption: false,
      sortCountErrorOption: false,
      //description Option
      descriptionOption: "",
      descriptionErrorOPtion: false,
      descriptionCountErrorOption: false,
      //status Option
      statusOption: "",
      statusErrorOption: false,
      editStatusOption: false,
      addText: false,
    };
    this.validation = this.validation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validateOption = this.validateOption.bind(this);
    this.handleInputChangeOption = this.handleInputChangeOption.bind(this);
    this.back = this.back.bind(this);
  }
  validateOption() {
    var nameauth;
    const name = this.state.nameOption;
    const slug = this.state.slugOption;
    const sort = this.state.sortOption;
    const description = this.state.descriptionOption;
    const status = this.state.statusOption;
    if (name) {
      if (name.length < 1) {
        this.setState({ nameError: false, nameCountError: true });
      } else {
        this.setState({ nameError: false, nameCountError: false });
      }
    } else {
      this.setState({ nameError: true, nameCountError: false });
    }

    if (slug) {
      if (slug.length < 1) {
        this.setState({ slugError: false, slugCountError: true });
      } else {
        this.setState({ slugError: false, slugCountError: false });
      }
    } else {
      this.setState({ slugError: true, slugCountError: false });
    }

    if (status) {
      this.setState({ statusError: false });
    } else {
      this.setState({ statusError: true });
    }
    if (name && slug && status && description) {
      var tempVal;
      if (status == "Active") {
        tempVal = true;
      } else {
        tempVal = false;
      }

      //   swal("Configuration Added Successfully!", {
      //     buttons: false,
      //     timer: 2000,
      //   });

      const id = this.props.configReducer.configInfo.id;
      const userData = {
        name: name,
        slug: slug,
        sort: sort,
        parentId: id,
        description: description,
        status: tempVal,
      };
      this.props.AC_ADD_CONFIGURATION_OPTION(userData);
      console.log("========Add Configuration Option========", userData);
      this.setState({
        name: "",
        slug: "",
        status: "",
        description: "",
        sort: "",
      });
    }
  }

  validation() {
    const name = this.props.configReducer.configInfo.name;
    const slug = this.props.configReducer.configInfo.slug;
    const status = this.props.configReducer.configInfo.status;
    const description = this.props.configReducer.configInfo.description;
    const id = this.props.configReducer.configInfo.id;
    let formData = {
      name: name,
      slug: slug,
      description: description,
      status: status,
      id: id,
    };
    console.log("-=-formData=-=-", formData);
    this.props.AC_ADD_CONFIGURATION(formData);
  }

  handleInputChange(event) {
    let name = event.target.id;
    let value = event.target.value;
    this.props.AC_HANDLE_INPUT_CHANGE(name, value);
  }
  handleInputChangeOption(event) {
    let name = event.target.id;
    let value = event.target.value;
    if (name == "name") {
      this.setState({ nameOption: value });
    }
    if (name == "slug") {
      this.setState({ slugOption: value });
    }
    if (name == "description") {
      this.setState({ descriptionOption: value });
    }
    if (name == "sort") {
      this.setState({ sortOption: value });
    }
    if (name == "status") {
      this.setState({ statusOption: value });
    }
  }
  componentWillMount() {
    let configId = this.props.match.params.id;
    let formData = { id: configId };
    this.props.AC_VIEW_CONFIGURATION(formData);
    let formData1 = { parentId: configId };
    this.props.AC_LIST_CONFIGURATION_OPTION(formData1);
  }
  back() {
    this.setState({ editStatus: true });
  }
  add() {
    this.setState({
      addText: [...this.state.addText, {}],
    });
  }
  render() {
    console.log(this.props);
    const name = this.props.configReducer.configInfo.name;
    const slug = this.props.configReducer.configInfo.slug;
    const description = this.props.configReducer.configInfo.description;
    const status = this.props.configReducer.configInfo.status;
    // if (this.state.editStatus) {
    //   return <Redirect to="/listConfig" />;
    // }
    var Config = this.props.configOptionReducer.configOptionList;
    console.log("cat", name);
    var resultArray = [];
    if (Config == 0) {
      resultArray.push(<label>Data is Not Found</label>);
    } else {
      for (var i = 0; i < Config.length; i++) {
        var tempVal = "";
        if (Config[i].status) {
          tempVal = "Active";
        } else {
          tempVal = "Inactive";
        }
        resultArray.push(
          <tr key={i}>
            <th scope="row">{i + 1}</th>
            <td>{Config[i].name}</td>
            <td>{Config[i].slug}</td>
            <td>{Config[i].sort}</td>
            <td>{Config[i].description}</td>
            <td>{tempVal}</td>
            <td>
              <button
                type="button"
                id={Config[i]._id}
                onClick={this.viewConfig}
                class="btn btn-primary m-2"
              >
                View
              </button>
              <button
                type="button"
                id={Config[i]._id}
                onClick={this.editConfig}
                class="btn btn-success  m-2"
              >
                Edit
              </button>
              <button
                type="button"
                id={Config[i]._id}
                onClick={this.delete}
                class="btn btn-danger  m-2"
              >
                delete
              </button>
            </td>
          </tr>
        );
      }
    }
    return (
      <>
        <div className="container-fluid">
          <h3 class="page-title">
            <span
              class="page-title-icon bg-gradient-primary text-white me-2"
              style={{ marginLeft: "37px", marginTop: "47px" }}
            >
              <i class="mdi mdi-comment-plus-outline"></i>
            </span>
            Edit Configuration
          </h3>
          <div className="row row1">
            <div className="card">
              <div className="card-body">
                <form className="forms-sample" id="editFaq">
                  <div className="form-group">
                    <label for="exampleInputUsername1">Name</label>
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="Configuration"
                      id="name"
                      value={name}
                      onChange={this.handleInputChange}
                      style={{ width: "400px" }}
                      className="form-control"
                    />
                    {this.state.nameError ? (
                      <label className="mt-2" style={{ color: "red" }}>
                        Configuration is required
                      </label>
                    ) : (
                      ""
                    )}
                    {this.state.nameCountError ? (
                      <label className="mt-2" style={{ color: "red" }}>
                        Configuration should be atleast 3 characters
                      </label>
                    ) : (
                      ""
                    )}
                  </div>

                  <div
                    className="form-group"
                    style={{
                      position: "relative",
                      bottom: "93px",
                      left: "500px",
                    }}
                  >
                    <label for="exampleInputUsername1">Slug</label>
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="Slug"
                      id="slug"
                      value={slug}
                      onChange={this.handleInputChange}
                      style={{ width: "400px" }}
                      className="form-control"
                    />
                    {this.state.slugError ? (
                      <label className="mt-2" style={{ color: "red" }}>
                        Slug is required
                      </label>
                    ) : (
                      ""
                    )}
                    {this.state.slugCountError ? (
                      <label className="mt-2" style={{ color: "red" }}>
                        Slug should be atleast 2 characters
                      </label>
                    ) : (
                      ""
                    )}
                  </div>

                  <div
                    className="form-group"
                    style={{
                      position: "relative",
                      bottom: "80px",
                      width: "400px",
                    }}
                  >
                    <label for="exampleInputUsername2">Description</label>
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="Description"
                      id="description"
                      value={description}
                      onChange={this.handleInputChange}
                      style={{ borderColor: this.state.color1 }}
                      className="form-control"
                    />
                    {this.state.descriptionError ? (
                      <label className="mt-2" style={{ color: "red" }}>
                        Description is required
                      </label>
                    ) : (
                      ""
                    )}
                    {this.state.descriptionCountError ? (
                      <label className="mt-2" style={{ color: "red" }}>
                        Description should be atleast 2 characters
                      </label>
                    ) : (
                      ""
                    )}
                  </div>

                  <div
                    className="form-group"
                    style={{
                      position: "relative",
                      bottom: "170px",
                      width: "400px",
                      left: "500px",
                    }}
                  >
                    <label for="exampleInputUsername1">Status</label>
                    <select
                      className="form-control"
                      id="status"
                      style={{ outline: this.state.color2 }}
                      onChange={this.handleInputChange}
                    >
                      <option value="">Select Status</option>
                      <option value="true" selected={status == true}>
                        Active
                      </option>
                      <option value="false" selected={status == false}>
                        Inactive
                      </option>
                    </select>
                    {this.state.statusError ? (
                      <label className="mt-2" style={{ color: "red" }}>
                        Status is required
                      </label>
                    ) : (
                      ""
                    )}
                  </div>

                  <div style={{ position: "relative", bottom: "140px" }}>
                    <button
                      type="button"
                      className="btn btn-submit btn-gradient-primary me-2"
                      style={{
                        backgroundColor: "blue",
                        color: "white",
                        borderRadius: "2rem",
                      }}
                      onClick={this.validation}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn btn-cancel btn-gradient-primary me-2"
                      style={{
                        backgroundColor: "blue",
                        color: "white",
                        borderRadius: "2rem",
                      }}
                      onClick={this.back}
                    >
                      Cancel
                    </button>
                    <hr />
                  
                  </div>
                  
                </form>
                
              </div>

              
            </div>
            
          </div>


              <div class="col-12 grid-margin stretch-card1">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Add Options:</h4>
                    <p class="card-description"> Click here to add options! </p>
                    <form class="forms-sample">
                    <div className="row ">
                      <div class="form-group col-md-2">
                        <label for="exampleInputName1">Name</label>
                        <input type="text" class="form-control" id="exampleInputName1" placeholder="Name"/>
                      </div>
                      <div class="form-group col-md-2">
                        <label for="exampleInputName1">Description</label>
                        <input type="text" class="form-control" id="exampleInputName1" placeholder="Description"/>
                      </div>
                      <div class="form-group col-md-1">
                        <label for="exampleInputName1">Slug</label>
                        <input type="text" class="form-control" id="exampleInputName1" placeholder="Slug"/>
                      </div>
                      <div class="form-group col-md-2">
                        <label for="exampleInputName1">Sort</label>
                        <input type="text" class="form-control" id="exampleInputName1" placeholder="Sort"/>
                      </div>
                      <div class="form-group col-md-1" >
                        <label for="inputState">Status</label>
                            <select id="inputState" class="form-control" style={{height:"2.8rem"}}>
                              <option selected>Choose...</option>
                              <option>Active</option>
                              <option>Inactive</option>
                            </select>
                      </div>
                      <div class="form-group col-md-1" >
                      <button type="button" class="btn btn-gradient-success btn-rounded btn-fw" style={{
                        backgroundColor: "blue",
                        color: "white",
                        borderRadius: "2rem",
                        position:'relative',
                        top:'1.4rem'
                      }}>Add </button>
                      </div>
                      <div class="form-group col-md-1" >
                      <button
                      type="button"
                      className="btn btn-submit btn-gradient-primary me-2"
                      style={{
                        backgroundColor: "blue",
                        color: "white",
                        borderRadius: "2rem",
                        position:'relative',
                        top:'1.4rem',
                        left:'2.8rem'
                      }}
       
                    >
                      Submit
                    </button>
                      </div>
                      <div class="form-group col-md-1 " >
                      <button
                      type="button"
                      className="btn btn-cancel btn-gradient-primary me-2"
                      style={{
                        backgroundColor: "blue",
                        color: "white",
                        borderRadius: "2rem",
                        position:'relative',
                        top:'1.4rem',
                        left:'4rem'
                      }}
       
                    >
                      Remove
                    </button>
                      </div>
                     
                    </div> 
                </form>
              </div>
            </div>
        </div> 
              {/* End of the Edit Configuration */}
     <div className="Table">
     <h3 class="page-title ti">
            List Configuration Option:
          </h3>
              <div class="row">
                <div class="table Atable">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">S.No</th>
                        <th scope="col"> Name</th>
                        <th scope="col">Slug</th>
                        <th scope="col">Sort</th>
                        <th scope="col">Description</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>{resultArray}</tbody>
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
  console.log("map state =====================", state);
  return {
    configReducer: state.CONFIGURATION_Reducer,
    configOptionReducer: state.CONFIGURATION_Option_Reducer,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      AC_LIST_CONFIGURATION,
      AC_ADD_CONFIGURATION,
      AC_VIEW_CONFIGURATION,
      AC_HANDLE_INPUT_CHANGE,
      AC_ADD_CONFIGURATION_OPTION,
      AC_LIST_CONFIGURATION_OPTION,
      AC_DELETE_CONFIGURATION_OPTION,
      AC_VIEW_CONFIGURATION_OPTION,
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(editConfiguration);
