import { useState, useEffect } from 'react'

interface VideoUrls {
  cameraMain: string
  cameraSecondary1: string
  enhancedMain: string
  enhancedSecondary1: string
  detectionMain: string
  detectionSecondary1: string
  sonarMain: string
  heatMapMain: string
}

const useFetchMission = (inspectionId: string | undefined) => {
  const [mission, setMission] = useState(null)
  const [videoUrls, setVideoUrls] = useState<VideoUrls>({
    cameraMain: '',
    cameraSecondary1: '',
    enhancedMain: '',
    enhancedSecondary1: '',
    detectionMain: '',
    detectionSecondary1: '',
    sonarMain: '',
    heatMapMain: '',
  })
  const [title, setTitle] = useState<string | null>(null)
  const [formattedDate, SetformattedDate] = useState<string | null>(null)
  const [depth, setDepth] = useState<number>(0)
  const [current, setCurrent] = useState<number>(0)
  const [speed, setSpeed] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!inspectionId) {
          throw new Error('No inspection ID provided.')
        }

        const response = await fetch(
          `https://inspectraapi.dubotech.com/api/missions/${inspectionId}`
        )

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()
        console.log('API Response:', data) // Log the entire response
        const mission = data[0]
        if (!mission) {
          throw new Error('Mission data is missing.')
        }

        setMission(mission)
        const videos = Array.isArray(mission.videos) ? mission.videos : []
        const video = videos.length > 0 ? videos[0] : null
        setTitle(mission['mission-details'].mission_title)
        const timeStrap = mission['mission-details'].created_at
        if (!timeStrap) {
          return null // or return a fallback UI
        }

        const date = new Date(timeStrap)
        const options: Intl.DateTimeFormatOptions = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short',
        }

        SetformattedDate(date.toLocaleDateString('en-US', options))
        setVideoUrls({
          cameraMain: video ? video.normal_video_link || '' : '',
          cameraSecondary1: '',
          enhancedMain: video ? video.enhanced_video_link || '' : '',
          enhancedSecondary1: '',
          detectionMain: video ? video.detection_video_link || '' : '',
          detectionSecondary1: '',
          sonarMain: video ? video.sonar_video_link || '' : '',
          heatMapMain: video ? video.heat_map_video_link || '' : '',
        })

        const telemetry =
          Array.isArray(mission.data) && mission.data.length > 0
            ? mission.data[0]
            : null

        if (telemetry) {
          setDepth(parseFloat(telemetry.depth.toFixed(1)))
          setCurrent(parseFloat(telemetry.gain.toFixed(1)))
          setSpeed(parseFloat(telemetry.pitch.toFixed(1)))
        } else {
          setDepth(0)
          setCurrent(0)
          setSpeed(0)
        }
      } catch (error) {
        setError('Error fetching data.')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [inspectionId])

  return {
    mission,
    title,
    formattedDate,
    videoUrls,
    depth,
    current,
    speed,
    loading,
    error,
  }
}

export default useFetchMission
