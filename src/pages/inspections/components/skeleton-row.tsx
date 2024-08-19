import React from 'react'
import { TableCell, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

interface SkeletonRowProps {
  columns: any[]
}

const SkeletonRow: React.FC<SkeletonRowProps> = ({ columns }) => (
  <TableRow>
    {columns.map((_, index) => (
      <TableCell key={index}>
        <Skeleton className='w-fulli h-6 bg-muted' />{' '}
      </TableCell>
    ))}
  </TableRow>
)

export default SkeletonRow
