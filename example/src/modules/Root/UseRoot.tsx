import { useEffect } from 'react'
import { batch, useDispatch, useSelector } from 'react-redux'
import { IAppState } from '../../store/store'
import { syncAction, asyncAction } from './RootModule'
import { rootSelector } from './RootSelectors'
import { IRootState } from './RootState'

export const useRoot = () => {
  const dispatch = useDispatch()
  const rootState = useSelector<IAppState, IRootState>(rootSelector)
  useEffect(() => {
    batch(() => {
      dispatch(syncAction('fda'))
      dispatch(asyncAction())
    })
  }, [dispatch])
  return rootState
}
