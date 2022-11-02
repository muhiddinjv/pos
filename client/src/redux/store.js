import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer.js";

const finalReducer = combineReducers({
  rootReducer,
});

const initialState = {
  rootReducer: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    currentuser: localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : [],
  },
};

const middleWare = [thunk];

const store = createStore(
  finalReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
