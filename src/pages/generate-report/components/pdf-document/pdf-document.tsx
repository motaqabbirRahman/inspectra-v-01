import React from 'react'
import { Document, Page, Text } from '@react-pdf/renderer'
import {
  Watermark,
  Header,
  TitlePage,
  MissionDetailsSection,
  RoverInfoSection,
  OptionsSection,
  DetectionImagesSection,
  ObservationsSection,
  ChartsSection,
} from './pdf-section'
import styles from './styles'
import { Mission } from '@/types/types'

// Define the type for chartsData with keys matching your data
interface PdfDocumentProps {
  mission: Mission
  imageUrls: string[]
  options: {
    model: string
    numImages: number
    includeRoverData: string
    detectionType: string[]
    charts: string[] // Array of chart types or keys
    comment: string
    minAccuracy: number
    includeImageDimension: boolean
  }
  chartsData: {
    [key: string]: string // URL or path to the chart image
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
      {/* Render Chart Images */}
      {/* Render Chart Images */}
      <Page style={styles.imagesPage}>
        <Header />
        {options.charts.length > 0 ? (
          <ChartsSection chartsData={chartsData} chartTypes={options.charts} />
        ) : (
          <Text>No charts data available</Text>
        )}
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
