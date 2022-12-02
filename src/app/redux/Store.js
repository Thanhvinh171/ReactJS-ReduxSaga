import axiosMiddleware from "redux-axios-middleware";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddle from "redux-saga";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import HttpService from "app/services/HttpService";
import rootSaga from "./rootSaga";
import RootReducer from "./reducers/RootReducer";
const initialState = {};

//const middlewares = [thunk];
const sagaMiddle = createSagaMiddle();
const middlewares = [
  thunk,
  //routerMiddleware(browserHistory),
  axiosMiddleware(HttpService.getAxiosClient())
];
const Store = createStore(
  RootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middlewares),
    applyMiddleware(sagaMiddle),
    // applyMiddleware(...middlewares),
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)
sagaMiddle.run(rootSaga);

export default Store;