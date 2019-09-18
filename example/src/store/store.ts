import Reactex from 'reactex'
import { RootModule } from '../modules/Root/RootModule'
import { IRootState } from '../modules/Root/RootState'

export type IAppState = {
  root: IRootState
}
const reducers = {
  root: RootModule.reducer
}
const rStore = new Reactex.Store<IAppState>(reducers)
export default rStore.store
