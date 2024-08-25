import React from 'react'

import { Mission, OptionsType } from '@/types/types'

interface PdfDocumentProps {
  mission: Mission
  options: OptionsType
  imageUrls: string[]
}

const PdfDocument: React.FC<PdfDocumentProps> = ({
  mission,
  options,
  imageUrls,
}) => {
  return (
    <div id='pdf-content' style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>{mission['mission-details'].mission_title}</h1>
      {/* Additional content based on options */}
      <p>Comment: {options.comment}</p>
      <p>Include Rover Data: {options.includeRoverData}</p>
      Render images
      <div style={{ marginTop: '20px' }}>
        {imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Image ${index + 1}`}
            style={{ width: '100%', marginBottom: '10px' }}
          />
        ))}
      </div>
      {/* Add more HTML elements based on options */}
    </div>
  )
}

export default PdfDocument
