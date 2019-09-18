import { AnyAction } from 'redux';
import { Action, ActionCreator } from 'typescript-fsa';
export declare type Handler<InS, P> = (state: InS, payload: P) => void;
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
export declare function reducerWithInitialState<S>(initialState: S): ReducerBuilder<S>;
