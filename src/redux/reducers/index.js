import {combineReducers} from 'redux';

import book from './book';
import borrow from './borrow';
import user from './user';
import borrowed from './borrowed';
import history from './history';
import post from './post';

const appReducer = combineReducers({
  book,
  borrow,
  user,
  borrowed,
  history,
  post
});

export default appReducer;
