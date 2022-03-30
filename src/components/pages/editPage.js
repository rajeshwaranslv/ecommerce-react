import React from "react";
import { AC_LIST_PAGE, AC_ADD_PAGE, AC_VIEW_PAGE, AC_HANDLE_INPUT_CHANGE } from '../actions/pages';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Editor, } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from 'html-to-draftjs';
import { Redirect } from 'react-router-dom';

class editPage extends React.Component {
  constructor(props) {
    super(props);
    const html = '<p></p>';
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        title: '',
        titleError: false,
        description: '',
        descriptionError: false,
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
    this.setState({
      editorState,
    });
  };
  edit() {
    var pagevalue = this.state.editorState.getCurrentContent().getPlainText();
    if (pagevalue) {

      this.setState({ description: pagevalue, descriptionError: false })
    }
    else {
      this.setState({ description: pagevalue, descriptionError: true })
    }
    console.log("=-=-=description-=-=-", this.state.description);
  }

  validation() {
    const title = this.props.pagesReducer.pageInfo.title;
    const status = this.props.pagesReducer.pageInfo.status
    // const description = this.props.page.viewPage.description;
    const id = this.props.pagesReducer.pageInfo.id;
    const description = this.state.description;
    let formData = {
      title: title,
      description: description,
      id: id,
      status: status
    }
    this.props.AC_ADD_PAGE(formData)
  }
  inputchange(event) {
    let name = event.target.id;
    let value = event.target.value
    if(name=='status'){
      let status =value == 'Active' ? true:false
      this.props.AC_HANDLE_INPUT_CHANGE(name, status)
    } else {
      this.props.AC_HANDLE_INPUT_CHANGE(name, value)
    }

  }

  componentWillMount() {
    let pageId = this.props.match.params.id;
    var formData = { id: pageId }
    this.props.AC_VIEW_PAGE(formData)
    setTimeout(() => {
      this.editorContent();
    }, 500);
  }
  editorContent() {
    const description = this.props.pagesReducer.pageInfo.description;
    const html = '<p>' + description + '</p>';
    const contentBlock = htmlToDraft(html);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    this.setState({ editorState });

  }
  render() {
    const title = this.props.pagesReducer.pageInfo.title;
    const status = this.props.pagesReducer.pageInfo.status;
    const { editorState } = this.state;
    if (this.state.editStatus) {
      return <Redirect to='/listPages' />
    }
    return (
      <>
        <div class="container-fluid pages" style={{ width: '600px', marginRight: '611px' }}>
          <h3 class="page-title"><span class="page-title-icon bg-gradient-primary text-white me-2" style={{ marginLeft: '37px', marginTop: '47px' }}><i class="mdi mdi-comment-plus-outline"></i></span>Edit Page</h3>
          <div class="col-12 grid-margin stretch-card">
            <div class="card" >
              <div class="card-body">
                <form class="forms-sample" autoComplete='off'>
                  <div class="form-group">
                    <h5 style={{ fontSize: '0.875rem' }}>Title</h5>
                    <input type="text" placeholder="title" id="title" value={title} onChange={this.inputchange} style={{ borderColor: this.state.color0 }} class="form-control" ></input>
                    {this.state.titleError ? <label class="mt-2" style={{ color: 'red' }}>title is required</label> : ""}
                    {this.state.titleCountError ? <label class="mt-2" style={{ color: 'red' }}>title should be atleast 5 characters</label> : ""}
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail3">Description</label>
                    <Editor
                      editorState={editorState}
                      wrapperClassName="demo-wrapper"
                      editorClassName="demo-editor"
                      onEditorStateChange={this.onEditorStateChange}
                      onChange={this.edit} placeholder="Enter the Description" />
                    {this.state.descriptionCountError ? <label class="mt-2" style={{ color: 'red' }}>Description should be atleast 5 characters</label> : ""}
                  </div>

                  <div class="form-group">
                    <h4 style={{ fontSize: '0.875rem' }}>Status</h4>
                    <select class="form-control" id="status" style={{ outline: this.state.color2 }} onChange={this.inputchange} >
                      <option value="">Select Status</option>
                      <option value="Active" selected={status ==true}>Active</option>
                      <option value="Inactive" selected={status == false}>Inactive</option>
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
      </>
    )
  }
}

function mapStateToProps(state) {
  console.log("-=-=-=,", state);
  return {

    pagesReducer: state.PAGE_Reducer
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ AC_ADD_PAGE, AC_LIST_PAGE, AC_VIEW_PAGE, AC_HANDLE_INPUT_CHANGE }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(editPage);
