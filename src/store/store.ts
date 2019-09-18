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

export class ReduxStore<S> {
  private _store: Store<S, AnyAction>
  private _combineReducers: Reducer<S>
  get store(): Store<S, AnyAction> {
    return this._store
  }
  get combineReducers(): Reducer<S> {
    return this._combineReducers
  }
  constructor(reducers: ReducersMapObject<S, AnyAction>, middlewares: Middleware<any, S, any>[] = [], debug: boolean = false) {
    const composeEnhancers = debug && (window as any).hasOwnProperty('__REDUX_DEVTOOLS_EXTENSION_COMPOSE__') ?
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
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
