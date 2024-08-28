import { StyleSheet } from '@react-pdf/renderer';

const colors = {
    primaryBlue: '#09335D',
    secondaryBlue: '#0A1A2B',
    lightBlue: '#C3D0E3',
    white: '#FFFFFF',
    gray: '#E0E0E0',
    darkGray: '#4F4F4F',
};


const styles = StyleSheet.create({
    //page
    page: {
        // padding: 20,
        fontSize: 12,
        color: '#333',
        flexDirection: 'column',
    },
    titlePage: {
        paddingTop: '20pt', // Adjust as needed
        paddingHorizontal: '30pt',
        paddingBottom: '30pt',
        fontSize: 16,
        // Add margin or padding to ensure space for content
    },

    detailsPage: {
        paddingTop: '60pt', // Adjust to match header height
        paddingHorizontal: '20pt',
    },
    imagesPage: {
        paddingTop: '60pt', // Adjust to match header height
        paddingHorizontal: '30pt',
        paddingBottom: '30pt',
    },
    observationsPage: {
        paddingTop: '60pt', // Adjust to match header height
        paddingHorizontal: '30pt',
        paddingBottom: '30pt',
    },

    //parts of page
    // container: {
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     height: '100vh', // Ensure it takes full height of the page
    //     textAlign: 'center',
    //     padding: '20px',
    // },
    logoContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px', // Space between logo and text
    },
    logo: {
        width: '30%', // Adjust size based on your needs
        objectFit: 'contain',
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    section: {
        marginBottom: 10,
        marginTop: 10,
        // paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
        fontSize: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
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

    subtitle: {
        fontSize: '14pt',
        fontWeight: 'bold',
        color: colors.primaryBlue,
        marginBottom: '15pt',
        borderBottom: `2pt solid ${colors.primaryBlue}`,
        paddingBottom: '5pt',
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
        // fontFamily: 'Roboto',
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

    //images

    imageSection: {
        padding: '20pt',
        backgroundColor: colors.white,
        border: `1pt solid ${colors.gray}`,
        borderRadius: '8pt',
        margin: '20pt 0',
        boxShadow: `0 0 5pt ${colors.gray}`,
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

    //table
    table: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 10,
        backgroundColor: colors.lightBlue, // Updated to light blue
        borderRadius: 5,
        padding: 5,
    },

    tableRow: {
        flexDirection: 'row',
    },
    tableCell: {
        flex: 1,
        padding: 4,

        fontSize: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    boldText: {
        // fontWeight: 'bold',
        color: '#005f73',

        fontSize: 14,
        // fontFamily: 'Roboto',
    },

    //charts
    chartSection: {
        marginTop: 10,
    },
    chart: {
        width: '100%',
        height: 100,
        borderWidth: 1,
        borderColor: '#005f73',
    },

    //rover info section

    roverInfoSection: {
        marginTop: 20,
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'flex-start', // Align items at the start of the container
    },
    infoColumn: {
        width: '50%', // Adjust width as needed
        paddingRight: 10,
    },
    imageColumn: {
        width: '50%', // Adjust width as needed
        paddingLeft: 10,
        zIndex: 1,
    },
    roverName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.primaryBlue,
        marginBottom: 10,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    infoLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        width: 150,
    },
    infoValue: {
        fontSize: 14,
        color: colors.darkGray,
    },

    roverImage: {
        width: '100%',
        height: 'auto',
        borderRadius: 8,
        backgroundColor: colors.lightBlue,
        zIndex: 1,
    },

    watermark: {
        position: 'absolute',
        top: 0,          // Position at the top
        left: 0,         // Align to the left
        right: 0,        // Extend to the right/
        bottom: 0,       // Extend to the bottom
        zIndex: 3,      // Ensure it is behind other content
        opacity: 0.1,   // Adjust opacity as needed
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',

    },

    //titlepage addons 
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
    },
    headerContainer: {
        textAlign: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'lightBlue',
        padding: 20,
    },
    middleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },

    date: {
        fontSize: 10,
        color: '#333',
    },
    footerContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        // marginTop: 40,
    },
    footerLogo: {
        width: '20%',
        objectFit: 'contain',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1, // Ensure the image is behind the text
    },
});

export default styles;
