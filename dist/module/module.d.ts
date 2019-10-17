import { Produced } from 'immer';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ActionCreator, AsyncActionCreators } from 'typescript-fsa';
import { ActionFactory, AsyncActions, ThunkActionCreator } from '../action/async';
import { Handler, MaybePromise } from '../action/handler';
import { ReducerBuilder } from '../reducer/reducer';
export declare abstract class AbsReduxSubModule<State, ProjectState = State> {
    protected _generator: ActionFactory<ProjectState>;
    protected _reducer: ReducerBuilder<State>;
    sync<Payload = void>(name: string, handler?: Handler<State, Payload>): ActionCreator<Payload>;
    async<Params = void, Result = void, Err = Error>(name: string, factory: (params: Params, dispatch: ThunkDispatch<State | ProjectState, any, AnyAction>, getState: () => ProjectState) => MaybePromise<Result>, actions?: AsyncActions<State, Params, Result, Err>): AsyncActionCreators<Params, Result, Err> & ThunkActionCreator<Params, Promise<Result>, ProjectState>;
    case<Payload>(actionCreator: ActionCreator<Payload>, handler: Handler<State, Payload>): this;
}
export declare class ReduxModule<State, ProjectState = State> extends AbsReduxSubModule<State, ProjectState> {
    name: string;
    constructor(name: string, initialState: State);
    subModule(name: string): ReduxSubModule<State, ProjectState>;
    readonly reducer: (base: any, action: AnyAction) => Produced<any, State>;
}
export declare class ReduxSubModule<State, ProjectState = State> extends AbsReduxSubModule<State, ProjectState> {
    name: string;
    constructor(name: string, _generator: ActionFactory<ProjectState>, _reducer: ReducerBuilder<State>);
    sync<Payload = void>(name: string, handler?: Handler<State, Payload>): ActionCreator<Payload>;
    async<Params = void, Result = void, Err = Error>(name: string, factory: (params: Params, dispatch: ThunkDispatch<State | ProjectState, any, AnyAction>, getState: () => ProjectState) => MaybePromise<Result>, actions?: AsyncActions<State, Params, Result, Err>): AsyncActionCreators<Params, Result, Err> & ThunkActionCreator<Params, Promise<Result>, ProjectState>;
}
