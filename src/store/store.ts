import {
  AnyAction, applyMiddleware,
  combineReducers,
  compose,
  createStore as _createStore,
  Middleware,
  Reducer,
  ReducersMapObject,
  Store
} from 'redux'
import thunkMiddleware from 'redux-thunk'
const __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

export class ReduxStore<S> {
  private _store: Store<S, AnyAction>
  private _combineReducers: Reducer<S>
  get store(): Store<S, AnyAction> {
    return this._store
  }
  get combineReducers(): Reducer<S> {
    return this._combineReducers
  }
  private _createComposer(debug: boolean) {
    if (!debug || typeof window === 'undefined') {
      return compose
    }
    if (!window.hasOwnProperty(__NEXT_REDUX_STORE__)) {
      (window as any)[__NEXT_REDUX_STORE__] = compose
    }
    if (!window.hasOwnProperty(__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)) {
      (window as any)[__REDUX_DEVTOOLS_EXTENSION_COMPOSE__] = compose
    }
    return compose
  }
  constructor(reducers: ReducersMapObject<S, AnyAction>, middlewares: Middleware<any, S, any>[] = [], debug: boolean = false) {
    const composeEnhancers = this._createComposer(debug)
    this._combineReducers = combineReducers(reducers)
    this._store = _createStore<S, AnyAction, any, any>(
      this._combineReducers,
      composeEnhancers(
        applyMiddleware(
          ...middlewares,
          thunkMiddleware
        )
      )
    )
  }
}
