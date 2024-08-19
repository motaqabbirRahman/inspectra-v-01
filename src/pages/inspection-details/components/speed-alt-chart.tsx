'use client'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { TrendingUp } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart'

const chartData = [
  { speed: 0, altitude: 0 },
  { speed: 1, altitude: 2 },
  { speed: 2, altitude: 3 },
  { speed: 2, altitude: 4 },
  { speed: 3, altitude: 5 },
  { speed: 4, altitude: 5 },
  { speed: 5, altitude: 7 },
  { speed: 4, altitude: 8 },
  { speed: 5, altitude: 10 },
]

const chartConfig: ChartConfig = {
  speed: {
    label: 'Speed',
    color: 'hsl(var(--primary))',
  },
}

export default function SpeedAltChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Speed vs Altitude</CardTitle>
        <CardDescription>
          Displaying rover speed based on altitude
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='altitude'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              label={{
                value: 'Speed (m/s)',
                position: 'insideBottom',
                offset: -5,
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={20}
              label={{
                value: 'Altitude (m)',
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
              dataKey='speed'
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
              Speed and Altitude are stable <TrendingUp className='h-4 w-4' />
            </div>
            <div className='flex items-center gap-2 leading-none text-muted-foreground'>
              Last 6 hours
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
