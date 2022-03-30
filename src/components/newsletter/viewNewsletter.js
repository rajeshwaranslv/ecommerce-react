import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Parser from 'html-react-parser';
import { AC_LIST_NEWSLETTER, AC_ADD_NEWSLETTER, AC_VIEW_NEWSLETTER, AC_HANDLE_INPUT_CHANGE } from '../actions/newsletter';
// import swal from 'sweetalert';
class viewNewsletter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            nameError: false,
            nameCountError: false,
            subject: '',
            subjectError: false,
            subjectCountError: false,
            template: '',
            templateError: false,
            templateCountError: false,
            status: '',
            statusError: false,
        }
        this.validation = this.validation.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

    }

    validation() {
        const name = this.props.newsletterReducer.newsletterInfo.name;
        const subject = this.props.newsletterReducer.newsletterInfo.subject;
        const template = this.props.newsletterReducer.newsletterInfo.template;
        const status = this.props.newsletterReducer.newsletterInfo.status;
        const id = this.props.newsletterReducer.newsletterInfo.id;
        let formData = {
            name : name,
            subject : subject,        
            template : template,        
            status : status,
            id : id
        }
        console.log("-=-formData=-=-",formData);
        this.props.AC_ADD_NEWSLETTER(formData);
    }

    handleInputChange(event) {
        let name = event.target.id;
        let value = event.target.value;
        this.props.AC_HANDLE_INPUT_CHANGE(name,value);
    }
    componentWillMount() {
        let newsId = this.props.match.params.id;
        // console.log("-=-=faqId-=",faqId);
        let formData = {id:newsId}
        this.props.AC_VIEW_NEWSLETTER(formData);
    }


    render() {
        const name = this.props.newsletterReducer.newsletterInfo.name;
        const subject = this.props.newsletterReducer.newsletterInfo.subject;
        const template = this.props.newsletterReducer.newsletterInfo.template;
        const status = this.props.newsletterReducer.newsletterInfo.status;
        return (
            <div className="container-fluid">
                <h3 class="page-title"><span class="page-title-icon bg-gradient-primary text-white me-2" style={{ marginLeft: '37px', marginTop: '47px' }}><i class="mdi mdi-comment-plus-outline"></i></span>View Newsletter</h3>
                <div className="row">
                    <div className="col-md-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <form className="forms-sample" id="editnews">
                                    <div className="form-group">
                                        <label for="exampleInputUsername1">Name</label>
                                        <input type="text" autoComplete='off' placeholder="Name" id="name" value={name} onChange={this.handleInputChange} style={{ borderColor: this.state.color0}} className="form-control" disabled/>
                                        {this.state.nameError ? <label className="mt-2" style={{ color: 'red' }}>Question is required</label> : ""}
                                        {/* {this.state.nameCountError ? <label className="mt-2" style={{ color: 'red' }}>Question should be atleast 5 characters</label> : ""} */}

                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputUsername1">Subject</label>
                                        <input type="text" autoComplete='off' placeholder="Subject" id="subject" value={subject} onChange={this.handleInputChange} style={{ borderColor: this.state.color1 }} className="form-control" disabled/>
                                        {this.state.subjectError ? <label className="mt-2" style={{ color: 'red' }}>Answer is required</label> : ""}
                                        {/* {this.state.subjectCountError ? <label className="mt-2" style={{ color: 'red' }}>Answer should be atleast 5 characters</label> : ""} */}
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputUsername1">Template</label>
                                        <input type="text" autoComplete='off' placeholder="Template Content" id="subject" value={template} onChange={this.handleInputChange} style={{ borderColor: this.state.color1 }} className="form-control" disabled/>
                                        {this.state.templateError ? <label className="mt-2" style={{ color: 'red' }}>Answer is required</label> : ""}
                                        {/* {this.state.templateCountError ? <label className="mt-2" style={{ color: 'red' }}>Answer should be atleast 5 characters</label> : ""} */}
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputUsername1">Status</label>
                                        <select className="form-control" id="status" style={{ outline: this.state.color2 }} onChange={this.handleInputChange} disabled >
                                            <option value="">Select Status</option>
                                            <option value="true" selected={status == true}>Active</option>
                                            <option value="false" selected={status == false}>Inactive</option>
                                        </select>
                                        {this.state.statusError ? <label className="mt-2" style={{ color: 'red' }}>Status is required</label> : ""}
                                    </div>
                                    <button type="button" className="btn btn-submit btn-gradient-primary me-2" style={{
                                        backgroundColor: 'blue',
                                        color: 'white'
                                    }} onClick={this.validation}>view</button>
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
        newsletterReducer: state.NEWSLETTER_Reducer
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ AC_LIST_NEWSLETTER, AC_ADD_NEWSLETTER, AC_VIEW_NEWSLETTER,AC_HANDLE_INPUT_CHANGE }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(viewNewsletter);