import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

interface SkeletonRowProps {
  columns: ColumnDef<any, any>[]
}

const SkeletonRow: React.FC<SkeletonRowProps> = ({ columns }) => (
  <TableRow>
    {columns.map((column, index) => (
      <TableCell key={index}>
        <Skeleton className='w-fulli h-6 bg-muted' />{' '}
        {/* Adjust height and width as needed */}
      </TableCell>
    ))}
  </TableRow>
)

export default SkeletonRow
