import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { postApi } from '../api/postApi/postApi'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const rootReducer = combineReducers({
  [postApi.reducerPath]: postApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
