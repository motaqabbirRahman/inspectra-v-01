import { UserAuthForm } from './components/user-auth-form'
import inspectraLogo from '../../../public/static/images/inspectra.png'
import dubotech from '../../../public/static/images/dubotech.jpg'
import { TiWaves } from 'react-icons/ti'

export default function SignIn() {
  return (
    <>
      <div className='container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
          <div className='absolute inset-0 bg-zinc-900' />
          <div className='relative z-20 flex w-auto flex-col items-start'>
            <TiWaves className='h-4 w-4 animate-wave' />
            <img
              src={inspectraLogo}
              className='ml-0.5 h-auto w-56'
              alt='inspectraLogo'
            />
          </div>

          <img
            src={dubotech}
            className='relative m-auto'
            width={301}
            height={60}
            alt='Vite'
          />

          <div className='relative z-20 mt-auto'>
            <blockquote className='space-y-2'>
              <p className='text-lg'>
                <span className='rounded bg-muted px-2 py-1 text-white'>
                  Underwater Rover Inspections
                </span>
                <span className='ml-2 rounded bg-secondary px-2 py-1 text-white'>
                  High Precision
                </span>
                <span className='ml-2 rounded bg-secondary px-2 py-1 text-white'>
                  Reliable Data
                </span>
              </p>
              <footer className='text-sm'>
                <a
                  href='https://dubotech.com'
                  className='inline-block rounded bg-primary px-2 py-1 text-white'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Explore our Services
                </a>
              </footer>
            </blockquote>
          </div>
        </div>
        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-left'>
              <h1 className='text-2xl font-semibold tracking-tight'>Login</h1>
              <p className='text-sm text-muted-foreground'>
                Enter your email and password below <br />
                to log into your account
              </p>
            </div>
            <UserAuthForm />
            <p className='px-8 text-center text-sm text-muted-foreground'>
              By clicking login, you agree to our{' '}
              <a
                href='/terms'
                className='underline underline-offset-4 hover:text-primary'
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href='/privacy'
                className='underline underline-offset-4 hover:text-primary'
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
