import React from 'react';
import { Provider } from 'react-redux'
import Root from './modules/Root/Root'
import store from './store/store'
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  )
}

export default App;
