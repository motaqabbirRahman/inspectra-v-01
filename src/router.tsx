import { Suspense, lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import GeneralError from './pages/errors/general-error'
import NotFoundError from './pages/errors/not-found-error'
import MaintenanceError from './pages/errors/maintenance-error'
import ProtectedRoute from './components/protected-route'
import AppShell from './components/app-shell'
import { LoadingSpinner } from './components/loading-spinner'

// Lazy load components
const Dashboard = lazy(() => import('./pages/dashboard'))
const Inspections = lazy(() => import('./pages/inspections'))
const InspectionDetails = lazy(() => import('./pages/inspection-details'))
const GenerateReport = lazy(() => import('./pages/generate-report'))
const ComingSoon = lazy(() => import('./components/coming-soon'))
const Apps = lazy(() => import('./pages/apps'))
const ProfileSettings = lazy(() => import('./pages/settings/profile'))
const AccountSettings = lazy(() => import('./pages/settings/account'))
const AppearanceSettings = lazy(() => import('./pages/settings/appearance'))
const NotificationSettings = lazy(
  () => import('./pages/settings/notifications')
)
const DisplaySettings = lazy(() => import('./pages/settings/display'))
const ErrorExample = lazy(() => import('./pages/settings/error-example'))

const router = createBrowserRouter([
  {
    path: '/sign-in',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-in')).default,
    }),
  },
  {
    path: '/sign-up',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-up')).default,
    }),
  },
  {
    path: '/forgot-password',
    lazy: async () => ({
      Component: (await import('./pages/auth/forgot-password')).default,
    }),
  },
  {
    path: '/otp',
    lazy: async () => ({
      Component: (await import('./pages/auth/otp')).default,
    }),
  },
  {
    path: '/',
    element: <AppShell />, // Wrap the main route with AppShell
    errorElement: <GeneralError />,
    children: [
      {
        index: true,
        element: (
          <Suspense
            fallback={
              <div>
                <LoadingSpinner />
              </div>
            }
          >
            <ProtectedRoute element={<Dashboard />} />
          </Suspense>
        ),
      },
      {
        path: 'inspections',
        element: (
          <Suspense
            fallback={
              <div>
                <LoadingSpinner />
              </div>
            }
          >
            <ProtectedRoute element={<Inspections />} />
          </Suspense>
        ),
      },
      {
        path: 'inspections/:inspectionId',
        element: (
          <Suspense
            fallback={
              <div>
                <LoadingSpinner />
              </div>
            }
          >
            <ProtectedRoute element={<InspectionDetails />} />
          </Suspense>
        ),
      },
      {
        path: 'inspections/:inspectionId/generate-report',
        element: (
          <Suspense
            fallback={
              <div>
                <LoadingSpinner />
              </div>
            }
          >
            <ProtectedRoute element={<GenerateReport />} />
          </Suspense>
        ),
      },
      {
        path: 'chats',
        element: (
          <Suspense
            fallback={
              <div>
                <LoadingSpinner />
              </div>
            }
          >
            <ProtectedRoute element={<ComingSoon />} />
          </Suspense>
        ),
      },
      {
        path: 'apps',
        element: (
          <Suspense
            fallback={
              <div>
                <LoadingSpinner />
              </div>
            }
          >
            <ProtectedRoute element={<Apps />} />
          </Suspense>
        ),
      },
      {
        path: 'users',
        element: (
          <Suspense
            fallback={
              <div>
                <LoadingSpinner />
              </div>
            }
          >
            <ProtectedRoute element={<ComingSoon />} />
          </Suspense>
        ),
      },
      {
        path: 'analysis',
        element: (
          <Suspense
            fallback={
              <div>
                <LoadingSpinner />
              </div>
            }
          >
            <ProtectedRoute element={<ComingSoon />} />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense
            fallback={
              <div>
                <LoadingSpinner />
              </div>
            }
          >
            <ProtectedRoute element={<ProfileSettings />} />
          </Suspense>
        ),
        errorElement: <GeneralError />,
        children: [
          {
            index: true,
            element: (
              <Suspense
                fallback={
                  <div>
                    <LoadingSpinner />
                  </div>
                }
              >
                <ProtectedRoute element={<ProfileSettings />} />
              </Suspense>
            ),
          },
          {
            path: 'account',
            element: (
              <Suspense
                fallback={
                  <div>
                    <LoadingSpinner />
                  </div>
                }
              >
                <ProtectedRoute element={<AccountSettings />} />
              </Suspense>
            ),
          },
          {
            path: 'appearance',
            element: (
              <Suspense
                fallback={
                  <div>
                    <LoadingSpinner />
                  </div>
                }
              >
                <ProtectedRoute element={<AppearanceSettings />} />
              </Suspense>
            ),
          },
          {
            path: 'notifications',
            element: (
              <Suspense
                fallback={
                  <div>
                    <LoadingSpinner />
                  </div>
                }
              >
                <ProtectedRoute element={<NotificationSettings />} />
              </Suspense>
            ),
          },
          {
            path: 'display',
            element: (
              <Suspense
                fallback={
                  <div>
                    <LoadingSpinner />
                  </div>
                }
              >
                <ProtectedRoute element={<DisplaySettings />} />
              </Suspense>
            ),
          },
          {
            path: 'error-example',
            element: (
              <Suspense
                fallback={
                  <div>
                    <LoadingSpinner />
                  </div>
                }
              >
                <ProtectedRoute element={<ErrorExample />} />
              </Suspense>
            ),
            errorElement: <GeneralError className='h-[50svh]' minimal />,
          },
        ],
      },
    ],
  },
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },
  { path: '*', Component: NotFoundError },
])

export default router
