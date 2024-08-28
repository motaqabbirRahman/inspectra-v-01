'use client'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { BatteryFull } from 'lucide-react'
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

const batteryData = [
  { time: 0, battery: 100 },
  { time: 1, battery: 90 },
  { time: 2, battery: 80 },
  { time: 3, battery: 70 },
  { time: 4, battery: 60 },
  { time: 5, battery: 50 },
  { time: 6, battery: 40 },
  { time: 7, battery: 30 },
  { time: 8, battery: 20 },
]

const batteryConfig: ChartConfig = {
  battery: {
    label: 'Battery Use',
    color: 'hsl(var(--primary))',
  },
}

export default function BatteryUseChart() {
  return (
    <>
      <CardHeader>
        <CardDescription>Displaying battery usage over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={batteryConfig}>
          <AreaChart
            data={batteryData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='time'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              label={{
                value: 'Time (hours)',
                position: 'insideBottom',
                offset: -5,
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={20}
              label={{
                value: 'Battery (%)',
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
              dataKey='battery'
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
              Battery usage is decreasing <BatteryFull className='h-4 w-4' />
            </div>
            <div className='flex items-center gap-2 leading-none text-muted-foreground'>
              Last 8 hours
            </div>
          </div>
        </div>
      </CardFooter>
    </>
  )
}
