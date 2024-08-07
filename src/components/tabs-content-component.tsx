import React from 'react';
import VideoPlayerCard from './VideoPlayerCard';
import DataCard from './DataCard';
import MapSection from './MapSection';
import { Card } from './';

const TabsContentComponent = ({ value, videos, depth, current, speed, updateVideoUrl }) => (
  <TabsContent value={value} className='space-y-3'>
    <div className="grid gap-2 lg:grid-cols-3">
      <div className="lg:col-span-2 relative">
        <VideoPlayerCard url={videos[0]} />
      </div>

      <div className="lg:col-span-1 grid gap-3">
        <VideoPlayerCard url={videos[1]} />
        <VideoPlayerCard url={videos[2]} />
      </div>

      <Card className="grid gap-0 lg:grid-cols-2 mt-0 object-fit">
        <MapSection src="../../../../public/images/google-map-placeholder.png" />
        <div className="lg:col-span-1 bg-opacity-75 m-2 p-2 rounded-lg">
          <div className="mt-2 space-y-2">
            <DataCard icon={DepthIcon} label="Depth" value={depth} unit="m" />
            <DataCard icon={CurrentIcon} label="Current" value={current} unit="nm" />
            <DataCard icon={SpeedIcon} label="Speed" value={speed} unit="m/s" />
          </div>
        </div>
      </Card>
    </div>
  </TabsContent>
);

export default TabsContentComponent;

