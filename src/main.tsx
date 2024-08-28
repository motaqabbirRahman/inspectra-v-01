import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import { VideoProvider } from '@/contexts/video-context'
import router from '@/router'
import '@/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <VideoProvider>
        {' '}
        {/* Wrap with VideoProvider */}
        <RouterProvider router={router} />
        <Toaster />
      </VideoProvider>
    </ThemeProvider>
  </React.StrictMode>
)
