import { AnyAction, Middleware, Reducer, ReducersMapObject, Store } from 'redux';
export declare class ReduxStore<S> {
    private _store;
    private _combineReducers;
    get store(): Store<S, AnyAction>;
    get combineReducers(): Reducer<S>;
    constructor(reducers: ReducersMapObject<S, AnyAction>, middlewares?: Middleware<any, S, any>[], debug?: boolean);
}
