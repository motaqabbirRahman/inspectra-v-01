// DepthOverlay.tsx
import React from 'react'

interface DepthOverlayProps {
  depth: number // The current depth value
  mapContainerRef: React.RefObject<HTMLDivElement>
}

const DepthOverlay: React.FC<DepthOverlayProps> = ({ depth }) => {
  return (
    <div className='pointer-events-none absolute left-0 top-0 p-2'>
      <div className='relative rounded-lg border border-gray-300 bg-white bg-opacity-50 p-2'>
        <div className='text-sm font-semibold'>Depth: {depth} meters</div>
      </div>
    </div>
  )
}

export default DepthOverlay
