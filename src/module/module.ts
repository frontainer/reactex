import produce from 'immer'
import { Produced } from 'immer/dist/types/types-external'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { ActionCreator, AsyncActionCreators } from 'typescript-fsa'
import { ActionFactory, AsyncActions, createActionFactory, ThunkActionCreator } from '../action/async'
import { Handler, MaybePromise } from '../action/handler'
import { ReducerBuilder, reducerWithInitialState } from '../reducer/reducer'

export abstract class AbsReduxSubModule<State, ProjectState = State> {
  protected _generator: ActionFactory<ProjectState>
  protected _reducer: ReducerBuilder<State>
  public sync<Payload = void>(name: string, handler?: Handler<State, Payload>): ActionCreator<Payload> {
    const actionCreator = this._generator.sync<Payload>(name)
    if (handler) {
      this.case<Payload>(actionCreator, handler)
    }
    return actionCreator
  }
  public async<Params = void, Result = void, Err = Error>(
    name: string,
    factory: (params: Params, dispatch: ThunkDispatch<State | ProjectState, any, AnyAction>, getState: () => ProjectState) => MaybePromise<Result>,
    actions?: AsyncActions<State, Params, Result, Err>,
  ): AsyncActionCreators<Params, Result, Err> & ThunkActionCreator<Params, Promise<Result>, ProjectState> {
    const actionCreator = this._generator.async<Params, Result, Err>(name, factory)
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
  public case<Payload>(actionCreator: ActionCreator<Payload>, handler: Handler<State, Payload>): this {
    this._reducer.case<Payload>(actionCreator, handler)
    return this
  }
}

export class ReduxModule<State, ProjectState = State> extends AbsReduxSubModule<State, ProjectState> {
  constructor(public name: string, initialState: State) {
    super()
    this._generator = createActionFactory<ProjectState>(name)
    this._reducer = reducerWithInitialState<State>(initialState)
  }
  public subModule(name: string) {
    return new ReduxSubModule(name, this._generator, this._reducer)
  }
  public get reducer(): (base: any, action: AnyAction) => Produced<any, State> {
    return produce(this._reducer)
  }
}
export class ReduxSubModule<State, ProjectState = State> extends AbsReduxSubModule<State, ProjectState> {
  constructor(
    public name: string,
    _generator: ActionFactory<ProjectState>,
    _reducer: ReducerBuilder<State>
  ) {
    super()
    this._generator = _generator
    this._reducer = _reducer
  }
  public sync<Payload = void>(name: string, handler?: Handler<State, Payload>): ActionCreator<Payload> {
    return super.sync<Payload>(`${this.name}__${name}`, handler)
  }
  public async<Params = void, Result = void, Err = Error>(
    name: string,
    factory: (params: Params, dispatch: ThunkDispatch<State | ProjectState, any, AnyAction>, getState: () => ProjectState) => MaybePromise<Result>,
    actions?: AsyncActions<State, Params, Result, Err>,
  ): AsyncActionCreators<Params, Result, Err> & ThunkActionCreator<Params, Promise<Result>, ProjectState> {
     return super.async<Params, Result, Err>(`${this.name}__${name}`, factory, actions)
  }
}
