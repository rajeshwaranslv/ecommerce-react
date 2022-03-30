import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export default class Sidebar extends React.Component {
    render() {
        return (

            <nav class="sidebar sidebar-offcanvas" id="sidebar" style={{ background: 'linear-gradient(to bottom white 0%, #e9cef4 100%)' }}>
                <ul class="nav">
                    <li class="nav-item nav-profile">
                        <a href="#" class="nav-link">
                            <div class="nav-profile-image">
                                <img src="assets/images/faces/face1.jpg" alt="profile"></img>
                                <span class="login-status online"></span>
                            </div>
                            <div class="nav-profile-text d-flex flex-column">
                                <span class="font-weight-bold mb-2">CODE BLASTERS</span>
                                <span class="text-secondary text-small">E-Commerce Admin</span>
                            </div>

                        </a>
                    </li>
                    <li class="nav-item" >
                        <Link to="/" class="nav-link">
                            <span class="menu-title">Dashboard</span>
                            {/* <i class="mdi mdi-home menu-icon"></i> */}
                        </Link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                            <span class="menu-title">Faq</span>
                            <i class="menu-arrow"></i>
                            {/* <i class="mdi mdi-comment-question-outline"></i> */}
                        </a>
                        <div class="collapse" id="ui-basic">
                            <ul class="nav flex-column sub-menu">
                                <li class="nav-item"> <Link to="/addFaq" class="nav-link" >Add faq</Link></li>
                                <li class="nav-item"> <Link to="/listFaq" class="nav-link" >List faq</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="collapse" href="#general-pages" aria-expanded="false" aria-controls="general-pages">
                            <span class="menu-title">Pages</span>
                            <i class="menu-arrow"></i>
                            {/* <i class="mdi mdi-book-open-page-variant"></i> */}
                        </a>
                        <div class="collapse" id="general-pages">
                            <ul class="nav flex-column sub-menu">
                                <li class="nav-item"> <Link class="nav-link" to="/addPage"> Add Page </Link></li>
                                <li class="nav-item"> <Link class="nav-link" to="/listPage"> List Page </Link></li>
                            </ul>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="collapse" href="#country-pages" aria-expanded="false" aria-controls="country-pages">
                            <span class="menu-title">Country</span>
                            <i class="menu-arrow"></i>
                            {/* <i class="mdi mdi-book-open-page-variant"></i> */}
                        </a>
                        <div class="collapse" id="country-pages">
                            <ul class="nav flex-column sub-menu">
                                <li class="nav-item"> <Link class="nav-link" to="/addCountry"> Add Country </Link></li>
                                <li class="nav-item"> <Link class="nav-link" to="/listCountry"> List Country </Link></li>
                            </ul>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="collapse" href="#image" aria-expanded="false" aria-controls="image">
                            <span class="menu-title">Category</span>
                            <i class="menu-arrow"></i>
                            {/* <i class="mdi mdi-comment-question-outline"></i> */}
                        </a>
                        <div class="collapse" id="image">
                            <ul class="nav flex-column sub-menu">
                                <li class="nav-item"> <Link to="/addImage" class="nav-link" >Add Image</Link></li>
                                <li class="nav-item"> <Link to="/listImages" class="nav-link" >List Image</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="collapse" href="#currency-pages" aria-expanded="false" aria-controls="currency-pages">
                            <span class="menu-title">Currency</span>
                            <i class="menu-arrow"></i>
                            {/* <i class="mdi mdi-book-open-page-variant"></i> */}
                        </a>
                        <div class="collapse" id="currency-pages">
                            <ul class="nav flex-column sub-menu">
                                <li class="nav-item"> <Link class="nav-link" to="/addCurrency"> Add Currency </Link></li>
                                <li class="nav-item"> <Link class="nav-link" to="/listCurrency"> List Currency </Link></li>
                            </ul>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="collapse" href="#language-pages" aria-expanded="false" aria-controls="language-pages">
                            <span class="menu-title">Language</span>
                            <i class="menu-arrow"></i>
                            {/* <i class="mdi mdi-book-open-page-variant"></i> */}
                        </a>
                        <div class="collapse" id="language-pages">
                            <ul class="nav flex-column sub-menu">
                                <li class="nav-item"> <Link class="nav-link" to="/addlanguage"> Add Language </Link></li>
                                <li class="nav-item"> <Link class="nav-link" to="/listlanguage"> List Language </Link></li>
                            </ul>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="collapse" href="#news-pages" aria-expanded="false" aria-controls="news-pages">
                            <span class="menu-title">Newsletter</span>
                            <i class="menu-arrow"></i>
                            {/* <i class="mdi mdi-book-open-page-variant"></i> */}
                        </a>
                        <div class="collapse" id="news-pages">
                            <ul class="nav flex-column sub-menu">
                                <li class="nav-item"> <Link class="nav-link" to="/addNewsletter"> Add Newsletter </Link></li>
                                <li class="nav-item"> <Link class="nav-link" to="/listNewsletter"> List Newsletter </Link></li>
                            </ul>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="collapse" href="#payment-pages" aria-expanded="false" aria-controls="payment-pages">
                            <span class="menu-title">Payment</span>
                            <i class="menu-arrow"></i>
                            {/* <i class="mdi mdi-book-open-page-variant"></i> */}
                        </a>
                        <div class="collapse" id="payment-pages">
                            <ul class="nav flex-column sub-menu">
                                <li class="nav-item"> <Link class="nav-link" to="/addPayment"> Add Payment </Link></li>
                                <li class="nav-item"> <Link class="nav-link" to="/listPayment"> List Payment </Link></li>
                            </ul>
                        </div>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="collapse" href="#user-pages" aria-expanded="false" aria-controls="user-pages">
                            <span class="menu-title">User</span>
                            <i class="menu-arrow"></i>
                            {/* <i class="mdi mdi-book-open-page-variant"></i> */}
                        </a>
                        <div class="collapse" id="user-pages">
                            <ul class="nav flex-column sub-menu">
                                <li class="nav-item"> <Link class="nav-link" to="/listUser"> List User </Link></li>
                            </ul>
                        </div>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="collapse" href="#config-pages" aria-expanded="false" aria-controls="config-pages">
                            <span class="menu-title">Configuration</span>
                            <i class="menu-arrow"></i>
                            {/* <i class="mdi mdi-book-open-page-variant"></i> */}
                        </a>
                        <div class="collapse" id="config-pages">
                            <ul class="nav flex-column sub-menu">
                                <li class="nav-item"> <Link class="nav-link" to="/addConfig"> Add Configuration </Link></li>
                                <li class="nav-item"> <Link class="nav-link" to="/listConfig"> List Configuration </Link></li>
                            </ul>
                        </div>
                    </li>

                </ul>
            </nav>

        )
    }
}
