import { useEffect, useState } from 'react'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Link, useNavigate } from 'react-router-dom'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'
import { Mission, MissionData } from '@/types/types'
import { DataTableSkeleton } from './components/data-table-skeleton'

export default function Inspections() {
  const [inspections, setInspections] = useState<MissionData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchInspections = async () => {
      try {
        const response = await fetch(
          'https://inspectraapi.dubotech.com/api/missions/'
        )
        if (!response.ok) {
          throw new Error('Failed to fetch inspections')
        }
        const data: Mission[] = await response.json()

        const transformedData: MissionData[] = data.map((inspection) => ({
          id: inspection['mission-details'].id,
          mission_title: inspection['mission-details'].mission_title,
          created_at: inspection['mission-details'].created_at,
        }))

        setInspections(transformedData)
        setLoading(false)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('An unknown error occurred')
        }
        setLoading(false)
      }
    }

    fetchInspections()
  }, [])

  if (error) {
    return <p>Error: {error}</p>
  }

  const handleRowClick = (inspectionId: string) => {
    navigate(`/inspections/${inspectionId}`) // Navigate immediately
  }

  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
      cell: (info: any) => (
        <button onClick={() => handleRowClick(info.row.original.id)}>
          {info.row.original.id}
        </button>
      ),
    },
    {
      header: 'Mission Title',
      accessorKey: 'mission_title',
    },
    {
      header: 'Created At',
      accessorKey: 'created_at',
    },
  ]

  return (
    <Layout>
      <LayoutHeader>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>

      <LayoutBody className='flex flex-col' fixedHeight>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
            <p className='text-muted-foreground'>
              Here&apos;s a list of your inspections for this month!
            </p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          {loading ? (
            <DataTableSkeleton
              columns={columns}
              data={inspections}
              loading={loading}
            />
          ) : (
            <DataTable columns={columns} data={inspections} />
          )}
        </div>
      </LayoutBody>
    </Layout>
  )
}
