type DataCardProps = {
  icon: React.ComponentType<any>
  label: string
  value: number | string
  unit: string
}

const DataCard = ({ icon: Icon, label, value, unit }: DataCardProps) => (
  <div className='mt-2 rounded-md bg-secondary bg-opacity-15 p-2'>
    <div className='flex items-center justify-between'>
      <div className='flex h-10 w-10 items-center justify-center rounded-sm bg-background'>
        <Icon className='h-6 w-6' />
      </div>
      <div className='flex flex-col items-end'>
        <p className='truncate text-xs text-muted-foreground'>{label}</p>
        <p className='mt-1 max-w-[100px] truncate text-sm font-semibold'>
          {value} {unit}
        </p>
      </div>
    </div>
  </div>
)

export default DataCard
