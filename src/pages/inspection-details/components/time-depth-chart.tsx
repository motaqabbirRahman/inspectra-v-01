import { useState, useEffect } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { TrendingUp } from 'lucide-react'
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

const chartConfig: ChartConfig = {
  time: {
    label: 'Time',
    color: 'hsl(var(--primary))',
  },
}

// Function to get the depth value based on time
const getDepthValue = (time: number) => {
  if (time <= 10) {
    return parseFloat((10 - Math.random() * 0.7).toFixed(1)) // Fluctuate between 9.3 and 10
  } else if (time <= 35) {
    return parseFloat((9.8 + Math.random() * 0.5).toFixed(1)) // Fluctuate between 9.8 and 10.3
  } else if (time <= 45) {
    return parseFloat((9.5 + Math.random() * 0.4).toFixed(1)) // Fluctuate between 9.5 and 9.9
  } else {
    return parseFloat((9.5 + Math.random() * 0.3).toFixed(1)) // Fluctuate between 9.5 and 9.8
  }
}

export default function TimeDepthChart() {
  const [chartData, setChartData] = useState<{ time: number; depth: number }[]>(
    []
  )

  useEffect(() => {
    const intervalId = setInterval(() => {
      setChartData((prevData) => {
        const newTime = prevData.length + 1
        return [...prevData, { time: newTime, depth: getDepthValue(newTime) }]
      })
    }, 1000) // Update every second

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div>
      <CardHeader>
        <CardDescription>Displaying depth changes over time</CardDescription>
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
              dataKey='time'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              label={{
                value: 'Time (s)',
                position: 'insideBottom',
                offset: -5,
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={20}
              label={{
                value: 'Depth (m)',
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
              dataKey='depth'
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
              Depth is dynamically changing <TrendingUp className='h-4 w-4' />
            </div>
            <div className='flex items-center gap-2 leading-none text-muted-foreground'>
              Simulation
            </div>
          </div>
        </div>
      </CardFooter>
    </div>
  )
}
