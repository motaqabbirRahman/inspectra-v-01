import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer'
import { Mission } from '@/types/types' // Ensure this path is correct
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#f5f8fa',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    color: '#005f73',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: '#333',
  },
  boldText: {
    fontSize: 12,
    marginBottom: 5,
    color: '#333',
    fontWeight: 'bold',
  },
  imageSectionTitle: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#005f73',
  },
  imageList: {
    marginTop: 10,
    justifyContent: 'center',
  },
  imageItem: {
    marginVertical: 10,
    width: '100%', // Make the image full width
    height: 200,
    borderWidth: 1,
    borderColor: '#005f73',
  },
  footer: {
    fontSize: 10,
    marginTop: 20,
    textAlign: 'center',
    color: '#999',
  },
})

interface PdfDocumentProps {
  mission: Mission
  imageUrls: string[]
  options: {
    model: string
    numImages: number
    includeRoverData: string
    charts: string
    comment: string
  }
}

const proxyUrl = 'http://localhost:3001/proxy?url='

const PdfDocument: React.FC<PdfDocumentProps> = ({
  mission,
  options,
  imageUrls,
}) => {
  // const proxiedImageUrls = imageUrls.map(
  //   (url) => `${proxyUrl}${encodeURIComponent(url)}`
  // )

  const proxiedImageUrls = imageUrls.map((url) => url)

  const { mission_title } = mission['mission-details']

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Underwater Inspection Report</Text>
          <Text style={styles.boldText}>Title: {mission_title}</Text>

          <Text style={styles.imageSectionTitle}>Detection Images</Text>
          <View style={styles.imageList}>
            {proxiedImageUrls.map((url, index) => (
              <Image
                key={index}
                style={styles.imageItem}
                source={{
                  uri: url,
                  method: 'GET',
                  headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'no-cache',
                  },
                  body: '',
                }}
              />
            ))}
          </View>

          <Text style={styles.boldText}>Observations:</Text>
          <Text style={styles.text}>{options.comment}</Text>
        </View>
        <Text style={styles.footer}>Inspectra By Dubotech</Text>
      </Page>
    </Document>
  )
}

export default PdfDocument
