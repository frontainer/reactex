import { IAppState } from '../../store/store'
import { ReduxModule } from 'reactex'
import { IRootState, RootState } from './RootState'

export const RootModule = new ReduxModule<IRootState, IAppState>('ROOT', RootState)

export const syncAction = RootModule.sync<void>('INIT', (state, payload) => {
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
  // started: (state) => {
  //   state.asyncActionStatus = 'started'
  // },
  // failed: (state) => {
  //   state.asyncActionStatus = 'failed'
  // },
  // done: (state) => {
  //   state.asyncActionDone = true
  //   state.asyncActionStatus = 'done'
  // }
})
RootModule.case(asyncAction.started, state => {
  state.asyncActionStatus = 'started'
}).case(asyncAction.failed, (state, { error }) => {
  // console.error(error)
  state.asyncActionStatus = 'failed'
}).case(asyncAction.done, (state, { params, result }) => {
  state.asyncActionDone = true
  state.asyncActionStatus = 'done'
})

const RootSubModule = RootModule.subModule('SUB')
export const syncSubAction = RootSubModule.sync<string>('INIT', (state, payload) => {
  // alert(payload)
  return state
})
