import { memo } from 'react'
import { Router } from './navigation/Router'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export const App = memo(() => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </Provider>
  )
})

App.displayName = 'App'
