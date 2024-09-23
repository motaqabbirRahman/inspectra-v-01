import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/auth-context'

interface ProtectedRouteProps {
  element: React.ReactElement
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Set loading to false once authentication status is determined
    setLoading(false)
  }, [isAuthenticated])

  if (loading) {
    // Optionally render a loading spinner or nothing while checking authentication
    // return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    // Redirect them to the sign-in page if not authenticated
    return <Navigate to='/sign-in' state={{ from: location }} />
  }

  return element
}

export default ProtectedRoute
