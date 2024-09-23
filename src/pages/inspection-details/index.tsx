import { useState, useEffect } from 'react'
import { Button } from '@/components/custom/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card } from '@/components/ui/card'
import { Waves, Gauge, ArrowDownNarrowWide } from 'lucide-react'
import VideoPlayerCard from './components/video-player-card'
import RightSideBar from './components/right-side-bar'
import DataCard from './components/data-card'
import { useParams, useNavigate } from 'react-router-dom'
import useFetchMission from '@/hooks/use-fetch-mission'
import BreadCrumb from './components/bread-crumb'
import { Skeleton } from '@/components/ui/skeleton'
// import map from '../../../public/static/images/google-map-placeholder.png'
import { useVideoContext } from '../../contexts/video-context'
import { Badge } from '@/components/ui/badge'
import { Play, Pause } from 'lucide-react'
import DvlViewer from './components/dvl-viewer'

const InspectionDetails = () => {
  const { inspectionId } = useParams<{ inspectionId: string }>()
  const navigate = useNavigate()
  const { mission, title, formattedDate, videoUrls, loading, error } =
    useFetchMission(inspectionId)

  const { isPlaying, setIsPlaying } = useVideoContext() // Use context for video state

  const [activeTab, setActiveTab] = useState<string>('camera')
  const [currentDepth, setCurrentDepth] = useState<number>(10)
  const [currentCurrent, setCurrentCurrent] = useState<number>(1.0)
  const [currentSpeed, setCurrentSpeed] = useState<number>(3)
  // const [mapState, setMapState] = useState({
  //   // Initialize with default values or saved state
  //   center: { lat: 22.341855, lng: 91.756365 },
  //   zoom: 10,
  // })

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined

    if (isPlaying) {
      intervalId = setInterval(() => {
        // Simulate depth with predefined data
        const time = Date.now() % 120000 // Time in milliseconds (120 seconds)
        const seconds = Math.floor(time / 1000)

        if (seconds <= 10) {
          setCurrentDepth(10 - seconds / 10)
        } else if (seconds <= 35) {
          setCurrentDepth(9.3 + ((seconds - 10) * (10.3 - 9.3)) / 25)
        } else if (seconds <= 40) {
          setCurrentDepth(10 - ((seconds - 35) * (10 - 9.8)) / 5)
        } else if (seconds <= 45) {
          setCurrentDepth(9.8 - ((seconds - 40) * (9.8 - 9.5)) / 5)
        } else {
          setCurrentDepth(9.9 - ((seconds - 45) * (9.9 - 9.5)) / (120 - 45))
        }

        // Simulate current and speed (can be predefined or adjusted as needed)
        setCurrentCurrent(1.0 + Math.sin(seconds / 10) * 0.5)
        setCurrentSpeed(3.0 - Math.cos(seconds / 15) * 0.5)
      }, 1000) // Update every second
    } else {
      if (intervalId) clearInterval(intervalId)
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [isPlaying])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const handlePlayPause = (playing: boolean) => {
    setIsPlaying(playing)
  }

  const handlePreviewMission = () => {
    setIsPlaying((prev) => !prev) // Toggle play/pause
  }
  if (error) return <div>{error}</div>

  return (
    <Layout>
      <LayoutHeader>
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
          <div className='flex w-full items-center justify-between space-y-2'>
            <div className='flex w-full items-center justify-between space-y-2'>
              <div className='flex flex-col items-start space-y-1'>
                <h1 className='text-lg font-semibold md:text-2xl'>{title}</h1>
                <h2 className='md:text-l text-sm text-muted-foreground'>
                  {formattedDate}
                </h2>
              </div>
            </div>
            <Button
              onClick={handlePreviewMission}
              className={`m-2 flex items-center space-x-2 ${isPlaying ? 'border-2 border-primary bg-secondary' : 'bg-secondary'}`}
            >
              {isPlaying ? (
                <Pause className='h-4 w-4' />
              ) : (
                <Play className='h-4 w-4' />
              )}
              <span>{isPlaying ? 'Pause Mission' : 'Preview Mission'}</span>
            </Button>
            <Button
              onClick={() =>
                navigate(`/inspections/${inspectionId}/generate-report`, {
                  state: { mission: mission },
                })
              }
            >
              Generate Report
            </Button>
          </div>

          {/* Main Layout with Video Player and Data Boxes */}
          <div className='space-y-3'>
            <div className='grid gap-2 xl:grid-cols-3 xl:grid-rows-2'>
              {loading ? (
                <Skeleton className='bg-muted xl:col-span-2 xl:row-span-1' />
              ) : (
                <div className='relative xl:col-span-2 xl:row-span-1'>
                  <TabsList className='absolute left-0 top-0 z-10 m-2 bg-muted bg-opacity-80 backdrop-blur-sm'>
                    <TabsTrigger value='camera'>Camera View</TabsTrigger>
                    <TabsTrigger value='enhanced'>Enhanced View</TabsTrigger>
                    <TabsTrigger value='detection'>Detection View</TabsTrigger>
                  </TabsList>

                  {activeTab === 'camera' && (
                    <div className='relative'>
                      <VideoPlayerCard
                        url={videoUrls.cameraMain}
                        isPlaying={isPlaying}
                        handlePlayPause={handlePlayPause}
                      />
                      <div className='absolute bottom-20 left-0 m-2 rounded-lg'>
                        <DataCard
                          icon={ArrowDownNarrowWide}
                          label='Depth'
                          value={currentDepth.toFixed(1)}
                          unit='m'
                        />
                        <DataCard
                          icon={Waves}
                          label='Current'
                          value={currentCurrent.toFixed(1)}
                          unit='kn'
                        />
                        <DataCard
                          icon={Gauge}
                          label='Speed'
                          value={currentSpeed.toFixed(1)}
                          unit='kn'
                        />
                      </div>
                    </div>
                  )}
                  {activeTab === 'enhanced' && (
                    <div className='relative'>
                      <VideoPlayerCard
                        url={videoUrls.enhancedMain}
                        isPlaying={isPlaying}
                        handlePlayPause={handlePlayPause}
                      />
                      <div className='rounde absolute bottom-20 left-0 m-2 p-2 shadow'>
                        <DataCard
                          icon={ArrowDownNarrowWide}
                          label='Depth'
                          value={currentDepth.toFixed(1)}
                          unit='m'
                        />
                        <DataCard
                          icon={Waves}
                          label='Current'
                          value={currentCurrent.toFixed(1)}
                          unit='kn'
                        />
                        <DataCard
                          icon={Gauge}
                          label='Speed'
                          value={currentSpeed.toFixed(1)}
                          unit='kn'
                        />
                      </div>
                    </div>
                  )}
                  {activeTab === 'detection' && (
                    <div className='relative'>
                      <VideoPlayerCard
                        url={videoUrls.detectionMain}
                        isPlaying={isPlaying}
                        handlePlayPause={handlePlayPause}
                      />
                      <div className='rounde absolute bottom-20 left-0 m-2 p-2 shadow'>
                        <DataCard
                          icon={ArrowDownNarrowWide}
                          label='Depth'
                          value={currentDepth.toFixed(1)}
                          unit='m'
                        />
                        <DataCard
                          icon={Waves}
                          label='Current'
                          value={currentCurrent.toFixed(1)}
                          unit='kn'
                        />
                        <DataCard
                          icon={Gauge}
                          label='Speed'
                          value={currentSpeed.toFixed(1)}
                          unit='kn'
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className='xl:col-start-3 xl:row-span-2'>
                <RightSideBar isPlaying={isPlaying} />
              </div>
              <div className='xl:col-span-2 xl:row-start-2'>
                <div className='lg:space-x-4 xl:flex'>
                  <div className='flex flex-col xl:flex-1'>
                    <Card className='grid flex-1 gap-0'>
                      <AspectRatio
                        ratio={16 / 9}
                        className='relative h-full w-full'
                      >
                        <div className='absolute left-4 top-4 z-10'>
                          <Badge
                            variant='outline'
                            className='rounded-full bg-background shadow-md'
                          >
                            DVL Data
                          </Badge>
                        </div>
                        <div className='h-full w-full overflow-hidden rounded-lg'>
                          <DvlViewer
                            isPlaying={isPlaying}
                            // mapState={mapState}
                            // onMapStateChange={setMapState}
                          />
                        </div>
                      </AspectRatio>
                    </Card>
                  </div>

                  {/* Sonar Section */}
                  <div className='flex flex-col xl:flex-1'>
                    {loading ? (
                      <Skeleton className='h-full w-full bg-muted' />
                    ) : (
                      <AspectRatio ratio={16 / 9} className='flex-1'>
                        <VideoPlayerCard
                          url={videoUrls.sonarMain}
                          isPlaying={isPlaying}
                          handlePlayPause={handlePlayPause}
                        />
                        <div className='absolute left-4 top-4'>
                          <Badge
                            variant='outline'
                            className='rounded-full bg-background shadow-md'
                          >
                            Sonar View
                          </Badge>
                        </div>
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
