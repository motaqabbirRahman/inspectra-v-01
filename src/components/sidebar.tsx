import { useEffect, useState } from 'react'
import { IconChevronsLeft, IconMenu2, IconX } from '@tabler/icons-react'
import { Layout, LayoutHeader } from './custom/layout'
import { Button } from './custom/button'
import Nav from './nav'
import { cn } from '@/lib/utils'
import { sidelinks } from '@/data/sidelinks'
import { Separator } from './ui/separator'

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
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='#ffffff'
              viewBox='0 0 556 556'
              className={`transition-all ${isCollapsed ? 'h-8 w-8' : 'h-18 w-20'}`}
              stroke='#ffffff'
              stroke-width='6'
            >
              <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
              <g
                id='SVGRepo_tracerCarrier'
                stroke-linecap='round'
                stroke-linejoin='round'
              ></g>
              <g id='SVGRepo_iconCarrier'>
                <path d='M193,332.94,173.7,321.82V299.57a5.33,5.33,0,1,0-10.66,0v22.25l-19.27,11.12a5.33,5.33,0,0,0,5.33,9.24l19.27-11.13,19.27,11.13a5.33,5.33,0,0,0,5.33-9.24Z'></path>
                <path d='M418.71,285.81,310.14,231h23.28a19.86,19.86,0,0,0,19.83-19.83V168.63a20,20,0,0,0,15.18-19.36V121.5a5.33,5.33,0,1,0-10.66,0v27.77a9.36,9.36,0,0,1-9.35,9.35H328.19a9.37,9.37,0,0,1-9.35-9.35V121.5a5.33,5.33,0,1,0-10.66,0v27.77a20,20,0,0,0,12.47,18.51v27.84H279.1a5.21,5.21,0,0,0-1.26.25,36,36,0,0,0-16.57-4.17H250.44A35.84,35.84,0,0,0,234,195.83a5.28,5.28,0,0,0-1-.21H191.34V167.78a20,20,0,0,0,12.48-18.51V121.5a5.33,5.33,0,1,0-10.66,0v27.77a9.37,9.37,0,0,1-9.35,9.35H163.58a9.36,9.36,0,0,1-9.35-9.35V121.5a5.33,5.33,0,1,0-10.66,0v27.77a20,20,0,0,0,15.18,19.36v42.51A19.86,19.86,0,0,0,178.58,231h23.28L93.29,285.81a5.34,5.34,0,0,0-2.92,4.76v69.29a5.33,5.33,0,0,0,4.28,5.23L240,394.27a5.53,5.53,0,0,0,.7.07,36.16,36.16,0,0,0,9.75,1.49h10.83a36.21,36.21,0,0,0,9.65-1.46h0a5.51,5.51,0,0,0,1.06-.1l145.34-29.18a5.33,5.33,0,0,0,4.28-5.23V290.57A5.34,5.34,0,0,0,418.71,285.81Zm-75.08,76.26a37.4,37.4,0,1,1,37.4-37.4A37.44,37.44,0,0,1,343.63,362.07Zm-11.24,9.2-40.78,8.18a36.11,36.11,0,0,0,6.05-20v-21.5A48,48,0,0,0,332.39,371.27Zm-6.41-165a5.33,5.33,0,0,0,5.33-5.33V169.28h11.27v41.86a9.18,9.18,0,0,1-9.16,9.17H296.78a36,36,0,0,0-6.56-14Zm-64.71-3.92a25.86,25.86,0,0,1,4.06.41v30.12c0,11-7.3,12.05-9.42,12.1s-9.54-1.08-9.54-12.1V202.77a25.87,25.87,0,0,1,4.07-.41ZM131,324.67a37.4,37.4,0,1,1,37.4,37.4A37.45,37.45,0,0,1,131,324.67ZM214,338.88v20.55a36.1,36.1,0,0,0,6,20l-40.45-8.12A48,48,0,0,0,214,338.88ZM169.42,211.14V169.28h11.26V201a5.33,5.33,0,0,0,5.33,5.33h35.47a36.16,36.16,0,0,0-6.56,14H178.58A9.18,9.18,0,0,1,169.42,211.14ZM101,293.85l113-57.09v73.7a47.92,47.92,0,1,0-73.95,52.88L101,355.49Zm149.41,91.32a25.77,25.77,0,0,1-25.74-25.74V228.09a25.68,25.68,0,0,1,11-21v25.84c0,18.68,14.54,22.77,20.14,22.77S276,251.57,276,232.89V207.05a25.69,25.69,0,0,1,11,21V359.43a25.76,25.76,0,0,1-25.73,25.74ZM411,355.49l-39.06,7.85a47.93,47.93,0,1,0-74.25-51.92V236.61L411,293.85Z'></path>
                <path d='M368.23,332.94,349,321.82V299.57a5.33,5.33,0,1,0-10.66,0v22.25L319,332.94a5.33,5.33,0,0,0,5.33,9.24l19.27-11.13,19.27,11.13a5.33,5.33,0,0,0,5.33-9.24Z'></path>
              </g>
            </svg>
            <div
              className={`flex flex-col justify-end truncate ${isCollapsed ? 'invisible w-0' : 'visible w-auto'}`}
            >
              <span className='font-medium'>Inspectra Admin</span>
              <span className='text-xs text-muted-foreground'>
                Precision at Depth
              </span>
              <div></div>
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
