import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
} from 'recharts'

// Sample data reflecting the number of missions
const data = [
  {
    name: 'Jan',
    missions: Math.floor(Math.random() * 100) + 20,
  },
  {
    name: 'Feb',
    missions: Math.floor(Math.random() * 100) + 20,
  },
  {
    name: 'Mar',
    missions: Math.floor(Math.random() * 100) + 20,
  },
  {
    name: 'Apr',
    missions: Math.floor(Math.random() * 100) + 20,
  },
  {
    name: 'May',
    missions: Math.floor(Math.random() * 100) + 20,
  },
  {
    name: 'Jun',
    missions: Math.floor(Math.random() * 100) + 20,
  },
  {
    name: 'Jul',
    missions: Math.floor(Math.random() * 100) + 20,
  },
  {
    name: 'Aug',
    missions: Math.floor(Math.random() * 100) + 20,
  },
  {
    name: 'Sep',
    missions: Math.floor(Math.random() * 100) + 20,
  },
  {
    name: 'Oct',
    missions: Math.floor(Math.random() * 100) + 20,
  },
  {
    name: 'Nov',
    missions: Math.floor(Math.random() * 100) + 20,
  },
  {
    name: 'Dec',
    missions: Math.floor(Math.random() * 100) + 20,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        {/* <Tooltip formatter={(value) => `${value} missions`} /> */}
        <Legend />
        <Bar
          dataKey='missions'
          fill='#007aff' // Blue
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
