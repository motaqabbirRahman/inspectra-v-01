import React from 'react'
import { Document, Page } from '@react-pdf/renderer'
import {
  Watermark,
  Header,
  TitlePage,
  MissionDetailsSection,
  RoverInfoSection,
  OptionsSection,
  DetectionImagesSection,
  ObservationsSection,
} from './pdf-section'
import styles from './styles'
import { Mission } from '@/types/types'

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
  chartsData: {
    timeDepth?: string // URL or path to the bar chart image
  }
}

const PdfDocument: React.FC<PdfDocumentProps> = ({
  mission,
  options,
  imageUrls,
  chartsData,
}) => {
  const {
    date,
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
      <TitlePage missionDetails={mission['mission-details']} />

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
        <RoverInfoSection />
        <OptionsSection options={options} />
      </Page>

      {/* Detection Images Section */}
      {imageUrls.length > 0 && <DetectionImagesSection imageUrls={imageUrls} />}

      {/* Observations Page */}
      <Page style={styles.observationsPage}>
        <Watermark />
        <Header />
        <ObservationsSection comments={options.comment} />
      </Page>

      {/* Additional Pages if needed */}
      {/* Example: */}
      {/* <Page style={styles.additionalPage}>
        <Watermark />
        <Header />
        <SomeOtherSection />
      </Page> */}
    </Document>
  )
}

export default PdfDocument
