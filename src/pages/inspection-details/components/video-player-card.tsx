import { Card } from '@/components/ui/card'
import ReactPlayer from 'react-player'
import { AspectRatio } from '@/components/ui/aspect-ratio'

const VideoPlayerCard = ({
  url,
  isPlaying,
  handlePlayPause,
}: {
  url: string
  isPlaying: boolean
  handlePlayPause: (playing: boolean) => void
  debugUrl?: string
}) => (
  <Card className='overflow-hidden rounded-lg bg-neutral-900'>
    <AspectRatio ratio={16 / 9}>
      <ReactPlayer
        className='player'
        url={url}
        width='100%'
        height='100%'
        playing={isPlaying}
        muted={true}
        controls={true}
        onPlay={() => handlePlayPause(true)}
        onPause={() => handlePlayPause(false)}
      />
    </AspectRatio>
  </Card>
)

export default VideoPlayerCard
