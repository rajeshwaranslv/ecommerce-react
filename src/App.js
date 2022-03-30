import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from './components/layouts/sidebar';
import Navbar from './components/layouts/navbar'
// import Footer from './components/layouts/footer';
import Dashboard from './components/layouts/dashboard';
// Faq Management
import addFaqs from './components/faq/addFaq';
import ListFaq from './components/faq/listFaq';
import editFaq from './components/faq/editfaq';
import viewFaq from './components/faq/viewFaq';
// Page Management
import addPages from './components/pages/addPages';
import listPages from './components/pages/listPages';
import editPage from './components/pages/editPage';
import viewPage from './components/pages/viewPage';
// Country Management
import addCountry from './components/country/addCountry';
import listCountry from './components/country/listCountry';
import editCountry from './components/country/editCountry';
import viewCountry from './components/country/viewCountry';
// Category Management
import addImage from './components/Category/addImage';
import listImages from './components/Category/listImages';
import editImage from './components/Category/editImage';
import viewImage from './components/Category/viewImage';

import addCurrency from './components/Currency/addCurrency';
import listCurrency from './components/Currency/listCurrency';
import editCurrency from './components/Currency/editCurrency';
import viewCurrency from './components/Currency/viewCurrency';

import Addlanguages from './components/language/addlanguage';
import Listlanguage from './components/language/listlanguage';
import Editlanguage from './components/language/editlanguage';
import Viewlanguage from './components/language/viewlanguage'

import AddNewsletter from './components/newsletter/addNewsletter';
import ListNewsletter from './components/newsletter/listNewsletter';
import editNewsletter from './components/newsletter/editNewsletter';
import viewNewsletter from './components/newsletter/viewNewsletter'

import addPayment from './components/payment/addPayment';
import listPayment from './components/payment/listPayment';
import editPayment from './components/payment/editPayment';
import viewPayment from './components/payment/viewPayment';

import addConfiguration from './components/configuration/addConfiguration';
import listConfiguration from './components/configuration/listConfiguration';
import editConfiguration from './components/configuration/editConfiguration';
import viewConfiguration from './components/configuration/viewConfiguration';

//User management
import listUser from './components/user/listUser';
import viewUser from './components/user/viewUser';


function App() {
  return (
    <Router>
    <div class="container-scroller">
      <Navbar/>
      <div class="container-fluid page-body-wrapper">
      <Sidebar/>
      <Switch>
      <Route exact path="/" component={Dashboard}/>
      
      <Route exact path="/addFaq" component={addFaqs}/>
      <Route exact path="/listFaq" component={ListFaq}/>
      <Route exact path='/editFaq/:id' component={editFaq}/>
      <Route exact path='/viewFaq/:id' component={viewFaq}/>

      <Route exact path="/addPage" component={addPages}/>
      <Route exact path="/listPage" component={listPages}/>
      <Route exact path='/editPage/:id' component={editPage}/>
      <Route exact path='/viewPage/:id' component={viewPage}/>

      <Route exact path="/addCountry" component={addCountry}/>
      <Route exact path="/listCountry" component={listCountry}/>
      <Route exact path='/editCountry/:id' component={editCountry}/>
      <Route exact path='/viewCountry/:id' component={viewCountry}/>
      
      <Route path="/addImage" component={addImage} />
      <Route path="/listImages" component={listImages} />
      <Route path="/viewImage/:id" component={viewImage} />
      <Route path="/editImage/:id" component={editImage}/>

      <Route exact path="/addCurrency" component={addCurrency}/>
      <Route exact path="/listCurrency" component={listCurrency}/>
      <Route exact path='/editCurrency/:id' component={editCurrency}/>
      <Route exact path='/viewCurrency/:id' component={viewCurrency}/>

      <Route exact path="/addlanguage" component={Addlanguages}/>
      <Route exact path="/listlanguage" component={Listlanguage}/>
      <Route exact path='/editlanguage/:id' component={Editlanguage}/>
      <Route exact path='/viewlanguage/:id' component={Viewlanguage}/>

      <Route exact path="/addNewsletter" component={AddNewsletter}/>
      <Route exact path="/listNewsletter" component={ListNewsletter}/>
      <Route exact path='/editNewsletter/:id' component={editNewsletter}/>
      <Route exact path='/viewNewsletter/:id' component={viewNewsletter}/>

      <Route exact path="/addPayment" component={addPayment}/>
      <Route exact path="/listPayment" component={listPayment}/>
      <Route exact path="/editPayment/:id" component={editPayment}/>
      <Route exact path="/viewPayment/:id" component={viewPayment}/>

      <Route exact path="/addConfig" component={addConfiguration}/>
      <Route exact path="/listConfig" component={listConfiguration}/>
      <Route exact path='/editConfig/:id' component={editConfiguration}/>
      <Route exact path='/viewConfig/:id' component={viewConfiguration}/>

      <Route exact path='/listUser' component={listUser}/>
      <Route exact path='/viewUser/:id' component={viewUser}/>

      <Route exact path="/" component={Dashboard}/>
      </Switch>
      </div>
      {/* <Footer/> */}
    </div>
    </Router>
  );
}
export default App;
