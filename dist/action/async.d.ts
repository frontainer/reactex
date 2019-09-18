/** A function that takes parameters and returns a redux-thunk */
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Handler, MaybePromise } from './handler';
import { ActionCreatorFactory, AsyncActionCreators, Failure, Success } from 'typescript-fsa';
/**
 * A redux-thunk with the params as the first argument.  You don't have to
 * return a promise; but, the result of the dispatch will be one.
 */
export declare type AsyncWorker<Params, Result, State> = (params: Params, dispatch: ThunkDispatch<State, any, AnyAction>, getState: () => State) => MaybePromise<Result>;
export declare type ThunkActionCreator<Params, Result, State> = (params: Params) => ThunkAction<Result, State, any, AnyAction>;
export declare type AsyncActionCreator<State> = <Params, Succ, Err = Error>(type: string, async: AsyncWorker<Params, Succ, State>) => AsyncActionCreators<Params, Succ, Err> & ThunkActionCreator<Params, Promise<Succ>, State>;
export interface ActionFactory<State> {
    sync: ActionCreatorFactory;
    async: AsyncActionCreator<State>;
}
export interface AsyncActions<State, Params, Result, Error> {
    started?: Handler<State, Params>;
    done?: Handler<State, Success<Params, Result>>;
    failed?: Handler<State, Failure<Params, Error>>;
}
export declare function createActionFactory<State>(prefix: string): ActionFactory<State>;
