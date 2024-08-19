import { useState, useEffect, useMemo } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import { Layout, LayoutHeader, LayoutBody } from '@/components/custom/layout'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/custom/button'
import { Card } from '@/components/ui/card'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { TopNav } from '@/components/top-nav'
import { Search } from '@/components/search'
import PdfDocument from './components/pdf-document'
import Options from './components/options'
import { Mission } from '@/types/types'
import { topNavData } from '@/data/topnav'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { LoaderCircle } from 'lucide-react'
import { ReloadIcon } from '@radix-ui/react-icons'

type OptionsType = {
  model: string
  numImages: number
  includeRoverData: string
  charts: string
  comment: string
}

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
    charts: 'speed-altitude',
    comment: '',
  })

  const LoadingButton = () => (
    <Button disabled>
      <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
      Please wait
    </Button>
  )
  const [pdfData, setPdfData] = useState<React.ReactElement | null>(null)
  const [isRegenerated, setIsRegenerated] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[] | ''>([])

  const handleOptionsChange = (newOptions: OptionsType) => {
    setOptions(newOptions)
    setIsRegenerated(false)
  }

  const regeneratePdf = () => {
    if (mission && mission.images) {
      const imageUrls = mission.images
        .slice(0, options.numImages)
        .map((image) => image.image_url)

      const newPdfData = (
        <PdfDocument
          mission={mission}
          options={options}
          imageUrls={imageUrls}
        />
      )
      setPdfData(newPdfData)
      setIsRegenerated(false)
    }
  }
  const initialPdf = () => {
    if (mission && mission.images) {
      const imageUrls = mission.images
        .slice(0, options.numImages)
        .map((image) => image.image_url)

      const newPdfData = (
        <PdfDocument
          mission={mission}
          options={options}
          imageUrls={imageUrls}
        />
      )
      setPdfData(newPdfData)
    }
  }

  useEffect(() => {
    const fetchMissionData = async () => {
      try {
        if (!inspectionId) {
          throw new Error('Inspection ID is required')
        }

        const response = await fetch(
          `https://inspectraapi.dubotech.com/api/missions/${inspectionId}`
        )
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()
        console.log('Fetched data:', data)

        const missionData =
          Array.isArray(data) && data.length > 0 ? data[0] : data
        setMission(missionData as Mission)
      } catch (error) {
        setError('Error fetching data.')
      } finally {
        setLoading(false)
        setIsInitialLoad(true)
      }
    }

    if (!location.state?.inspection) {
      fetchMissionData()
    } else {
      setMission(location.state.inspection as Mission)
      setLoading(false)
    }
  }, [inspectionId, location.state])

  useEffect(() => {
    if (isInitialLoad && mission) {
      initialPdf()
    }
  }, [isInitialLoad, mission])

  if (loading)
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <LoaderCircle className='animate-spin' />
      </div>
    )
  if (error) return <div>{error}</div>

  if (!mission) {
    return <div>Mission data is not available</div>
  }

  return (
    <Layout>
      <LayoutHeader>
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
              onClick={() => {
                regeneratePdf()
                setIsRegenerated(true)
              }}
              className={`${
                isRegenerated
                  ? 'cursor-not-allowed bg-green-500 text-white'
                  : 'bg-blue-500 text-white'
              }`}
              disabled={isRegenerated}
            >
              {isRegenerated ? 'PDF Updated' : 'Update PDF'}
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
                    loading ? <LoadingButton /> : 'Download now'
                  }
                </PDFDownloadLink>
              </Button>
            )}
          </div>
        </div>
        <div className='grid gap-4 lg:grid-cols-2'>
          <Options onOptionsChange={handleOptionsChange} />
          <Card className='space-y-2'>
            {pdfData ? (
              <PDFViewer width='100%' height='100%' className='rounded-lg'>
                {pdfData}
              </PDFViewer>
            ) : (
              <Skeleton className='rounded-lg'>
                <Badge variant='outline'>PDF Viewer</Badge>
              </Skeleton>
            )}
          </Card>
        </div>
      </LayoutBody>
    </Layout>
  )
}

export default GenerateReport
