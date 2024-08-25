import React from 'react'
import { View, Text, Image } from '@react-pdf/renderer'
import styles from './styles'
import map from '../../../../../public/static/images/google-map-placeholder.png'
import logo from '../../../../../public/static/images/user.jpg'
import tuna from '../../../../../public/static/images/tuna.png'
import { Mission } from '@/types/types'

interface MissionDetailsSectionProps {
  date: string
  operator: string
  start_time: string
  end_time: string
  duration: string
  min_temp: string
  max_temp: string
  min_depth: string
  max_depth: string
  gps_coordinates: string
}

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

const Header: React.FC = () => (
  <View style={styles.header} fixed>
    <Text style={styles.text}>Inspectra Dive Report</Text>
  </View>
)

const HeaderImageSection: React.FC = () => (
  <View style={styles.imageSection}></View>
)

const TunaSection: React.FC = () => (
  <View style={styles.tableRow}>
    <View style={styles.tableCell}>
      <Text style={styles.boldText}>TUNA 2.0</Text>
      <Text>ROV Informations: {}</Text>
    </View>
    <View style={styles.tableCell}>
      <View style={styles.imageSection}>
        <Image src={tuna} />
      </View>
    </View>
  </View>
)

const OptionsSection: React.FC<{ options: PdfDocumentProps['options'] }> = ({
  options,
}) => (
  <View style={styles.section}>
    <Text style={styles.subtitle}>Options</Text>
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>
          <Text style={styles.boldText}>Model:</Text> {options.model}
        </Text>
        <Text style={styles.tableCell}>
          <Text style={styles.boldText}>Number of Images:</Text>{' '}
          {options.numImages}
        </Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>
          <Text style={styles.boldText}>Include Rover Data:</Text>{' '}
          {options.includeRoverData}
        </Text>
        <Text style={styles.tableCell}>
          <Text style={styles.boldText}>Min Accuracy:</Text>{' '}
          {options.minAccuracy}%
        </Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>
          <Text style={styles.boldText}>Include Image Dimension:</Text>{' '}
          {options.includeImageDimension ? 'Yes' : 'No'}
        </Text>
        <Text style={styles.tableCell}>
          <Text style={styles.boldText}>Comment:</Text> {options.comment}
        </Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>
          <Text style={styles.boldText}>Detection Types:</Text>{' '}
          {options.detectionType.join(', ')}
        </Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>
          <Text style={styles.boldText}>Charts:</Text>{' '}
          {options.charts.join(', ')}
        </Text>
      </View>
    </View>
  </View>
)
const MissionDetailsSection: React.FC<MissionDetailsSectionProps> = ({}) => {
  return (
    <View style={styles.section}>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>
            <Text style={styles.boldText}>Date:</Text> 1692873600000
          </Text>
          <Text style={styles.tableCell}>
            <Text style={styles.boldText}>Operator:</Text> Dt Admin
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>
            <Text style={styles.boldText}>Start Time:</Text> 1692877200000
          </Text>
          <Text style={styles.tableCell}>
            <Text style={styles.boldText}>End Time:</Text> 1692884400000
          </Text>
          <Text style={styles.tableCell}>
            <Text style={styles.boldText}>Duration:</Text> 120
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>
            <Text style={styles.boldText}>Min Temp:</Text> 15°C
          </Text>
          <Text style={styles.tableCell}>
            <Text style={styles.boldText}>Max Temp:</Text> 25°C
          </Text>
          <Text style={styles.tableCell}>
            <Text style={styles.boldText}>Avg Temp:</Text> 23°C
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>
            <Text style={styles.boldText}>Min Depth:</Text> 0m
          </Text>
          <Text style={styles.tableCell}>
            <Text style={styles.boldText}>Max Depth:</Text> 30m
          </Text>
          <Text style={styles.tableCell}>
            <Text style={styles.boldText}>Avg Depth:</Text> 12m
          </Text>
        </View>
      </View>
    </View>
  )
}

interface DetectionImagesSectionProps {
  imageUrls: string[]
}
const DetectionImagesSection: React.FC<DetectionImagesSectionProps> = ({
  imageUrls,
}) => {
  return (
    <View style={styles.imageSection}>
      <Text style={styles.subtitle}>Detection Images</Text>
      {imageUrls.map((url, index) => (
        <View key={index} style={styles.imageWrapper}>
          <Image src={url} style={styles.image} />
        </View>
      ))}
    </View>
  )
}

interface ObservationsSectionProps {
  comments: string
}
const ObservationsSection: React.FC<ObservationsSectionProps> = ({
  comments,
}) => {
  return (
    <View style={styles.observationsPage}>
      <Text style={styles.subtitle}>Observations</Text>
      <Text>{comments}</Text>
    </View>
  )
}
export {
  Header,
  HeaderImageSection,
  TunaSection,
  OptionsSection,
  MissionDetailsSection,
  DetectionImagesSection,
  ObservationsSection,
}
