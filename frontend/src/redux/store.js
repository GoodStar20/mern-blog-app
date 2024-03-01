import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import userReducer from './reducers/userReducer';
import blogReducer from './reducers/blogReducer';

//combine reducers
const reducer = combineReducers({
  user: userReducer,
  blog: blogReducer
});

const middleware = [thunk];
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
