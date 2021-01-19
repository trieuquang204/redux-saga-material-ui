import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import thunk from 'redux-thunk';

const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
      })
    : compose;

const configureStore = () => {
  const middleWares = [
    // list middleware here
    thunk
  ];

  const anhancers = [applyMiddleware(...middleWares)];

  const store = createStore(rootReducer, composeEnhancers(...anhancers));
  return store;
};

export default configureStore;
