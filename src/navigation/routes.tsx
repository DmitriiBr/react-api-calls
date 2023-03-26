import { ReactNode } from 'react'
import { Harness } from '../harness/Harness'
import { RoutesItem } from '../models/RouteDTO/RouteDTO'
import { Axios, Fetch, Main, ReactQuery, RtkQuery } from '../pages'

export const routes: RoutesItem[] = [
  { path: '/', element: <Main /> },
  { path: '/fetch', element: <Fetch /> },
  { path: '/axios', element: <Axios /> },
  { path: '/rtk-query', element: <RtkQuery /> },
  { path: '/react-query', element: <ReactQuery /> },
]
