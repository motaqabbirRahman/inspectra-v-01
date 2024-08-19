import { useState } from 'react'
import { Button } from '@/components/custom/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card } from '@/components/ui/card'
import { Waves, Gauge, ArrowDownNarrowWide } from 'lucide-react'
import VideoPlayerCard from './components/video-player-card'
import { RightSideBar } from './components/right-side-bar'
import DataCard from './components/data-card'
import { useParams, useNavigate } from 'react-router-dom'
import useFetchMission from '@/hooks/use-fetch-mission'
import BreadCrumb from './components/bread-crumb'
import { Skeleton } from '@/components/ui/skeleton'

const InspectionDetails = () => {
  const [activeTab, setActiveTab] = useState<string>('camera')
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  // const [loading, setLoading] = useState<boolean>(true)
  // const [error, setError] = useState<string | null>(null)

  const { inspectionId } = useParams<{ inspectionId: string }>()
  const navigate = useNavigate()

  const { mission, videoUrls, depth, current, speed, loading, error } =
    useFetchMission(inspectionId)

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const handlePlayPause = (playing: boolean) => {
    setIsPlaying(playing)
  }

  if (error) return <div>{error}</div>

  return (
    <Layout>
      <LayoutHeader>
        {/* <TopNav links={topNavData} /> */}
        <BreadCrumb />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>
      <LayoutBody className='space-y-4'>
        <Tabs
          orientation='vertical'
          defaultValue='camera'
          className='space-y-4'
          onValueChange={handleTabChange}
        >
          <div className='flex w-full items-center justify-between space-y-2 '>
            <div className='flex w-full items-center justify-between space-y-2'>
              <div className='flex flex-col items-start space-y-1'>
                {/* <h1 className='text-lg font-semibold md:text-2xl'>{title}</h1> */}
                <h1 className='text-lg font-semibold md:text-2xl'>
                  Hull Inspection
                </h1>
                <h2 className='md:text-l text-sm text-muted-foreground'>
                  2024-07-31 14:31:05
                </h2>
              </div>
            </div>

            <Button
              onClick={() =>
                navigate(`/inspections/${inspectionId}/generate-report`, {
                  state: { mission: mission },
                })
              }
            >
              Generate PDF
            </Button>
          </div>

          {/* Common Layout with Dynamic Main Video Player */}
          <div className='space-y-3'>
            <div className='grid gap-2 lg:grid-cols-3 lg:grid-rows-2'>
              {loading ? (
                <Skeleton className='log:row-span-1 bg-muted lg:col-span-2' />
              ) : (
                <div className='relative lg:col-span-2 lg:row-span-1'>
                  <TabsList className='absolute left-0 top-0 z-10 m-2 bg-zinc-900 bg-opacity-80 backdrop-blur-sm'>
                    <TabsTrigger value='camera'>Camera View</TabsTrigger>
                    <TabsTrigger value='enhanced'>Enhanced View</TabsTrigger>
                    <TabsTrigger value='detection'>Detection View</TabsTrigger>
                  </TabsList>

                  {activeTab === 'camera' && (
                    <VideoPlayerCard
                      url={videoUrls.cameraMain}
                      isPlaying={isPlaying}
                      handlePlayPause={handlePlayPause}
                    />
                  )}
                  {activeTab === 'enhanced' && (
                    <VideoPlayerCard
                      url={videoUrls.enhancedMain}
                      isPlaying={isPlaying}
                      handlePlayPause={handlePlayPause}
                    />
                  )}
                  {activeTab === 'detection' && (
                    <VideoPlayerCard
                      url={videoUrls.detectionMain}
                      isPlaying={isPlaying}
                      handlePlayPause={handlePlayPause}
                    />
                  )}
                </div>
              )}
              {/* RightSideBar */}
              <div className='lg:col-start-3 lg:row-span-2'>
                <RightSideBar />
              </div>
              {/* The two cards in column 2, starting from row 2 */}
              <div className='lg:col-span-2 lg:row-start-2'>
                <div className='lg:flex lg:space-x-4'>
                  {/* Map and Data section */}
                  <div className='flex flex-col lg:flex-1'>
                    <Card className='grid flex-1 gap-0 lg:grid-cols-6'>
                      <div className='m-3 flex lg:col-span-4'>
                        <AspectRatio ratio={16 / 9}>
                          <img
                            src='../../../../public/images/google-map-placeholder.png'
                            alt='Google Map'
                            className='h-full w-full rounded-lg object-cover'
                          />
                        </AspectRatio>
                      </div>
                      <div className='m-2 flex flex-col justify-center rounded-lg lg:col-span-2'>
                        <div className='flex justify-start'>
                          <h2 className='font-semibold'>Realtime View</h2>
                        </div>
                        <div className='flex flex-col'>
                          <DataCard
                            icon={ArrowDownNarrowWide}
                            label='Depth'
                            value={depth}
                            unit='m'
                          />
                          <DataCard
                            icon={Waves}
                            label='Current'
                            value={current}
                            unit='nm'
                          />
                          <DataCard
                            icon={Gauge}
                            label='Speed'
                            value={speed}
                            unit='m/s'
                          />
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Video Player section */}
                  <div className='flex flex-col lg:flex-1'>
                    {loading ? (
                      <Skeleton className='h-full w-full bg-muted' />
                    ) : (
                      <AspectRatio ratio={16 / 9} className='flex-1'>
                        <VideoPlayerCard
                          url={videoUrls.heatMapMain}
                          isPlaying={isPlaying}
                          handlePlayPause={handlePlayPause}
                        />
                      </AspectRatio>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tabs>
      </LayoutBody>
    </Layout>
  )
}

export default InspectionDetails
