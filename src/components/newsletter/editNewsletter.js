import React from "react";
import { AC_LIST_NEWSLETTER, AC_ADD_NEWSLETTER, AC_VIEW_NEWSLETTER, AC_HANDLE_INPUT_CHANGE } from '../actions/newsletter';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Editor, } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

import { Redirect } from 'react-router-dom';

class editNewsletter extends React.Component {
  constructor(props) {
    super(props);
    const html = '<p></p>';
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        name: '',
        nameError: false,
        subject: '',
        subjectError: false,
        template: '',
        templateError: false,
        editStatus: false,
        editorState,

      }
     this.validation = this.validation.bind(this)
      this.inputchange = this.inputchange.bind(this);
      this.edit = this.edit.bind(this);
      this.onEditorStateChange = this.onEditorStateChange.bind(this);
      this.back = this.back.bind(this);
    }
  }
  back() {
    this.setState({ editStatus: true })
  }
  onEditorStateChange(editorState) {
    var name='template'     
    this.setState({
      editorState,
    });
    var value=draftToHtml(convertToRaw(editorState.getCurrentContent()))
    this.props.AC_HANDLE_INPUT_CHANGE(name, value)  
  };
  edit() {
    var newsvalue = this.state.editorState.getCurrentContent().getPlainText();
    if (newsvalue) {

      this.setState({ template: newsvalue, templateError: false })
    }
    else {
      this.setState({ template: newsvalue, templateError: true })
    }
    console.log("=-=-=template-=-=-", this.state.template);
  }

  validation() {
    const name = this.props.newsletterReducer.newsletterInfo.name;
    const subject = this.props.newsletterReducer.newsletterInfo.subject;
    const template = this.props.newsletterReducer.newsletterInfo.template;
    const id = this.props.newsletterReducer.newsletterInfo.id;
    const status = this.props.newsletterReducer.newsletterInfo.status;
    let formData = {
      name: name,
      subject: subject,
      template:template,
      status:status,
      id: id,
    }
    console.log("==formData=",formData);
    this.props.AC_ADD_NEWSLETTER(formData) 
    
    }
 
  inputchange(event) {
    let name = event.target.id;
    let value = event.target.value
    if(name=='status'){
      let status =value == 'Active' ? true:false
      this.props.AC_HANDLE_INPUT_CHANGE(name, status)
  }else{
      this.props.AC_HANDLE_INPUT_CHANGE(name, value)
  }

  }

  componentWillMount() {
    let newsId = this.props.match.params.id;
    var formData = { id: newsId }
    this.props.AC_VIEW_NEWSLETTER(formData)
    setTimeout(() => {
      this.editorContent();
    }, 500);
  }
  editorContent() {
    const template = this.props.newsletterReducer.newsletterInfo.template;
    const html = '<p>' + template + '</p>';
    const contentBlock = htmlToDraft(html);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    this.setState({ editorState });

  }
  render() {
    const name = this.props.newsletterReducer.newsletterInfo.name;
    const subject = this.props.newsletterReducer.newsletterInfo.subject;
    const status = this.props.newsletterReducer.newsletterInfo.status;
    const { editorState } = this.state;
    if (this.state.editStatus) {
      return <Redirect to='/listnewsletter' />
    }
    return (
      <>
        <div class="container-fluid pages" style={{ width: '600px', marginRight: '611px' }}>
          <h3 class="page-title"><span class="page-title-icon bg-gradient-primary text-white me-2" style={{ marginLeft: '37px', marginTop: '47px' }}><i class="mdi mdi-comment-plus-outline"></i></span>Edit Newsletter</h3>
          <div class="col-12 grid-margin stretch-card">
            <div class="card" >
              <div class="card-body">
                <form class="forms-sample" autoComplete='off'>
                  <div class="form-group">
                    <h5 style={{ fontSize: '0.875rem' }}>Name</h5>
                    <input type="text" placeholder="name" id="name" value={name} onChange={this.inputchange} style={{ borderColor: this.state.color0 }} class="form-control" ></input>
                    {this.state.nameError ? <label class="mt-2" style={{ color: 'red' }}>name is required</label> : ""}
                    {this.state.nameCountError ? <label class="mt-2" style={{ color: 'red' }}>name should be atleast 5 characters</label> : ""}
                  </div>
                  <div class="form-group">
                    <h5 style={{ fontSize: '0.875rem' }}>Subject</h5>
                    <input type="text" placeholder="subject" id="subject" value={subject} onChange={this.inputchange} style={{ borderColor: this.state.color0 }} class="form-control" ></input>
                    {this.state.subjectError ? <label class="mt-2" style={{ color: 'red' }}>subject is required</label> : ""}
                    {this.state.subjectCountError ? <label class="mt-2" style={{ color: 'red' }}>name should be atleast 5 characters</label> : ""}
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail3" style={{ fontSize: '0.875rem' }}>Template</label>
                    <Editor
                      editorState={editorState}
                      wrapperClassName="demo-wrapper"
                      editorClassName="demo-editor"
                      onEditorStateChange={this.onEditorStateChange}
                      onChange={this.edit} placeholder="Enter the template" />
                    {this.state.templateCountError ? <label class="mt-2" style={{ color: 'red' }}>template should be atleast 5 characters</label> : ""}
                  </div>

                  <div class="form-group">
                    <h4 style={{ fontSize: '0.875rem' }}>Status</h4>
                    <select class="form-control" id="status" style={{ outline: this.state.color2 }} onChange={this.inputchange} >
                      <option value="">Select Status</option>
                      <option value="Active" selected={status == true}>Active</option>
                      <option value="Inactive" selected={status == false}>Inactive</option>
                    </select>
                    {this.state.statusError ? <label class="mt-2" style={{ color: 'red' }}>Status is required</label> : ""}
                  </div>
                  <button type="button" class="btn btn-submit  btn-gradient-primary me-2" style={{ backgroundColor: 'blue', color: 'white', borderRadius: '2rem' }} onClick={this.validation}>Submit</button>
                  <button type="button" class="btn btn-cancel  btn-gradient-primary me-2" style={{ backgroundColor: 'blue', color: 'white', borderRadius: '2rem' }} onClick={this.back}>Cancel</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

function mapStateToProps(state) {
  console.log("-=-=name-=,", state);
  return {

    newsletterReducer: state.NEWSLETTER_Reducer
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ AC_ADD_NEWSLETTER, AC_LIST_NEWSLETTER, AC_VIEW_NEWSLETTER, AC_HANDLE_INPUT_CHANGE }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(editNewsletter)