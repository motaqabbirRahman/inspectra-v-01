import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { Layout, LayoutHeader, LayoutBody } from '@/components/custom/layout'
import { Button } from '@/components/custom/button'
import { Card } from '@/components/ui/card'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import PdfDocument from './components/pdf-document'
import Options from './components/options'
import { Skeleton } from '@/components/ui/skeleton'
import { ReloadIcon } from '@radix-ui/react-icons'
import { Mission, OptionsType } from '@/types/types'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'

const GenerateReport = () => {
  const { inspectionId } = useParams()
  const location = useLocation()

  const [mission, setMission] = useState<Mission | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [options, setOptions] = useState<OptionsType>({
    model: 'genesis',
    numImages: 2,
    includeRoverData: 'yes',
    detectionType: [],
    charts: [],
    comment: '',
    minAccuracy: 90,
    includeImageDimension: true,
  })
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)
  const [isPdfLoading, setIsPdfLoading] = useState<boolean>(false)
  const [pdfUrl, setPdfUrl] = useState('')

  useEffect(() => {
    const fetchMissionData = async () => {
      try {
        if (!inspectionId) throw new Error('Inspection ID is required')

        const response = await fetch(
          `https://inspectraapi.dubotech.com/api/missions/${inspectionId}`
        )
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`)

        const data = await response.json()
        const missionData =
          Array.isArray(data) && data.length > 0 ? data[0] : data
        setMission(missionData as Mission)
      } catch (error) {
        setError('Error fetching data.')
      } finally {
        setLoading(false)
      }
    }

    if (location.state?.inspection) {
      setMission(location.state.inspection as Mission)
      setLoading(false)
    } else {
      fetchMissionData()
    }
  }, [inspectionId, location.state])

  const handleOptionsChange = (newOptions: OptionsType) => {
    setOptions(newOptions)
    setIsButtonDisabled(false)
  }

  const regeneratePdf = () => {
    setIsPdfLoading(true)
    setIsButtonDisabled(true)

    const pdfContent = document.getElementById('pdf-content')

    if (pdfContent) {
      console.log('pdfContent found:', pdfContent)

      pdfContent.style.color = 'black'

      html2canvas(pdfContent)
        .then((canvas) => {
          console.log('Canvas created:', canvas)

          const imgData = canvas.toDataURL('image/png')
          console.log('Image data generated:', imgData)

          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4',
          })

          pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
          console.log('Image added to PDF')

          const blob = pdf.output('blob')
          console.log('PDF Blob created:', blob)

          const pdfBlobUrl = URL.createObjectURL(blob)
          console.log('Blob URL created:', pdfBlobUrl)

          setPdfUrl(pdfBlobUrl)
          setIsPdfLoading(false)
        })
        .catch((error) => {
          console.error('html2canvas error:', error)
          setIsPdfLoading(false)
        })
    } else {
      console.error('pdfContent element not found')
      setIsPdfLoading(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <LayoutHeader>
          <Skeleton className='h-8 w-1/2 rounded' />
          <div className='ml-auto flex items-center space-x-4'>
            <Skeleton className='h-8 w-8 rounded-full' />
            <Skeleton className='h-8 w-8 rounded-full' />
          </div>
        </LayoutHeader>
        <LayoutBody className='space-y-4'>
          <div className='grid gap-4 lg:grid-cols-2'>
            <div className='flex items-center justify-between'>
              <Skeleton className='h-4 w-1/2 rounded' />
              <Skeleton className='h-10 w-32 rounded' />
            </div>
            <div className='flex justify-end'>
              <Skeleton className='h-10 w-32 rounded' />
            </div>
          </div>
          <div className='grid gap-4 lg:grid-cols-2'>
            <Skeleton className='h-72 rounded-lg' />
            <Skeleton className='h-72 rounded-lg' />
          </div>
        </LayoutBody>
      </Layout>
    )
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!mission) {
    return <div>Mission data is not available</div>
  }

  return (
    <Layout>
      <LayoutHeader>
        <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
          Report Generator
        </h1>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>
      <LayoutBody className='space-y-4'>
        <div className='grid gap-4 lg:grid-cols-2'>
          <div className='flex items-center justify-between'>
            <p className='mr-3 text-sm text-muted-foreground'>
              Select or change options below to Update the PDF
            </p>
            <Button
              variant='outline'
              onClick={regeneratePdf}
              className={`${
                isButtonDisabled
                  ? 'cursor-not-allowed bg-gray-400 text-white'
                  : 'bg-blue-500 text-white'
              }`}
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? 'PDF Updated' : 'Update PDF'}
            </Button>
          </div>
          <div className='flex justify-end'>
            <Button onClick={regeneratePdf} disabled={isPdfLoading}>
              {isPdfLoading ? (
                <>
                  <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                  Generating...
                </>
              ) : (
                'Download PDF'
              )}
            </Button>
          </div>
        </div>
        <div className='grid gap-4 lg:grid-cols-2'>
          <Options
            onOptionsChange={handleOptionsChange}
            currentOptions={options}
          />
          <Card className='space-y-2'>
            {/* Placeholder for PDF content */}
            <div id='pdf-content'>
              <h2>Inspection Report</h2>
              {/* <p>Mission Title: {mission.mission_title}</p> */}
              {/* <p>Customer: {mission.customer}</p> */}
              <p>Number of Images: {options.numImages}</p>
              {/* Add more content here that you want to include in the PDF */}
            </div>

            {pdfUrl ? (
              <object
                data={pdfUrl}
                type='application/pdf'
                width='100%'
                height='600px'
              >
                <p>
                  Your browser does not support PDFs.{' '}
                  <a href={pdfUrl} target='_blank' rel='noopener noreferrer'>
                    Download the PDF
                  </a>
                  .
                </p>
              </object>
            ) : (
              <p>No PDF available</p>
            )}
          </Card>
        </div>
      </LayoutBody>
    </Layout>
  )
}

export default GenerateReport
