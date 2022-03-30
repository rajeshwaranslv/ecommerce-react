import { combineReducers } from "redux";
import FAQ_Reducer from "./reducers/faqred";
import PAGE_Reducer from "./reducers/pagered";
import COUNTRY_Reducer from "./reducers/countryred"
import imagesReducer from "./reducers/category"
import CURRENCY_Reducer from "./reducers/currencyred"
import LANGUAGE_Reducer from "./reducers/language"
import NEWSLETTER_Reducer from "./reducers/newsletterred"
import PAYMENT_Reducer from "./reducers/paymentred"
import USER_Reducer from "./reducers/userred";
import CONFIGURATION_Reducer from "./reducers/configred"
import CONFIGURATION_Option_Reducer from "./reducers/configOptionred";
const rootReducer=combineReducers({
    FAQ_Reducer,
    PAGE_Reducer,
    COUNTRY_Reducer,
    imagesReducer,
    CURRENCY_Reducer,
    LANGUAGE_Reducer,
    NEWSLETTER_Reducer,
    PAYMENT_Reducer,
    USER_Reducer,
    CONFIGURATION_Reducer,
    CONFIGURATION_Option_Reducer
})
export default rootReducer;