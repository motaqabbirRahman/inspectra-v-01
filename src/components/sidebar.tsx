import { useEffect, useState } from 'react'
import { IconChevronsLeft, IconMenu2, IconX } from '@tabler/icons-react'
import { Layout, LayoutHeader } from './custom/layout'
import { Button } from './custom/button'
import Nav from './nav'
import { cn } from '@/lib/utils'
import { sidelinks } from '@/data/sidelinks'
import { Separator } from './ui/separator'
import inspectraLogo from '../../public/static/images/inspectra.png'
// import { GiBoatPropeller } from 'react-icons/gi'
import { TiWaves } from 'react-icons/ti'

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar2({
  className,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  const [navOpened, setNavOpened] = useState(false)
  useEffect(() => {
    if (navOpened) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [navOpened])

  return (
    <aside
      className={cn(
        `fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh ${isCollapsed ? 'md:w-14' : 'md:w-64'}`,
        className
      )}
    >
      {/* Overlay in mobile */}
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${navOpened ? 'h-svh opacity-50' : 'h-0 opacity-0'} w-full bg-black md:hidden`}
      />

      <Layout>
        {/* Header */}
        <LayoutHeader className='sticky top-0 justify-between px-2 py-2 shadow md:px-3'>
          <div className={`flex items-center ${!isCollapsed ? '' : ''}`}>
            <div className={`flex flex-col ${isCollapsed ? 'w-10' : 'w-auto'}`}>
              {/* <GiBoatPropeller
                className={`transition-all ${isCollapsed ? 'h-8 w-8 animate-spin' : 'h-4 w-4'}`}
              /> */}
              <TiWaves
                className={`transition-all ${isCollapsed ? ' h-8 w-8' : 'h-4 w-4 animate-wave'}`}
              />

              {!isCollapsed && (
                <>
                  <img
                    src={inspectraLogo}
                    alt='inspectraLogo'
                    className='sm:w-30 ml-0.5' // Adjust size for mobile & larger screens
                  />
                  <div className='flex justify-end'>
                    <span className='text-xs text-muted-foreground'>
                      Precision at Depth
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Toggle Button in mobile */}
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden'
            aria-label='Toggle Navigation'
            aria-controls='sidebar-menu'
            aria-expanded={navOpened}
            onClick={() => setNavOpened((prev) => !prev)}
          >
            {navOpened ? <IconX /> : <IconMenu2 />}
          </Button>
        </LayoutHeader>

        <Separator className='my-4' />

        {/* Navigation links */}
        <Nav
          id='sidebar-menu'
          className={`h-full flex-1 overflow-auto ${navOpened ? 'max-h-screen' : 'max-h-0 py-0 md:max-h-screen md:py-2'}`}
          closeNav={() => setNavOpened(false)}
          isCollapsed={isCollapsed}
          links={sidelinks}
        />

        {/*Footer*/}
        <div className={`p-4 ${isCollapsed ? 'text-center' : ''}`}>
          {!isCollapsed && (
            <div className='text-center'>
              <span className=' text-xs font-medium text-muted-foreground'></span>
            </div>
          )}

          <img
            src='https://ik.imagekit.io/dubotech/assets/img/logo-white-c.png?updatedAt=1719836340591'
            alt='Dubotech Logo'
            className={`transition-all ${isCollapsed ? 'mx-auto h-8 w-[24px]' : 'mx-auto h-12 w-auto'}`}
            style={{ aspectRatio: '3 / 1', objectFit: 'contain' }}
          />
        </div>

        {/* Scrollbar width toggle button */}
        <Button
          onClick={() => setIsCollapsed((prev) => !prev)}
          size='icon'
          variant='outline'
          className='absolute -right-5 top-1/2 hidden rounded-full md:inline-flex'
        >
          <IconChevronsLeft
            stroke={1.5}
            className={`h-5 w-5 ${isCollapsed ? 'rotate-180' : ''}`}
          />
        </Button>
      </Layout>
    </aside>
  )
}
