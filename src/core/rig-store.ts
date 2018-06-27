import { Action, AsyncAction } from './models/actions';
import { GlobalState } from './models/global-state';
import { applyMiddleware, createStore, Reducer, combineReducers, Store as ReduxStore } from 'redux';
import { SessionState, sessionReducer } from './state/session';
import { ExtensionsState, extensionsReducer } from './state/extensions';
import { ProductState, productsReducer } from './state/products';
import thunk from 'redux-thunk';

declare const window: Window;

interface RigState {
  [key: string]: object;
}


export class RigStore {
  private reduxStore: ReduxStore<RigState>;
  private rootReducer: Reducer;

  private initRootReducer(): Reducer {
    return combineReducers({
      session: sessionReducer,
      extensions: extensionsReducer,
      products: productsReducer,
    });
  }

  constructor() {
    this.rootReducer = this.initRootReducer();
    this.reduxStore = createStore(
      this.rootReducer,
      applyMiddleware(thunk),
    );
  }

  public dispatch<T>(action: Action<T> | AsyncAction) {
    //tslint:disable-next-line:no-any
    return this.reduxStore.dispatch(action as any);
  }

  public getState() {
    return (this.reduxStore.getState() as {}) as GlobalState;
  }

  public getReduxStore() {
    return (this.reduxStore as {}) as ReduxStore<GlobalState>;
  }
};
