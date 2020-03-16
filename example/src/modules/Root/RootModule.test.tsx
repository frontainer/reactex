import React from 'react';
import { asyncAction, RootModule, syncAction } from './RootModule'
import { RootState } from './RootState'
it('RootModule', () => {
  expect(RootModule).toBeDefined()
  expect(RootModule.name).toBe('ROOT')
})
it('syncAction', () => {
  expect(syncAction()).toEqual({
    type: 'ROOT/INIT',
    payload: undefined
  })
  const state = RootModule.reducer(RootState, syncAction())
  expect(state.syncActionDone).toBe(true)
})
it('asyncAction', () => {
  expect(asyncAction.type).toBe('ROOT/INIT2')
  expect(asyncAction.started()).toEqual({
    type: 'ROOT/INIT2_STARTED',
    payload: undefined
  })
  expect(asyncAction.failed({ error: new Error() })).toEqual({
    type: 'ROOT/INIT2_FAILED',
    error: true,
    payload: { error: new Error() }
  })
  expect(asyncAction.done({ result: '' })).toEqual({
    type: 'ROOT/INIT2_DONE',
    payload: {
      result: ''
    }
  })
})
it('asyncAction.started()', () => {
  const state = RootModule.reducer(RootState, asyncAction.started())
  expect(state.asyncActionStatus).toBe('started')
})
it('asyncAction.failed()', () => {
  const state = RootModule.reducer(RootState, asyncAction.failed({ error: new Error() }))
  expect(state.asyncActionStatus).toBe('failed')
})
it('asyncAction.done()', () => {
  const state = RootModule.reducer(RootState, asyncAction.done({ result: '' }))
  expect(state.asyncActionStatus).toBe('done')
  expect(state.asyncActionDone).toBe(true)
})