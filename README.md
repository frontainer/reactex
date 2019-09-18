# reactex

TypeSafe Reducers and Actions Library

Inspired by vuex, typescript-fsa-reducers, typescript-fsa-reducers-thunk, typescript-fsa-redux-thunk

## dependencies
- redux
- redux-thunk
- immer

## how to use

```
npm i reactex --save
```

please show [example](./example)

## Example

store/store.ts
```
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
```

modules/Root/RootModule.ts
```
import { IAppState } from '../../store/store'
import Reactex from 'reactex'
import { IRootState, RootState } from './RootState'

export const RootModule = new Reactex.Module<IRootState, IAppState>('ROOT', RootState)

export const syncAction = RootModule.sync<string>('INIT', (state, payload) => {

  state.syncActionDone = true
  return state
})

export const asyncAction = RootModule.async<void, unknown, Error>('INIT2', async(payload, dispatch, getState) => {
  // async action
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve()
    }, 3000)
  })
}, {
  started: (state) => {
    state.asyncActionStatus = 'started'
  },
  failed: (state) => {
    state.asyncActionStatus = 'failed'
  },
  done: (state) => {
    state.asyncActionDone = true
    state.asyncActionStatus = 'done'
  }
})

// Also can write like following
// 
// RootModule.case(asyncAction.started, state => {
//   state.asyncActionStatus = 'started'
// }).case(asyncAction.failed, (state, { error }) => {
//   console.error(error)
//   state.asyncActionStatus = 'failed'
// }).case(asyncAction.done, (state, { params, result }) => {
//   state.asyncActionDone = true
//   state.asyncActionStatus = 'done'
// })
```

modules/Root/RootState.ts
```
export type IRootState = {
  syncActionValue: string
  syncActionDone: boolean
  asyncActionDone: boolean
  asyncActionStatus: string
}
export const RootState: IRootState = {
  syncActionValue: '',
  syncActionDone: false,
  asyncActionDone: false,
  asyncActionStatus: ''
}
```

then, call action using dispatch function 
`dispatch(syncAction('fda'))`