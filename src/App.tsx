import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'

import Routes from '@/navigation/routes'
import i18n from './i18n'
import { AppContextProvider } from './contexts'
import { store } from './redux/root-reducer'

import './App.scss'

const App: React.FC = () => (
  <Router>
    <Provider store={store}>
      <AppContextProvider>
        <I18nextProvider i18n={i18n}>
          <Routes />
        </I18nextProvider>
      </AppContextProvider>
    </Provider>
  </Router>
)

export default App
