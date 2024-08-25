import React from 'react'
import { View, StyleSheet } from '@react-pdf/renderer'
import { Header } from './pdf-section'

// Define the DocumentTemplate component
const DocumentTemplate: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <View style={styles.page}>
    <View style={styles.headerContainer}>
      <Header />
    </View>
    <View style={styles.content}>{children}</View>
  </View>
)

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1, // Ensure the header is above other content
  },
  content: {
    marginTop: '60pt', // Add margin-top to avoid content overlap with header
    padding: '20pt', // Optional padding for content
    flex: 1,
  },
})

export default DocumentTemplate
