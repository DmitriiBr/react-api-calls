import { memo } from 'react'
import { Router } from './navigation/Router'
import { Provider } from 'react-redux'
import { store } from './store/store'

export const App = memo(() => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
})

App.displayName = 'App'
