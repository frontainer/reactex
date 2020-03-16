import { ReduxModule } from './module/module'
import { ReduxStore } from './store/store'

export * from './module/module'
export * from './store/store'
export default {
  Module: ReduxModule,
  Store: ReduxStore
}
