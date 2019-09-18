import { IRootState } from './RootState'
import { IAppState } from '../../store/store'
export const rootSelector = (state: IAppState): IRootState => state.root
