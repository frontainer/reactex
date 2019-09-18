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
