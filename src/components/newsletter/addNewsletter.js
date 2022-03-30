import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AC_LIST_NEWSLETTER } from '../actions/newsletter';
import { AC_ADD_NEWSLETTER } from '../actions/newsletter';
import swal from 'sweetalert';
//editor
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

class AddNewsletter extends React.Component {
  constructor(props) {
    super(props);
    const html = '<p></p>';
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
        template: '',
        templateError: false,
        templateCountError: false,
        name: '',
        nameError: false,
        nameCountError: false,
        subject: '',
        subjecterror: false,
        subjectCountError: false,
        status: '',
        statusError: false,
      }
    }
    this.validation = this.validation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState, templateError: false
    });
  };

  validation() {
    const { editorState } = this.state;
    var value=draftToHtml(convertToRaw(editorState.getCurrentContent()))
    const name = this.state.name;
    const subject = this.state.subject;
    const status = this.state.status
    const template=this.state.template
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

    if (template) {
      if (template.length < 1) {
        this.setState({ templateError: false, templateCountError: true })
      }
      else {
        this.setState({ templateError: false, templateCountError: false })
      }
    }
    else {
      this.setState({ templateError: true, templateCountError: false })
    }

    if (subject) {
      if (subject.length < 1) {
        this.setState({ subjecterror: false, subjectCountError: true })
      }
      else {
        this.setState({ subjecterror: false, subjectCountError: false })
      }
    }
    else {
      this.setState({ subjecterror: true, subjectCountError: false })
    }

    if (status) {
      this.setState({ statusError: false })
    }
    else {
      this.setState({ statusError: true })
    }
    if (name && subject && status) {
      swal("Newsletter Added Successfully!", {
        buttons: false,
        timer: 2000,
      });
      this.setState({ name: '', subject: '', template:'', status: '' });

      var tempVal;
      if (status == 'Active') {
        tempVal = true
      } else {
        tempVal = false
      }
      const formData = {
        name: name,
        subject: subject,
        template: value,        
        status: tempVal
      }
      this.props.AC_ADD_NEWSLETTER(formData);
      console.log('========Add page========', formData)
    }
  }

  handleInputChange(event) {
    const nameid = event.target.id;
    const namevalue = event.target.value;
    const subjectid = event.target.id;
    const subjectvalue = event.target.value;
    const templateid = event.target.id;
    const templatevalue = event.target.value;
    const statusid = event.target.id;
    const statusvalue = event.target.value;

    if (nameid == "name") {
      this.setState({ name: namevalue })
      if (namevalue) {
        if (namevalue.length < 1) {
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
if (subjectid == "subject") {
      this.setState({ subject: subjectvalue })
      if (subjectvalue) {
        if (subjectvalue.length < 1) {
          this.setState({ subjecterror: false, subjectCountError: true })
        }
        else {
          this.setState({ subjecterror: false, subjectCountError: false })
        }
      }
      else {
        this.setState({ subjecterror: true, subjectCountError: false })
      }
    }
    if (templateid == "template") {
      this.setState({ template: templatevalue })
      if (templatevalue) {
        if (templatevalue.length < 1) {
          this.setState({ templateError: false, templateCountError: true })
        }
        else {
          this.setState({ templateError: false, templateCountError: false })
        }
      }
      else {
        this.setState({ templateError: true, templateCountError: false })
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
  edit() {
    var pageValue = this.state.editorState.getCurrentContent().getPlainText();
    if (pageValue) {

        this.setState({ template: pageValue, templateError: false })
    }
    else {
        this.setState({ template: pageValue, templateError: true })
    }

    console.log("=-=-=template-=-=-", this.state.template);
}
  render() {
    const { editorState } = this.state;
    return (
      <div class="container-fluid pages" style={{ width: '600px', marginRight: '611px' }}>
        <h3 class="page-title"><span class="page-title-icon bg-gradient-primary text-white me-2" style={{ marginLeft: '37px', marginTop: '47px' }}><i class="mdi mdi-comment-plus-outline"></i></span>Add Newsletter</h3>
        <div class="col-12 grid-margin stretch-card">
          <div class="card" >
            <div class="card-body">
              <form class="forms-sample" autoComplete='off'>
                <div class="form-group">
                  <h5 style={{ fontSize: '0.875rem' }}>Name</h5>
                  <input type="text" placeholder="Name" id="name" value={this.state.name} onChange={this.handleInputChange} style={{ borderColor: this.state.color0 }} class="form-control" ></input>
                  {this.state.nameError ? <label class="mt-2" style={{ color: 'red' }}>Name is required</label> : ""}
                  {/* {this.state.nameCountError ? <label class="mt-2" style={{ color: 'red' }}>Name should be atleast 5 characters</label> : ""} */}
                </div>
                <div class="form-group">
                  <h5 style={{ fontSize: '0.875rem' }}>Subject</h5>
                  <input type="text" placeholder="Subject" id="subject" value={this.state.subject} onChange={this.handleInputChange} style={{ borderColor: this.state.color0 }} class="form-control" ></input>
                  {this.state.subjecterror ? <label class="mt-2" style={{ color: 'red' }}>Subject is required</label> : ""}
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail3">Template</label>
                  <Editor toolbarClassName="toolbarClassName" 
                  wrapperClassName="wrapperClassName" 
                  onEditorStateChange={this.onEditorStateChange} 
                  editorState={this.state.editorState} 
                  editorClassName="editorClassName" 
                  placeholder="What ever you mention goes here..." 
                  onChange={this.edit} />
                  {/* {this.state.templateError ? <label class="mt-2" style={{ color: 'red' }}>Template is required</label> : ""} */}
                </div>
                <div class="form-group">
                  <h4 style={{ fontSize: '0.875rem' }}>Status</h4>
                  <select class="form-control" id="status" style={{ outline: this.state.color2 }} onChange={this.handleInputChange} >
                    <option selected>Select status</option>
                    <option value="Active" >Active</option>
                    <option value="Inactive" >Inactive</option>
                  </select>
                  {this.state.statusError ? <label class="mt-2" style={{ color: 'red' }}>Status is required</label> : ""}
                </div>
                <button type="button" class="btn btn-submit btn-gradient-primary me-2" style={{ backgroundColor: 'blue', color: 'white', borderRadius: '2rem' }} onClick={this.validation}>Submit</button>
                <button type="button" class="btn btn-cancel btn-gradient-primary me-2" style={{ backgroundColor: 'blue', color: 'white', borderRadius: '2rem' }} onClick={this.validation}>Cancel</button>
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
    newsletterReducer: state.NEWSLETTER_Reducer
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ AC_LIST_NEWSLETTER, AC_ADD_NEWSLETTER }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(AddNewsletter);