import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import { Layout, LayoutHeader, LayoutBody } from '@/components/custom/layout'
import { Button } from '@/components/custom/button'
import { Card } from '@/components/ui/card'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import PdfDocument from './components/pdf-document/pdf-document'
import Options from './components/options'
import { Mission, OptionsType } from '@/types/types'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { ReloadIcon } from '@radix-ui/react-icons'

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
  const [initialOptions, setInitialOptions] = useState<OptionsType>(options)
  const [pdfData, setPdfData] = useState<React.ReactElement | null>(null)
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)
  const [isPdfLoading, setIsPdfLoading] = useState<boolean>(true)

  // Fetch mission data
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

  // Initial PDF load
  useEffect(() => {
    if (mission && mission.images) {
      const imageUrls = mission.images
        .slice(0, options.numImages)
        .map((image) => image.image_url)
      setPdfData(
        <PdfDocument
          mission={mission}
          options={options}
          imageUrls={imageUrls}
        />
      )
      setIsPdfLoading(false)
      setIsButtonDisabled(true) // Disable the button after initial load
    }
  }, [mission])

  // Handle options change
  const handleOptionsChange = (newOptions: OptionsType) => {
    setOptions(newOptions)
    setIsButtonDisabled(false) // Enable button when options change
  }

  // Regenerate PDF
  const regeneratePdf = () => {
    if (mission && mission.images) {
      setIsButtonDisabled(true)
      setIsPdfLoading(true)
      const imageUrls = mission.images
        .slice(0, options.numImages)
        .map((image) => image.image_url)
      setPdfData(
        <PdfDocument
          mission={mission}
          options={options}
          imageUrls={imageUrls}
        />
      )
      setInitialOptions(options)
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

  // Error state
  if (error) {
    return <div>{error}</div>
  }

  // No mission data available
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
              disabled={
                isButtonDisabled ||
                JSON.stringify(options) === JSON.stringify(initialOptions)
              }
            >
              {isButtonDisabled ? 'PDF Updated' : 'Update PDF'}
            </Button>
          </div>
          <div className='flex justify-end'>
            {pdfData && (
              <Button>
                <PDFDownloadLink
                  document={pdfData}
                  fileName={`inspection-report-${inspectionId}.pdf`}
                >
                  {({ loading }) =>
                    loading ? (
                      <Button disabled>
                        <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                        Please wait
                      </Button>
                    ) : (
                      'Download now'
                    )
                  }
                </PDFDownloadLink>
              </Button>
            )}
          </div>
        </div>
        <div className='grid gap-4 lg:grid-cols-2'>
          <Options
            onOptionsChange={handleOptionsChange}
            currentOptions={options}
          />
          <Card className='space-y-2'>
            {isPdfLoading ? (
              <Skeleton className='rounded-lg'>
                <Badge variant='outline'>Loading PDF...</Badge>
              </Skeleton>
            ) : (
              pdfData && (
                <PDFViewer width='100%' height='100%' className='rounded-lg'>
                  {pdfData}
                </PDFViewer>
              )
            )}
            {/* {pdfData ? (
              <PDFViewer width='100%' height='100%' className='rounded-lg'>
                {pdfData}
              </PDFViewer>
            ) : (
              <Skeleton className='h-100% rounded-lg '>
                <Badge variant='outline'>PDF Viewer</Badge>
              </Skeleton>
            )} */}
          </Card>
        </div>
      </LayoutBody>
    </Layout>
  )
}

export default GenerateReport
