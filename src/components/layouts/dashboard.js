import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {AC_LIST_FAQ} from '../actions/faq'
import {AC_LIST_PAGE} from '../actions/pages'
import {AC_LIST_COUNTRY} from '../actions/country'
import {AC_LIST_IMAGES} from '../actions/category'
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
}
componentDidMount() {
    this.props.AC_LIST_COUNTRY();
    this.props.AC_LIST_FAQ();
    this.props.AC_LIST_IMAGES();
    this.props.AC_LIST_PAGE();
}
  render() {
    var Faq=this.props.faqsReducer.faqList;
    var Page=this.props.pagesReducer.pageList;
    var Country=this.props.countryReducer.countryList;
    var Category=this.props.imagesReducer.listImages;
    return (
      <div class="main-panel" >
        <div class="content-wrapper" style={{ background: 'white' }} >
          <div class="page-header">
            <h3 class="page-title">
              <span class="page-title-icon bg-gradient-primary text-white me-2">
                <i class="mdi mdi-home"></i>
              </span> Dashboard
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
            <div class="col-md-4 stretch-card grid-margin">
              <Link to="/listFaq" style={{ textDecoration: 'none' }}>
                <div class="card bg-gradient-danger card-img-holder text-white">
                  <div class="card-body">
                    <img src="assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                    <h4 class="font-weight-normal mb-3">Faq Management <i class="mdi mdi-chart-line mdi-24px float-right"></i>
                    </h4>
                    <h2 class="mb-5">{Faq.length}</h2>
                  </div>
                </div>
              </Link>
            </div>
            <div class="col-md-4 stretch-card grid-margin" style={{position:'relative',right:'70px'}}>
              <Link to="/listPage" style={{ textDecoration: 'none' }}>
                <div class="card bg-gradient-info card-img-holder text-white">
                  <div class="card-body">
                    <img src="assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                    <h4 class="font-weight-normal mb-3">Page Management <i class="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                    </h4>
                    <h2 class="mb-5">{Page.length}</h2>
                  </div>
                </div>
              </Link>
            </div>
            <div class="col-md-4 stretch-card grid-margin"style={{position:'relative',right:'135px'}}>
              <Link to="/listCountry" style={{ textDecoration: 'none' }}>
                <div class="card bg-gradient-success card-img-holder text-white">
                  <div class="card-body">
                    <img src="assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                    <h4 class="font-weight-normal mb-3">Country Management <i class="mdi mdi-diamond mdi-24px float-right"></i>
                    </h4>
                    <h2 class="mb-5">{Country.length}</h2>
                  </div>
                </div>
              </Link>
            </div>
            <div class="col-md-4 stretch-card grid-margin">
              <Link to="/listImages" style={{ textDecoration: 'none' }}>
                <div class="card bg-gradient-info card-img-holder text-white">
                  <div class="card-body">
                    <img src="assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                    <h4 class="font-weight-normal mb-3">Category Management <i class="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                    </h4>
                    <h2 class="mb-5">{Category.length}</h2>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  console.log('map state', state);
  return {
      faqsReducer: state.FAQ_Reducer,
      countryReducer: state.COUNTRY_Reducer,
      imagesReducer: state.imagesReducer,
      pagesReducer: state.PAGE_Reducer
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ AC_LIST_COUNTRY, AC_LIST_FAQ, AC_LIST_IMAGES, AC_LIST_PAGE }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);