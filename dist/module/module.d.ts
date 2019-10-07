import { Produced } from 'immer';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ActionCreator, AsyncActionCreators } from 'typescript-fsa';
import { AsyncActions, ThunkActionCreator } from '../action/async';
import { Handler, MaybePromise } from '../action/handler';
export declare class ReduxModule<State, ProjectState = State> {
    name: string;
    private _generator;
    private _reducer;
    constructor(name: string, initialState: State);
    sync<Payload = void>(name: string, handler?: Handler<State, Payload>): ActionCreator<Payload>;
    async<Params = void, Result = void, Error = {}>(name: string, factory: (params: Params, dispatch: ThunkDispatch<State | ProjectState, any, AnyAction>, getState: () => ProjectState) => MaybePromise<Result>, actions?: AsyncActions<State, Params, Result, Error>): AsyncActionCreators<Params, Result, Error> & ThunkActionCreator<Params, Promise<Result>, ProjectState>;
    readonly reducer: (base: any, action: AnyAction) => Produced<any, State>;
    case<Payload>(actionCreator: ActionCreator<Payload>, handler: Handler<State, Payload>): this;
}
export declare function useAsyncDispatch<S = any, E = Error, A extends AnyAction = AnyAction>(): ThunkDispatch<S, E, A>;
