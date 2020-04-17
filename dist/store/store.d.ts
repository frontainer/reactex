import { AnyAction, Middleware, Reducer, ReducersMapObject, Store } from 'redux';
export declare class ReduxStore<S, A extends AnyAction = AnyAction> {
    private _store;
    private _combineReducers;
    get store(): Store<S, A>;
    get combineReducers(): Reducer<S>;
    private _createComposer;
    constructor(reducers: ReducersMapObject<S, A>, middlewares?: Middleware<any, S, any>[], debug?: boolean);
}
