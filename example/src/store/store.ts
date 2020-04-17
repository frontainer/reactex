import { ReduxStore } from 'reactex'
import { RootModule } from '../modules/Root/RootModule'
import { IRootState } from '../modules/Root/RootState'
import { connectRouter, LocationChangeAction, routerMiddleware, RouterState } from 'connected-react-router'
export type IAppState = {
  root: IRootState,
  router: RouterState
}
const rStore = new ReduxStore<IAppState, LocationChangeAction>({
  root: RootModule.reducer,
  router: connectRouter(history)
}, [
  routerMiddleware(history)
], process.env.NODE_ENV === 'development')

export default rStore.store
