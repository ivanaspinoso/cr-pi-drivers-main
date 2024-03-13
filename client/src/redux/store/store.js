import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducer/reducer";
import { composeWithDevTools } from 'redux-devtools-extension';

// Usa composeWithDevTools para envolver tu store con middleware y Redux DevTools
const store = createStore(
 rootReducer,
 composeWithDevTools(
    applyMiddleware(thunk)
 )
);

export default store;
