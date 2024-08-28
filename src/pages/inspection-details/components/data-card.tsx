type DataCardProps = {
  icon: React.ComponentType<any>
  label: string
  value: number | string | null | undefined
  unit: string
}

const DataCard = ({ icon: Icon, label, value, unit }: DataCardProps) => (
  <div className='mt-2 rounded-md p-2 backdrop-blur-sm '>
    <div className='flex items-center space-x-4'>
      <div className='flex flex-col items-center'>
        <div className='flex h-10 w-10 items-center justify-center rounded-sm bg-opacity-10'>
          <Icon className='h-6 w-6' />
        </div>
      </div>
      <div className='flex flex-col justify-between text-xs font-semibold'>
        <p className='mb-1 text-xs'>{label}</p>
        {value ? (
          <p className='text-xs'>
            {value} {unit}
          </p>
        ) : (
          <p className='text-xs text-muted'>No data available</p>
        )}
      </div>
    </div>
  </div>
)

export default DataCard
