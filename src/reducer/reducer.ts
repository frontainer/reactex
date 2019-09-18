import { AnyAction } from 'redux'
import { Action, ActionCreator } from 'typescript-fsa'

export type Handler<InS, P> = (
  state: InS,
  payload: P,
) => void;

export interface ReducerBuilder<InS> {
  case<P>(actionCreator: ActionCreator<P>, handler: Handler<InS, P>): ReducerBuilder<InS>;
  caseWithAction<P>(actionCreator: ActionCreator<P>, handler: Handler<InS, Action<P>>): ReducerBuilder<InS>;
  cases<P1>(actionCreators: [ActionCreator<P1>], handler: Handler<InS, P1>): ReducerBuilder<InS>;
  cases<P1, P2>(actionCreators: [ActionCreator<P1>, ActionCreator<P2>], handler: Handler<InS, P1 | P2>): ReducerBuilder<InS>;
  cases<P1, P2, P3>(actionCreators: [ActionCreator<P1>, ActionCreator<P2>, ActionCreator<P3>], handler: Handler<InS, P1 | P2 | P3>): ReducerBuilder<InS>;
  cases<P1, P2, P3, P4>(actionCreators: [ActionCreator<P1>, ActionCreator<P2>, ActionCreator<P3>, ActionCreator<P4>], handler: Handler<InS, P1 | P2 | P3 | P4>): ReducerBuilder<InS>;
  cases<P>(actionCreators: Array<ActionCreator<P>>, handler: Handler<InS, P>): ReducerBuilder<InS>;
  casesWithAction<P1>(actionCreators: [ActionCreator<P1>], handler: Handler<InS, Action<P1>>): ReducerBuilder<InS>;
  casesWithAction<P1, P2>(actionCreators: [ActionCreator<P1>, ActionCreator<P2>], handler: Handler<InS, Action<P1 | P2>>): ReducerBuilder<InS>;
  casesWithAction<P1, P2, P3>(actionCreators: [ActionCreator<P1>, ActionCreator<P2>, ActionCreator<P3>], handler: Handler<InS, Action<P1 | P2 | P3>>): ReducerBuilder<InS>;
  casesWithAction<P1, P2, P3, P4>(actionCreators: [ActionCreator<P1>, ActionCreator<P2>, ActionCreator<P3>, ActionCreator<P4>], handler: Handler<InS, Action<P1 | P2 | P3 | P4>>): ReducerBuilder<InS>;
  casesWithAction<P>(actionCreators: Array<ActionCreator<P>>, handler: Handler<InS, Action<P>>): ReducerBuilder<InS>;
  withHandling(updateBuilder: (builder: ReducerBuilder<InS>) => ReducerBuilder<InS>): ReducerBuilder<InS>;
  default(defaultHandler: Handler<InS, AnyAction>): (state: InS | undefined, action: {
    type: any;
  }) => void;
  build(): (state: InS | undefined, action: {
    type: any;
  }) => void;
  (state: InS | undefined, action: AnyAction): void;
}

export function reducerWithInitialState<S>(initialState: S): ReducerBuilder<S> {
  return makeReducer<S>(initialState);
}

function makeReducer<InS>(
  initialState?: InS,
): ReducerBuilder<InS> {
  const handlersByActionType: {
    [actionType: string]: Handler<InS, any>;
  } = {};
  const reducer = getReducerFunction(
    initialState,
    handlersByActionType,
  ) as ReducerBuilder<InS>;

  reducer.caseWithAction = <P>(
    actionCreator: ActionCreator<P>,
    handler: Handler<InS, Action<P>>,
  ) => {
    handlersByActionType[actionCreator.type] = handler;
    return reducer;
  };

  reducer.case = <P>(
    actionCreator: ActionCreator<P>,
    handler: Handler<InS, P>,
  ) =>
    reducer.caseWithAction(actionCreator, (state: InS, action: Action<P>) =>
      handler(state, action.payload),
    );

  reducer.casesWithAction = <P>(
    actionCreators: Array<ActionCreator<P>>,
    handler: Handler<InS, Action<P>>,
  ) => {
    for (const actionCreator of actionCreators) {
      reducer.caseWithAction(actionCreator, handler);
    }
    return reducer;
  };

  reducer.cases = <P>(
    actionCreators: Array<ActionCreator<P>>,
    handler: Handler<InS, P>,
  ) =>
    reducer.casesWithAction(actionCreators, (state: InS, action: Action<P>) =>
      handler(state, action.payload),
    );

  reducer.withHandling = (
    updateBuilder: (
      builder: ReducerBuilder<InS>,
    ) => ReducerBuilder<InS>,
  ) => updateBuilder(reducer);

  reducer.default = (defaultHandler: Handler<InS, AnyAction>) =>
    getReducerFunction(
      initialState,
      { ...handlersByActionType },
      defaultHandler,
    );

  reducer.build = () =>
    getReducerFunction(initialState, { ...handlersByActionType });

  return reducer;
}

function getReducerFunction<InS extends OutS, OutS>(
  initialState: InS | undefined,
  handlersByActionType: { [actionType: string]: Handler<InS, any> },
  defaultHandler?: Handler<InS, AnyAction>,
) {
  return (state = initialState as InS, action: AnyAction) => {
    const handler = handlersByActionType[action.type] || defaultHandler;
    return handler ? handler(state, action) : state;
  };
}
