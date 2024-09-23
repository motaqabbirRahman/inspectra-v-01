// src/types.ts

export interface VideoUrls {
  cameraMain: string
  cameraSecondary1: string
  cameraSecondary2: string
  enhancedMain: string
  enhancedSecondary1: string
  enhancedSecondary2: string
}

export interface Mission {
  id: number
  customer: number
  mission_title: string
  mission_slug: string
  created_at: string
  date: number
  location: string
  operator: string
  start_time: number
  end_time: number
  duration: number
  min_temp: number
  max_temp: number
  min_depth: number
  max_depth: number
  gps_coordinates: string

  videos: Array<{
    id: number
    mission: number
    normal_video_url: string
    enhanced_video_url: string
    detection_video_url: string
    sonar_video_url: string | null
    heat_map_video_url: string | null
    created_at: string
  }>
  mission_detection_image: Array<{
    id: number
    mission: number
    image_url: string
    created_at: string
  }>
}

export interface Video {
  id: number
  mission: number
  normal_video_url: string
  enhanced_video_url: string
  detection_video_url: string
  sonar_video_url: string | null
  heat_map_video_url: string | null
  created_at: string
}

export interface Image {
  id: number
  mission: number
  image_url: string
  created_at: string
}

export interface Telemetry {
  id: number
  created_at: string
  roll: number
  pitch: number
  yaw: number
  depth: number
  temperature: number
  pressure: number
  battery: number
  gain: number
  mission_time: string
  mission: number
}

export interface MissionData {
  id: number
  mission_title: string
  created_at: string
  status?: string
  priority?: string
}

export interface OptionsType {
  model: string
  numImages: number
  includeRoverData: string
  charts: string[]
  comment: string
  detectionType: string[]
  minAccuracy: number
  includeImageDimension: boolean
}
