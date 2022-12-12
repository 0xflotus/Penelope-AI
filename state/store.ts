import { createStore, AnyAction, Store, combineReducers } from "redux";
import { LOGIN, LOGOUT } from "./action";
import { createWrapper, Context, MakeStore } from "next-redux-wrapper";

export interface ReduxState {
  isLoggedIn: boolean;
}

const isLoggedIn = (state = false, action: AnyAction) => {
  switch (action.type) {
    case LOGIN:
      return true;
    case LOGOUT:
      return false;
    default:
      return state;
  }
};

const reducer = combineReducers({
  isLoggedIn,
});

export const initializeStore: MakeStore<any> = (preloadedState: Context) =>
  createStore(reducer);

// export an assembled wrapper
export const wrapper = createWrapper<Store<ReduxState>>(initializeStore, {
  debug: false,
});
