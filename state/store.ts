import { createStore, AnyAction, Store, combineReducers } from "redux";
import {
  LOGIN,
  LOGOUT,
  MENU_DRAWER_CLOSE,
  MENU_DRAWER_OPEN,
  MODAL_CLOSE,
  MODAL_OPEN,
} from "./action";
import { createWrapper, Context, MakeStore } from "next-redux-wrapper";

export interface ReduxState {
  isLoggedIn: boolean;
  isLoginModalOpen: boolean;
  isMenuDrawerOpen: boolean;
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

const isLoginModalOpen = (state = false, action: AnyAction) => {
  switch (action.type) {
    case MODAL_OPEN:
      return true;
    case MODAL_CLOSE:
      return false;
    default:
      return state;
  }
};

const isMenuDrawerOpen = (state = false, action: AnyAction) => {
  switch (action.type) {
    case MENU_DRAWER_OPEN:
      return true;
    case MENU_DRAWER_CLOSE:
      return false;
    default:
      return state;
  }
};

const reducer = combineReducers({
  isLoggedIn,
  isLoginModalOpen,
  isMenuDrawerOpen,
});

export const initializeStore: MakeStore<any> = (preloadedState: Context) =>
  createStore(reducer);

// export an assembled wrapper
export const wrapper = createWrapper<Store<ReduxState>>(initializeStore, {
  debug: false,
});
