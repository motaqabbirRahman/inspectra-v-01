import React, { createContext, useContext, useState, ReactNode } from 'react'

interface VideoContextProps {
  isPlaying: boolean
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

const VideoContext = createContext<VideoContextProps | undefined>(undefined)

export const VideoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  return (
    <VideoContext.Provider value={{ isPlaying, setIsPlaying }}>
      {children}
    </VideoContext.Provider>
  )
}

export const useVideoContext = () => {
  const context = useContext(VideoContext)
  if (context === undefined) {
    throw new Error('useVideoContext must be used within a VideoProvider')
  }
  return context
}
