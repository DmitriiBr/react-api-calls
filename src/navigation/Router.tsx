import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { routes } from './routes'
import { ReactNode, useCallback } from 'react'
import { Harness } from '../harness/Harness'

export const Router = () => {
  const getPage = useCallback(
    (page: ReactNode) => <Harness>{page}</Harness>,
    []
  )

  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route
            path={path}
            element={getPage(element)}
            key={path}
          />
        ))}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  )
}
