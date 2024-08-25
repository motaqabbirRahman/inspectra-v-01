import { StyleSheet } from '@react-pdf/renderer';

const colors = {
    primaryBlue: '#007BFF',
    secondaryBlue: '#0056b3',
    lightBlue: '#e3f2fd',
    white: '#FFFFFF',
    gray: '#f0f0f0',
    darkGray: '#333333',
};

const styles = StyleSheet.create({
    page: {
        // padding: 20,
        fontSize: 12,
        color: '#333',
        flexDirection: 'column',
    },
    section: {
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    table: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 10,
        backgroundColor: '#e0f7fa',
        borderRadius: 5,
        padding: 5,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCell: {
        flex: 1,
        padding: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    boldText: {
        fontWeight: 'bold',
        color: '#005f73',
    },

    chartSection: {
        marginTop: 10,
    },
    chart: {
        width: '100%',
        height: 100,
        borderWidth: 1,
        borderColor: '#005f73',
    },
    footer: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        margin: 12,
    },
    author: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
    },

    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman',
    },

    header: {
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#007BFF',
        // color: '#FFFFFF',
        padding: 2,
        textAlign: 'center',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
    logo: {
        marginRight: 'auto',
        height: 100,
        width: 300,
        backgroundColor: '#e0f7fa',
    },
    titlePage: {
        padding: 30,
        fontSize: 12,
        textAlign: 'center',
    },
    detailsPage: {
        padding: 30,
        fontSize: 12,
    },

    observationsPage: {
        padding: 30,
        fontSize: 12,
    },

    imageSection: {
        padding: '20pt',
        backgroundColor: colors.white,
        border: `1pt solid ${colors.gray}`,
        borderRadius: '8pt',
        margin: '20pt 0',
        boxShadow: `0 0 5pt ${colors.gray}`,
    },
    subtitle: {
        fontSize: '14pt',
        fontWeight: 'bold',
        color: colors.primaryBlue,
        marginBottom: '15pt',
        borderBottom: `2pt solid ${colors.primaryBlue}`,
        paddingBottom: '5pt',
    },
    imageWrapper: {
        marginBottom: '15pt',
        borderRadius: '8pt',
        overflow: 'hidden',
        border: `1pt solid ${colors.gray}`,
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: '8pt',
    },
    imagesPage: {

        boxShadow: `0 0 10pt ${colors.gray}`, // Subtle shadow for depth
        overflow: 'hidden',
    },

});

export default styles;
