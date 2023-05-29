// third-party
import { configureStore } from '@reduxjs/toolkit';
import { setAutoFreeze } from 'immer';
// project import
import reducers from './reducers';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //
setAutoFreeze(false);
const store = configureStore({
  reducer: reducers
});

const { dispatch } = store;

export { store, dispatch };
