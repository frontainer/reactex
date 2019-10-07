import produce from 'immer'
import { Produced } from 'immer'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { ActionCreator, AsyncActionCreators } from 'typescript-fsa'
import { ActionFactory, AsyncActions, createActionFactory, ThunkActionCreator } from '../action/async'
import { Handler, MaybePromise } from '../action/handler'
import { ReducerBuilder, reducerWithInitialState } from '../reducer/reducer'

export class ReduxModule<State, ProjectState = State> {
  private _generator: ActionFactory<ProjectState>
  private _reducer: ReducerBuilder<State>
  constructor(public name: string, initialState: State) {
    this._generator = createActionFactory<ProjectState>(name)
    this._reducer = reducerWithInitialState<State>(initialState)
  }
  public sync<Payload = void>(name: string, handler?: Handler<State, Payload>): ActionCreator<Payload> {
    const actionCreator = this._generator.sync<Payload>(name)
    if (handler) {
      this.case<Payload>(actionCreator, handler)
    }
    return actionCreator
  }
  public async<Params = void, Result = void, Error = {}>(
    name: string,
    factory: (params: Params, dispatch: ThunkDispatch<State | ProjectState, any, AnyAction>, getState: () => ProjectState) => MaybePromise<Result>,
    actions?: AsyncActions<State, Params, Result, Error>,
  ): AsyncActionCreators<Params, Result, Error> & ThunkActionCreator<Params, Promise<Result>, ProjectState> {
    const actionCreator = this._generator.async<Params, Result, Error>(name, factory)
    if (actions) {
      if (actions.started) {
        this.case(actionCreator.started, actions.started)
      }
      if (actions.done) {
        this.case(actionCreator.done, actions.done)
      }
      if (actions.failed) {
        this.case(actionCreator.failed, actions.failed)
      }
    }
    return actionCreator
  }
  public get reducer(): (base: any, action: AnyAction) => Produced<any, State> {
    return produce(this._reducer)
  }
  public case<Payload>(actionCreator: ActionCreator<Payload>, handler: Handler<State, Payload>): this {
    this._reducer.case<Payload>(actionCreator, handler)
    return this
  }
}
