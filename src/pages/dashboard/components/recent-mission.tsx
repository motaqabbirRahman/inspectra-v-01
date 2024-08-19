import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function RecentMissions() {
  return (
    <div className='space-y-8'>
      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/01.png' alt='Operator Avatar' />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>
            Mission: Coral Reef Survey
          </p>
          <p className='text-sm text-muted-foreground'>
            Operator: Olivia Martin
          </p>
          <p className='text-sm text-muted-foreground'>Date: Aug 12, 2024</p>
        </div>
        <div className='ml-auto font-medium'>Completed</div>
      </div>
      <div className='flex items-center'>
        <Avatar className='flex h-9 w-9 items-center justify-center space-y-0 border'>
          <AvatarImage src='/avatars/02.png' alt='Operator Avatar' />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>
            Mission: Shipwreck Exploration
          </p>
          <p className='text-sm text-muted-foreground'>Operator: Jackson Lee</p>
          <p className='text-sm text-muted-foreground'>Date: Aug 15, 2024</p>
        </div>
        <div className='ml-auto font-medium'>Completed</div>
      </div>
      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/03.png' alt='Operator Avatar' />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>
            Mission: Deep Sea Exploration
          </p>
          <p className='text-sm text-muted-foreground'>
            Operator: Isabella Nguyen
          </p>
          <p className='text-sm text-muted-foreground'>Date: Aug 20, 2024</p>
        </div>
        <div className='ml-auto font-medium'>Completed</div>
      </div>
      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/04.png' alt='Operator Avatar' />
          <AvatarFallback>WK</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>
            Mission: Underwater Cable Inspection
          </p>
          <p className='text-sm text-muted-foreground'>Operator: William Kim</p>
          <p className='text-sm text-muted-foreground'>Date: Aug 22, 2024</p>
        </div>
        <div className='ml-auto font-medium'>Completed</div>
      </div>
      <div className='flex items-center'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/05.png' alt='Operator Avatar' />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>
            Mission: Aquatic Life Monitoring
          </p>
          <p className='text-sm text-muted-foreground'>Operator: Sofia Davis</p>
          <p className='text-sm text-muted-foreground'>Date: Aug 25, 2024</p>
        </div>
        <div className='ml-auto font-medium'>Completed</div>
      </div>
    </div>
  )
}
