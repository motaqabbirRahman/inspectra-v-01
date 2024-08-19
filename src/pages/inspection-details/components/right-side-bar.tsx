import {
  Card,
  CardTitle,
  CardFooter,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import { Button } from '@/components/custom/button'
import { Separator } from '@/components/ui/separator'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { Radio } from 'lucide-react'
import SpeedAltChart from './speed-alt-chart'
import { BatteryFull } from 'lucide-react'

export function RightSideBar() {
  return (
    <Card className='overflow-hidden'>
      <CardHeader className='flex flex-row items-start bg-muted/50'>
        <div className='grid gap-0.5'>
          <CardTitle className='group flex items-center gap-2 text-lg'>
            <h1>ROV</h1>
          </CardTitle>
          <CardDescription>TUNA 2.0</CardDescription>
        </div>
        <div className='ml-auto flex items-center gap-1'>
          <Button
            variant='outline'
            size='icon'
            className='border-color h-8 gap-1'
          >
            <Radio />
          </Button>
        </div>
      </CardHeader>
      <CardContent className='p-6 text-sm'>
        <div className='grid gap-3'>
          {/* <AspectRatio ratio={16 / 9}>
            <ModelViewer
              modelPath='../../../../../public/models/tuna.obj'
              mtlPath='../../../../../public/models/tpro.mtl'
            />
          </AspectRatio> */}
          <AspectRatio ratio={19 / 12}>
            <img
              src='../../../../../public/static/images/tuna.png'
              alt='tuna'
              className='ml-9'
            />
          </AspectRatio>
          {/* <AspectRatio ratio={16 / 9}>
            <ReactPlayer
              url='https://ik.imagekit.io/dubotech/assets/video/tuna_3.mp4?updatedAt=1720009687770'
              playing={true}
              control={false}
              loop={true}
              width='100%'
              height='100%'
              className='object-cover'
            />
          </AspectRatio> */}

          <Separator className='my-2 bg-blue-700' />
          <div className='flex justify-between'>
            <div className='font-semibold '>BATTERY</div>
            <div className='flex items-center justify-between'>
              <span className='mr-2'>70%</span>
              <BatteryFull color='#d0d2d0' strokeWidth={1.25} />
            </div>
          </div>
          <ul className='grid gap-3'>
            <li className='flex items-center justify-between'>
              <div className='flex items-start justify-between space-x-4'>
                <div>
                  <span>14.7 Volt</span>
                </div>
                <div>
                  27<span className='ml-1'>°C</span>
                </div>
              </div>
              <span>2540 / 4366 mAh</span>
            </li>
          </ul>
          <Separator className='my-2' />

          <SpeedAltChart />
        </div>
      </CardContent>
      <CardFooter className='flex flex-row items-center bg-muted/50 px-6 py-3'>
        <div className='text-xs text-muted-foreground'>
          Updated <time dateTime='2023-11-23'>November 23, 2023</time>
        </div>
      </CardFooter>
    </Card>
  )
}
