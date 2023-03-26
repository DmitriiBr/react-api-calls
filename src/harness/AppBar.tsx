import { memo } from 'react'
import { routes } from '../navigation/routes'
import { Link } from 'react-router-dom'

export const AppBar = memo(() => {
  return (
    <nav
      className="fixed top-0 flex items-center justify-center w-full h-10"
      style={{
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className="w-[1200px] grid grid-cols-5 m-auto mt-0 mb-0">
        {routes.map(({ path }) => (
          <Link
            className="capitalize text-2xl font-bold text-center"
            to={path}
            key={path}
          >
            {path === '/' ? 'Home' : path.slice(1, path.length)}
          </Link>
        ))}
      </div>
    </nav>
  )
})

AppBar.displayName = 'AppBar'
