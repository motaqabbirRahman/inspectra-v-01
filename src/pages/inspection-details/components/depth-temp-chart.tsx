'use client'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { Thermometer } from 'lucide-react'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart'

const depthTempData = [
  { depth: 0, temp: 25 },
  { depth: 5, temp: 24 },
  { depth: 10, temp: 23 },
  { depth: 15, temp: 22 },
  { depth: 20, temp: 21 },
  { depth: 25, temp: 20 },
  { depth: 30, temp: 19 },
  { depth: 35, temp: 18 },
  { depth: 40, temp: 17 },
]

const depthTempConfig: ChartConfig = {
  depth: {
    label: 'Depth',
    color: 'hsl(var(--primary))',
  },
  temp: {
    label: 'Temperature',
    color: 'hsl(var(--secondary))',
  },
}

export default function DepthTempChart() {
  return (
    <>
      <CardHeader>
        <CardDescription>Displaying temperature based on depth</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={depthTempConfig}>
          <AreaChart
            data={depthTempData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='depth'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              label={{
                value: 'Depth (m)',
                position: 'insideBottom',
                offset: -5,
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={20}
              label={{
                value: 'Temperature (°C)',
                angle: -90,
                position: 'insideLeft',
                offset: -5,
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='line' />}
            />
            <Area
              dataKey='temp'
              type='monotone'
              fill='hsl(var(--primary))'
              fillOpacity={0.4}
              stroke='hsl(var(--secondary))'
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className='mt-5 flex w-full items-start gap-2 text-sm'>
          <div className='grid gap-2'>
            <div className='flex items-center gap-2 font-medium leading-none'>
              Temperature stable <Thermometer className='h-4 w-4' />
            </div>
            <div className='flex items-center gap-2 leading-none text-muted-foreground'>
              Across depth range
            </div>
          </div>
        </div>
      </CardFooter>
    </>
  )
}
