import { AnyAction, Middleware, Reducer, ReducersMapObject, Store } from 'redux';
export declare class ReduxStore<S> {
    private _store;
    private _combineReducers;
    readonly store: Store<S, AnyAction>;
    readonly combineReducers: Reducer<S>;
    private _createComposer;
    constructor(reducers: ReducersMapObject<S, AnyAction>, middlewares?: Middleware<any, S, any>[], debug?: boolean);
}
