export type Handler<InS, P> = (state: InS, payload: P) => void;
export type MaybePromise<Type> = Type | PromiseLike<Type>
