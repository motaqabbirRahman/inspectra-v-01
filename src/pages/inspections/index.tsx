import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Link } from 'react-router-dom';
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { inspections } from './data/inspections'

export default function Inspections() {
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
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
          <DataTable data={inspections} columns={columns} />
          <ul>
            {inspections.map((inspection) => (
              <li key={inspection.id}>
                <Link to={`/inspections/${inspection.id}`}>{inspection.id}</Link>
              </li>
            ))}
          </ul>
        </div>
      </LayoutBody>
    </Layout >
  )
}
