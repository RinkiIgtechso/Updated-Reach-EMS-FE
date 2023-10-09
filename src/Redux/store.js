// NOTE: use this store variable to create a store.
import { legacy_createStore ,compose, applyMiddleware,combineReducers  } from "redux";
import thunk from "redux-thunk";
import { reducer as AuthReducer } from "./AuthReducer/reducer";
import { reducer as AppReducer } from "./AppReducer/reducer";

 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({AppReducer,AuthReducer});
const store = legacy_createStore(reducer,composeEnhancers(applyMiddleware(thunk)));
 
export {store};