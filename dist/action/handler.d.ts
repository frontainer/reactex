export declare type Handler<InS, P> = (state: InS, payload: P) => void;
export declare type MaybePromise<Type> = Type | PromiseLike<Type>;
