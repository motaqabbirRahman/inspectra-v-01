import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

interface Inspection {
  id: string;
  title: string;
  status: string;
  label: string;
  priority: string;
}
interface PdfDocumentProps {
  inspection: Inspection;
}

const PdfDocument: React.FC<PdfDocumentProps> = ({ inspection }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>ID: {inspection.id}</Text>
        <Text>{inspection.title}</Text>
      </View>
    </Page>
  </Document>
);

export default PdfDocument;

