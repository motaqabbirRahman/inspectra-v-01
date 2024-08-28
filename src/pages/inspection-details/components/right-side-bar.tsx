import React, { useState, Suspense } from 'react'
import {
  Card,
  CardTitle,
  CardFooter,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { IoBatteryFull } from 'react-icons/io5'
import { AiOutlineThunderbolt } from 'react-icons/ai'
import Scene from './model-viewer'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TimeDepthChart from './time-depth-chart'
import DepthTempChart from './depth-temp-chart'
import BatteryUseChart from './battery-use-chart'
import { IconTemperature } from '@tabler/icons-react'

interface RightSideBarProps {
  isPlaying: boolean
}

const RightSideBar: React.FC<RightSideBarProps> = ({ isPlaying }) => {
  const [activeTab, setActiveTab] = useState<string>('timeDepth')

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const renderDescription = () => (
    <CardHeader>
      <CardDescription>Start Preview to See Live Updates</CardDescription>
    </CardHeader>
  )

  const renderChart = () => {
    switch (activeTab) {
      case 'depthTemp':
        return isPlaying ? <DepthTempChart /> : renderDescription()
      case 'batteryUse':
        return isPlaying ? <BatteryUseChart /> : renderDescription()
      case 'timeDepth':
        return isPlaying ? <TimeDepthChart /> : renderDescription()
      default:
        return null
    }
  }

  return (
    <Card className='overflow-hidden'>
      <CardHeader className=''>
        <div className='flex items-center justify-between rounded-sm bg-muted/50 p-4'>
          <CardTitle className='text-lg font-semibold'>ROV</CardTitle>
          <CardDescription>TUNA 2.0</CardDescription>
        </div>
      </CardHeader>
      <CardContent className='p-6 text-sm'>
        <div className='grid gap-3'>
          <AspectRatio ratio={16 / 9}>
            <Scene
              modelPath='/models/tuna.obj'
              mtlPath='/models/tuna.mtl'
              isPlaying={isPlaying}
            />
          </AspectRatio>
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between '>
                <span className='text-md font-semibold'>BATTERY</span>
                <div className='flex items-center space-x-2'>
                  <span className='text-sm'>93%</span>
                  <IoBatteryFull size={25} />
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <ul className='grid gap-3'>
                <li className='flex items-center justify-between'>
                  <div className='flex space-x-4'>
                    <div className='flex items-center'>
                      <AiOutlineThunderbolt size={20} />
                      <span className='ml-1'>14.7 Volt</span>
                    </div>
                    <div className='flex items-center'>
                      <IconTemperature size={20} />
                      <span className='ml-1'>27°C</span>
                    </div>
                  </div>
                  <span>4199 / 4366 mAh</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Tabs
            defaultValue='timeDepth'
            onValueChange={handleTabChange}
            className='space-y-4'
          >
            <Card className='mt-4'>
              <TabsList className='m-2 space-x-4'>
                <TabsTrigger value='timeDepth'>Time vs Depth</TabsTrigger>
                <TabsTrigger value='depthTemp'>Depth vs Temp</TabsTrigger>
                <TabsTrigger value='batteryUse'>Battery Use</TabsTrigger>
              </TabsList>
              <Suspense fallback={<div>Loading...</div>}>
                {renderChart()}
              </Suspense>
            </Card>
          </Tabs>
        </div>
      </CardContent>
      <CardFooter className='flex flex-row items-center bg-muted/50 px-6 py-3'>
        <div className='text-xs text-muted-foreground'>
          Updated <time dateTime='2023-11-23'>August 27, 2024</time>
        </div>
      </CardFooter>
    </Card>
  )
}

export default RightSideBar
