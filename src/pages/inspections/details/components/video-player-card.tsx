import { Card } from "@/components/ui/card";
import ReactPlayer from 'react-player';
import { AspectRatio } from "@/components/ui/aspect-ratio";

const VideoPlayerCard = ({ url, isPlaying, handlePlayPause, debugUrl }: {
  url: string, isPlaying: boolean,
  handlePlayPause: (playing: boolean) => void,
  debugUrl?: string,
}) => (
  <Card className="rounded-lg overflow-hidden bg-neutral-900">
    <AspectRatio ratio={16 / 9}>
      {/* Debug section */}
      {debugUrl && (
        <div className="absolute top-0 left-0 p-2 bg-black text-white">
          <p>{debugUrl}</p>
        </div>
      )}

      <ReactPlayer
        className="player"
        url={url}
        width="100%"
        height="100%"
        playing={isPlaying}
        muted={true}
        controls={true}
        onPlay={() => handlePlayPause(true)}
        onPause={() => handlePlayPause(false)}
      />
    </AspectRatio>
  </Card>
);

export default VideoPlayerCard;

