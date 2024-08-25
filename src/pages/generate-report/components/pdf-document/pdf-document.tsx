import React from 'react'
import { Document, Page, View } from '@react-pdf/renderer'
import {
  Header,
  HeaderImageSection,
  MissionDetailsSection,
  TunaSection,
  OptionsSection,
  DetectionImagesSection,
  ObservationsSection,
} from './pdf-section'
import styles from './styles'
import { Mission } from '@/types/types'
import DocumentTemplate from './document-template'

interface PdfDocumentProps {
  mission: Mission
  imageUrls: string[]
  options: {
    model: string
    numImages: number
    includeRoverData: string
    detectionType: string[]
    charts: string[]
    comment: string
    minAccuracy: number
    includeImageDimension: boolean
  }
}
const PdfDocument: React.FC<PdfDocumentProps> = ({
  mission,
  options,
  imageUrls,
}) => {
  const {
    mission_title,
    date,
    location,
    operator,
    start_time,
    end_time,
    duration,
    min_temp,
    max_temp,
    min_depth,
    max_depth,
    gps_coordinates,
  } = mission['mission-details']

  return (
    <Document>
      {/* Title Page */}
      <Page style={styles.titlePage}>
        <Header />
      </Page>

      {/* Mission Details Page */}
      <Page style={styles.detailsPage}>
        <Header />

        <MissionDetailsSection
          date={String(date)}
          operator={operator}
          start_time={String(start_time)}
          end_time={String(end_time)}
          duration={String(duration)}
          min_temp={String(min_temp)}
          max_temp={String(max_temp)}
          min_depth={String(min_depth)}
          max_depth={String(max_depth)}
          gps_coordinates={String(gps_coordinates)}
        />

        <TunaSection />
        <OptionsSection options={options} />
      </Page>

      {/* Detection Images Page */}
      {imageUrls.length > 0 && (
        <Page style={styles.imagesPage}>
          <DetectionImagesSection imageUrls={imageUrls} />
        </Page>
      )}

      {/* Observations Page */}
      <Page style={styles.observationsPage}>
        <ObservationsSection comments={options.comment} />
      </Page>
    </Document>
  )
}

export default PdfDocument
