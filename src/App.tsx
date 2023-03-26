import { memo } from 'react'
import { Router } from './navigation/Router'

export const App = memo(() => {
  return <Router />
})

App.displayName = 'App'
