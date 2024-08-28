import React from 'react'
import { View, Text, Image, Page } from '@react-pdf/renderer'
import styles from './styles'
import tuna from '../../../../../public/static/images/tuna.png'
import { Mission } from '@/types/types'
import DubotechLogo from '@/../public/static/images/dt-black.png'
import { Font } from '@react-pdf/renderer'

interface RoverInfo {
  name: string
  weight: string
  cameraTilt: string
  batteryLife: string
  depthCapability: string
  support: string
  observerApp: string
}

const roverInfo: RoverInfo[] = [
  {
    name: 'Tuna',
    weight: '15kg',
    cameraTilt: 'Excellent',
    batteryLife: '3 hrs+',
    depthCapability: '100m',
    support: 'Multiple Spectators',
    observerApp: 'Yes',
  },
  // {
  //   name: 'Octopus',
  //   weight: '20kg',
  //   cameraTilt: 'Good',
  //   batteryLife: '4 hrs+',
  //   depthCapability: '150m',
  //   support: 'Single Spectator',
  //   observerApp: 'No',
  // },
  // {
  //   name: 'Hilsha',
  //   weight: '25kg',
  //   cameraTilt: 'Excellent',
  //   batteryLife: '5 hrs+',
  //   depthCapability: '200m',
  //   support: 'Multiple Spectators',
  //   observerApp: 'Yes',
  // },
]

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

Font.register({
  family: 'Roboto',
  src: 'https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4mxM.woff2',
})

const Header = () => (
  <View style={styles.header} fixed>
    <Text>Inspectra Dive Report</Text>
  </View>
)

const TitlePage: React.FC<{ missionDetails: any }> = ({ missionDetails }) => {
  const { mission_title, created_at } = missionDetails

  // Format the date
  const formattedDate = new Date(created_at).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Page size='A4' style={styles.page}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Inspection Report By Inspectra</Text>
        </View>
        <View style={styles.middleContainer}>
          <Text style={styles.subtitle}>{mission_title}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
        <View style={styles.footerContainer}>
          <Image src={DubotechLogo} style={styles.footerLogo} />
        </View>
      </View>
    </Page>
  )
}

const MissionDetailsSection: React.FC<MissionDetailsSectionProps> = ({}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.subtitle}>Mission Overview</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>
            <Text>&#xf017;</Text>
            <Text style={styles.boldText}>Date:</Text> August 26, 2024
          </Text>
          <Text style={styles.tableCell}>
            <Text style={styles.boldText}>Operator:</Text> Dt Admin
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>
            <Text style={styles.boldText}>Start Time:</Text> 05:39:09 PM GMT+6
          </Text>
          <Text style={styles.tableCell}>
            <Text style={styles.boldText}>End Time:</Text> 05:40:20 PM GMT+6
          </Text>
          <Text style={styles.tableCell}>
            <Text style={styles.boldText}>Duration:</Text> 120 sec
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
            <Text style={styles.boldText}>Max Depth:</Text> 10m
          </Text>
          <Text style={styles.tableCell}>
            <Text style={styles.boldText}>Avg Depth:</Text> 9.5m
          </Text>
        </View>
      </View>
    </View>
  )
}

const RoverInfoSection: React.FC = () => {
  return (
    <View style={styles.roverInfoSection}>
      {roverInfo.map((rover, index) => (
        <View key={index} style={styles.row}>
          <View style={styles.infoColumn}>
            <Text style={styles.subtitle}>Rover Information</Text>
            <Text style={styles.roverName}>{rover.name}</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Weight:</Text>
              <Text style={styles.infoValue}>{rover.weight}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Camera Tilt:</Text>
              <Text style={styles.infoValue}>{rover.cameraTilt}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Battery Life:</Text>
              <Text style={styles.infoValue}>{rover.batteryLife}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Depth Capability:</Text>
              <Text style={styles.infoValue}>{rover.depthCapability}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Support:</Text>
              <Text style={styles.infoValue}>{rover.support}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Observer App:</Text>
              <Text style={styles.infoValue}>{rover.observerApp}</Text>
            </View>
          </View>
          <View style={styles.imageColumn}>
            <Image src={tuna} />
          </View>
        </View>
      ))}
    </View>
  )
}

const OptionsSection: React.FC<{ options: PdfDocumentProps['options'] }> = ({
  options,
}) => (
  <View style={styles.section}>
    <Text style={styles.subtitle}>Selected Configurations</Text>
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

interface DetectionImagesSectionProps {
  imageUrls: string[]
}

const DetectionImagesSection: React.FC<DetectionImagesSectionProps> = ({
  imageUrls,
}) => {
  // Define a maximum number of images per page
  const imagesPerPage = 2

  // Function to split images into pages
  const getImagePages = () => {
    const pages: string[][] = []
    for (let i = 0; i < imageUrls.length; i += imagesPerPage) {
      pages.push(imageUrls.slice(i, i + imagesPerPage))
    }
    return pages
  }

  const imagePages = getImagePages()

  return (
    <>
      {imagePages.map((pageImages, pageIndex) => (
        <Page key={pageIndex} style={styles.imagesPage}>
          <View style={styles.header}>
            <Text>Inspection Report</Text>
          </View>
          <View style={styles.imageSection}>
            <Text style={styles.subtitle}>Detection Images</Text>
            {pageImages.map((url, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image src={url} style={styles.image} />
              </View>
            ))}
          </View>
          <View style={styles.footer}>
            <Text>
              Page {pageIndex + 1} of {imagePages.length}
            </Text>
          </View>
        </Page>
      ))}
    </>
  )
}
export default DetectionImagesSection

interface ChartsSectionProps {
  chartsData: { [key: string]: string } // Chart URLs or paths
  chartTypes: string[] // Array of chart keys
}

const ChartsSection: React.FC<ChartsSectionProps> = ({
  chartsData,
  chartTypes,
}) => {
  const chartsPerPage = 2

  const getChartPages = () => {
    const pages: string[][] = []
    for (let i = 0; i < chartTypes.length; i += chartsPerPage) {
      pages.push(chartTypes.slice(i, i + chartsPerPage))
    }
    return pages
  }

  const chartPages = getChartPages()
  const mapChartOptionsToData = (chartOption: string): string => {
    switch (chartOption) {
      case 'time-depth':
        return 'timeDepth'
      case 'depth-temperature':
        return 'depthTemperature'
      case 'battery-usage':
        return 'batteryUsage'
      default:
        return ''
    }
  }

  return (
    <>
      {chartPages.map((pageChartTypes, pageIndex) => (
        <View>
          <View style={styles.chartSection}>
            <Text style={styles.subtitle}>Charts</Text>
            {pageChartTypes.map((chartType, index) => {
              const chartKey = mapChartOptionsToData(chartType)
              const chartImage = chartsData[chartKey]
              return chartImage ? (
                <View key={index} style={styles.imageWrapper}>
                  <Image src={chartImage} style={styles.image} />
                </View>
              ) : (
                <Text key={index}>Chart for {chartType} not available</Text>
              )
            })}
          </View>
          <View style={styles.footer}>
            <Text>
              Page {pageIndex + 1} of {chartPages.length}
            </Text>
          </View>
        </View>
      ))}
    </>
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

const Watermark: React.FC = () => (
  <View style={styles.watermark}>
    <Image src={DubotechLogo} style={styles.logo} />
  </View>
)
export {
  Watermark,
  Header,
  TitlePage,
  MissionDetailsSection,
  RoverInfoSection,
  OptionsSection,
  DetectionImagesSection,
  ChartsSection,
  ObservationsSection,
}
