import React, { useState, useEffect } from 'react'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Polyline,
  Circle,
} from '@react-google-maps/api'
import dvlData, { DvlReading } from '@/data/dvlData'
import { mapOptions, mapContainerStyle } from './styles/map-styles'
// import DepthOverlay from './depth-overlay'

// Type definition for coordinates
interface Coordinates {
  lat: number
  lng: number
}

// Interpolation function to get intermediate points between two coordinates
const interpolate = (
  start: Coordinates,
  end: Coordinates,
  numPoints: number
): Coordinates[] => {
  const points: Coordinates[] = []
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints
    const lat = start.lat + t * (end.lat - start.lat)
    const lng = start.lng + t * (end.lng - start.lng)
    points.push({ lat, lng })
  }
  return points
}

const libraries: ('places' | 'geometry' | 'drawing')[] = ['places', 'geometry']

const DvlViewer: React.FC<{ isPlaying: boolean }> = ({ isPlaying }) => {
  // const mapContainerRef = useRef<HTMLDivElement>(null)
  // const depth = [10, 15, 20, 25]

  const [path, setPath] = useState<Coordinates[]>([])
  const [circleRadius, setCircleRadius] = useState(100)
  const [expand, setExpand] = useState(true)
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(
    null
  )
  // const [zoomApplied, setZoomApplied] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCircleRadius((prevRadius) => {
          if (expand) {
            return prevRadius + 10 // Increase radius
          } else {
            return prevRadius - 10 // Decrease radius
          }
        })
        if (circleRadius > 500) {
          // Max radius
          setExpand(false)
        } else if (circleRadius < 250) {
          // Min radius
          setExpand(true)
        }
      }, 100) // Adjust speed of animation
    }
    return () => clearInterval(interval)
  }, [isPlaying, circleRadius, expand])

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries,
  })

  const initialLat = 22.313094 // Initial location (Chittagong Port latitude)
  const initialLng = 91.766985 // Initial longitude (Chittagong Port longitude)

  const calculateNewPosition = (
    lat: number,
    lng: number,
    vx: number,
    vy: number
  ): Coordinates => {
    const R = 6371000 // Earth's radius in meters
    const deltaLat = (vx / R) * (180 / Math.PI) // Change in latitude
    const deltaLng =
      (vy / (R * Math.cos((lat * Math.PI) / 180))) * (180 / Math.PI) // Change in longitude

    const newLat = lat + deltaLat
    const newLng = lng + deltaLng

    return { lat: newLat, lng: newLng }
  }

  useEffect(() => {
    let currentLat = initialLat
    let currentLng = initialLng
    const newPath: Coordinates[] = []

    dvlData.forEach((reading: DvlReading, index: number) => {
      if (index < dvlData.length - 1) {
        const nextReading = dvlData[index + 1]
        const { lat: newLat, lng: newLng } = calculateNewPosition(
          currentLat,
          currentLng,
          reading.vx,
          reading.vy
        )
        const nextLatLng = calculateNewPosition(
          newLat,
          newLng,
          nextReading.vx,
          nextReading.vy
        )
        newPath.push(
          ...interpolate({ lat: newLat, lng: newLng }, nextLatLng, 10)
        )
        currentLat = newLat
        currentLng = newLng
      }
    })

    let index = 0
    const updateInterval = isPlaying ? 1000 : null
    let intervalId: NodeJS.Timeout | null = null // Use NodeJS.Timeout for type compatibility

    if (updateInterval) {
      intervalId = setInterval(() => {
        if (index < newPath.length) {
          setCurrentLocation(newPath[index]) // Move the marker
          setPath((prevPath) => [...prevPath, newPath[index]]) // Extend the path
          index++
        } else {
          if (intervalId) {
            clearInterval(intervalId)
          }
        }
      }, updateInterval)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isPlaying])

  useEffect(() => {
    // Apply map styles only once when the component mounts
    const styleElement = document.createElement('style')
    styleElement.innerHTML = `
      a[href^="http://maps.google.com/maps"],
      a[href^="https://maps.google.com/maps"],
      a[href^="https://www.google.com/maps"],
      .gm-style-cc {
        display: none !important;
      }
    `
    document.head.appendChild(styleElement)

    return () => {
      document.head.removeChild(styleElement) // Clean up on unmount
    }
  }, [])

  if (loadError) {
    return <div>Error loading maps</div>
  }

  if (!isLoaded) {
    return <div>Loading maps...</div>
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={48}
      center={currentLocation || { lat: initialLat, lng: initialLng }} // Fallback center
      options={mapOptions}
    >
      {path.length > 1 && (
        <Polyline
          options={{
            strokeColor: '#151516',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            geodesic: true,
          }}
          path={path}
        />
      )}

      {currentLocation && (
        <Marker
          position={currentLocation}
          icon={{
            url: '/static/images/octopus.svg',
            scaledSize: new google.maps.Size(32, 32), // Adjust icon size
            origin: new google.maps.Point(3, 3), // Set the origin point
            anchor: new google.maps.Point(24, 24), // Set the anchor point
          }}
        />
      )}

      {currentLocation && (
        <div className='border-slate absolute bottom-2 right-2 z-10 h-[11.37rem] w-36 overflow-hidden rounded-lg border-2'>
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={12}
              center={currentLocation || { lat: initialLat, lng: initialLng }} // Fallback center
              options={mapOptions}
            >
              {path.length > 1 && (
                <>
                  <Polyline
                    options={{
                      strokeColor: '#151516',
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                      geodesic: true,
                    }}
                    path={path}
                  />
                  <Circle
                    center={{ lat: 22.313094, lng: 91.766985 }} // Example coordinates
                    radius={circleRadius} // Animated radius
                    options={{
                      strokeColor: '#00FF00', // Green color
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                      fillColor: '#00FF00', // Green color
                      fillOpacity: 0.35,
                    }}
                  />
                </>
              )}

              {currentLocation && (
                <Marker
                  position={currentLocation}
                  icon={{
                    url: 'static/images/octopus.svg',
                    scaledSize: new google.maps.Size(8, 8), // Adjust icon size
                    origin: new google.maps.Point(3, 3), // Set the origin point
                    anchor: new google.maps.Point(24, 24), // Set the anchor point
                  }}
                />
              )}
            </GoogleMap>
          ) : (
            <div>Loading mini-map...</div>
          )}
          {/* <DepthOverlay depth={depth} mapContainerRef={mapContainerRef} /> */}
        </div>
      )}
    </GoogleMap>
  )
}

export default DvlViewer
