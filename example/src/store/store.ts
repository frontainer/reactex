import { ReduxStore } from 'reactex'
import { RootModule } from '../modules/Root/RootModule'
import { IRootState } from '../modules/Root/RootState'

export type IAppState = {
  root: IRootState
}
const reducers = {
  root: RootModule.reducer
}
const rStore: ReduxStore<IAppState> = new ReduxStore<IAppState>(reducers, [], true)
export default rStore.store
