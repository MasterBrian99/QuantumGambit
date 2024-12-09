import { ModeToggle } from '@/components/mode-toggle'
import { ChartNoAxesCombined, Home, Microscope } from 'lucide-react'
import { NavLink, Outlet } from 'react-router'

const Layout = () => {
  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b">
        <div className="flex items-center justify-between gap-2 px-3 w-full">
          <div>asd</div>
          <div className="flex flex-row justify-center gap-6  items-center">
            <div>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? 'text-red-500' : 'text-black'
                }
              >
                <Home size={32} />
              </NavLink>
            </div>
            <div>
              <NavLink
                to="/analysis"
                end
                className={({ isActive }) =>
                  isActive ? 'text-red-500' : 'text-black'
                }
              >
                <Microscope size={32} />
              </NavLink>
            </div>
            <div>
              <ChartNoAxesCombined size={32} />
            </div>
          </div>
          <div>
            <ModeToggle />
          </div>
        </div>
      </header>

      <div className="p-4">
        <Outlet />
      </div>
    </>
  )
}

export default Layout
