import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { RecentMissions } from './components/recent-mission'
import { Overview } from './components/overview'

export default function Dashboard() {
  return (
    <>
      <Layout>
        {/* ===== Top Heading ===== */}
        <LayoutHeader>
          {/* <TopNav links={topNav} /> */}
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
            Dashboard
          </h1>
          <div className='ml-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <UserNav />
          </div>
        </LayoutHeader>
        {/* ===== Main ===== */}
        <LayoutBody className='space-y-4'>
          <Tabs
            orientation='vertical'
            defaultValue='overview'
            className='space-y-4'
          >
            <div className='w-full overflow-x-scroll pb-2'>
              <TabsList>
                <TabsTrigger value='overview'>Overview</TabsTrigger>
                <TabsTrigger value='analytics'>Analytics</TabsTrigger>
                <TabsTrigger value='reports'>Reports</TabsTrigger>
                <TabsTrigger value='notifications'>Notifications</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value='overview' className='space-y-4'>
              <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Total Inspection
                    </CardTitle>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-muted-foreground'
                    >
                      <path d='M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2' />
                      <path d='M15 2H9a1 1 0 00-1 1v2a1 1 0 001 1h6a1 1 0 001-1V3a1 1 0 00-1-1z' />
                      <path d='M12 11h4' />
                      <path d='M12 16h4' />
                      <path d='M8 11h.01' />
                      <path d='M8 16h.01' />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>+152</div>
                    <p className='text-xs text-muted-foreground'>
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Completed Inspctions
                    </CardTitle>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-muted-foreground'
                    >
                      <path d='M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2' />
                      <path d='M15 2H9a1 1 0 00-1 1v2a1 1 0 001 1h6a1 1 0 001-1V3a1 1 0 00-1-1z' />
                      <path d='M9 13l2 2 4-4' />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>+120</div>
                    <p className='text-xs text-muted-foreground'>
                      +15% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Ongoing Inspections
                    </CardTitle>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-muted-foreground'
                    >
                      <path d='M16 4h2a2 2 0 012 2v4M8 4H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2v-2' />
                      <rect x='8' y='2' width='8' height='4' rx='1' ry='1' />
                      <path d='M21 14H11' />
                      <path d='M15 10l-4 4 4 4' />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>+5</div>
                    <p className='text-xs text-muted-foreground'>
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Active Drones
                    </CardTitle>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-muted-foreground'
                    >
                      <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>+8</div>
                    <p className='text-xs text-muted-foreground'>
                      +1 since last month
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
                <Card className='col-span-1 lg:col-span-4'>
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className='pl-2'>
                    <Overview />
                  </CardContent>
                </Card>
                <Card className='col-span-1 lg:col-span-3'>
                  <CardHeader>
                    <CardTitle>Recent Reports</CardTitle>
                    <CardDescription>
                      Generated Reports this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentMissions />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </LayoutBody>
      </Layout>
    </>
  )
}
