/** A function that takes parameters and returns a redux-thunk */
import { AnyAction } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { Handler, MaybePromise } from './handler'
import actionCreatorFactory, { ActionCreatorFactory, AsyncActionCreators, Failure, Success } from 'typescript-fsa'

/**
 * A redux-thunk with the params as the first argument.  You don't have to
 * return a promise; but, the result of the dispatch will be one.
 */
export type AsyncWorker<Params, Result, State> = (
  params: Params,
  dispatch: ThunkDispatch<State, any, AnyAction>,
  getState: () => State
) => MaybePromise<Result>

export type ThunkActionCreator<Params, Result, State> = (
  params: Params,
) => ThunkAction<Result, State, any, AnyAction>

export type AsyncActionCreator<State> = <Params, Succ, Err = Error>(
  type: string,
  async: AsyncWorker<Params, Succ, State>,
) => AsyncActionCreators<Params, Succ, Err> & ThunkActionCreator<Params, Promise<Succ>, State>

export interface ActionFactory<State> {
  sync: ActionCreatorFactory
  async: AsyncActionCreator<State>
}

export interface AsyncActions<State, Params, Result, Error> {
  started?: Handler<State, Params>
  done?: Handler<State, Success<Params, Result>>
  failed?: Handler<State, Failure<Params, Error>>
}

const bindThunkAction = <Params, Success, Err, State>(
  actionCreators: AsyncActionCreators<Params, Success, Err>,
  asyncWorker: AsyncWorker<Params, Success, State>,
): ThunkActionCreator<Params, Promise<Success>, State> => (params: Params) => async(dispatch, getState) => {
  try {
    dispatch(actionCreators.started(params!))
    const result = await asyncWorker(params!, dispatch, getState)
    dispatch(actionCreators.done({ params: params!, result }))
    return result
  } catch (error) {
    dispatch(actionCreators.failed({ params: params!, error }))
    throw error
  }
}
const asyncFactory = <State = any>(factory: ActionCreatorFactory) => <Params, Succ, Err = Error>(
  type: string,
  fn: AsyncWorker<Params, Succ, State>,
  async = factory.async<Params, Succ, Err>(type),
) => Object.assign(bindThunkAction(async, fn), async)

export function createActionFactory<State>(prefix: string): ActionFactory<State> {
  const actionCreator = actionCreatorFactory(prefix)
  const createAsync = asyncFactory<State>(actionCreator)
  return {
    sync: actionCreator,
    async: createAsync,
  }
}
