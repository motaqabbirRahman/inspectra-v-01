import { Button } from '@/components/custom/button'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { Card } from '@/components/ui/card'
import { UserNav } from '@/components/user-nav'
import { Mission } from '@/types/types'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Options from './components/options'
// const [pdfUrl, setPdfUrl] = useState<string | null>(null)

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
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)

  const [options, setOptions] = useState<OptionsType>({
    model: 'genesis',
    numImages: 5,
    includeRoverData: 'yes',
    charts: 'speed-altitude',
    comment: '',
  })

  const handleOptionsChange = (newOptions: OptionsType) => {
    setOptions(newOptions)
  }

  const regeneratePdf = async () => {
    if (mission) {
      const imageUrls = mission.images
        .slice(0, options.numImages)
        .map((image) => image.image_url)

      try {
        const response = await axios.post(
          'http://localhost:3000/generatePdf',
          {
            mission,
            options,
            imageUrls,
          },
          {
            responseType: 'blob',
          }
        )

        // Create a URL for the Blob
        const url = window.URL.createObjectURL(new Blob([response.data]))
        setPdfUrl(url) // Update the state with the Blob URL
      } catch (error) {
        console.error('Error generating PDF:', error)
      }
    }
  }

  useEffect(() => {
    regeneratePdf()
  }, [mission, options])

  useEffect(() => {
    return () => {
      if (pdfUrl) {
        window.URL.revokeObjectURL(pdfUrl)
      }
    }
  }, [pdfUrl])

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
      }
    }

    if (!location.state?.inspection) {
      fetchMissionData()
    } else {
      setMission(location.state.inspection as Mission)
      setLoading(false)
    }
  }, [inspectionId, location.state])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  if (!mission) {
    return <div>Mission data is not available</div>
  }

  return (
    <Layout>
      <LayoutHeader>
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>

      <LayoutBody className='space-y-4'>
        <div className='flex items-center justify-between space-y-2'>
          <div className='flex items-center space-x-4'>
            <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
              PDF Generator
            </h1>
            <div className='rounded-md border p-2'>
              <Button variant='outline' onClick={regeneratePdf}>
                Regenerate PDF
              </Button>
            </div>
          </div>
        </div>
        <div className='grid gap-4 lg:grid-cols-2'>
          <Options onOptionsChange={handleOptionsChange} />
          <Card className='space-y-2'>
            {pdfUrl && (
              <div>
                <iframe
                  src={pdfUrl}
                  width='100%'
                  height='600px'
                  title='PDF Viewer'
                />
                <Button>
                  {/* PDF download logic could be added here if needed */}
                </Button>
              </div>
            )}
          </Card>
        </div>
      </LayoutBody>
    </Layout>
  )
}

export default GenerateReport
