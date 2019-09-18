import React from 'react'
import { useRoot } from './UseRoot'

type Props = {}

const Root: React.FC<Props> = () => {
  const state = useRoot()
  return (
    <div className="root">
      <h1>example</h1>
      <table>
        <tbody>
        <tr>
          <th>sync action</th>
          <td>
            <span hidden={!state.syncActionDone}>done!({state.syncActionValue})</span>
          </td>
        </tr>
        <tr>
          <th>async action</th>
          <td>
            <span hidden={state.asyncActionDone}>{state.asyncActionStatus}</span>
            <span hidden={!state.asyncActionDone}>done!</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}
export default Root
