import React, { useState, useEffect } from 'react';
import { Button } from '@/components/custom/button';
import { TopNav } from '@/components/top-nav'
import { Search } from '@/components/search';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ThemeSwitch from '@/components/theme-switch';
import { UserNav } from '@/components/user-nav';
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,

} from "@/components/ui/card"
import { Waves, CircleGauge, Gauge, ArrowDownNarrowWide } from 'lucide-react';
import VideoPlayerCard from './components/video-player-card';
import { Separator } from "@/components/ui/separator"
import { RightSideBar } from './components/right-side-bar';
import DataCard from './components/data-card';
import { useParams, useNavigate } from 'react-router-dom';

interface VideoUrls {
  cameraMain: string;
  cameraSecondary1: string;
  cameraSecondary2: string;
  enhancedMain: string;
  enhancedSecondary1: string;
  enhancedSecondary2: string;
}

interface Mission {
  id: number;
  customer: number;
  mission_title: string;
  mission_slug: string;
  created_at: string;
  videos?: Video[];
  images?: Image[];
  data?: Telemetry[];
}

interface Video {
  id: number;
  mission: number;
  normal_video_url: string;
  enhanced_video_url: string;
  detection_video_url: string;
  sonar_video_url: string | null;
  heat_map_video_url: string | null;
  created_at: string;
}

interface Image {
  id: number;
  mission: number;
  image_url: string;
  created_at: string;
}

interface Telemetry {
  id: number;
  created_at: string;
  roll: number;
  pitch: number;
  yaw: number;
  depth: number;
  temperature: number;
  pressure: number;
  battery: number;
  gain: number;
  mission_time: string;
  mission: number;
}

const InspectionDetails = () => {
  const [videoUrls, setVideoUrls] = useState<VideoUrls>({
    cameraMain: '',
    cameraSecondary1: '',
    cameraSecondary2: '',
    enhancedMain: '',
    enhancedSecondary1: '',
    enhancedSecondary2: '',
  });
  const [depth, setDepth] = useState<number>(0);
  const [current, setCurrent] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>('camera');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { inspectionId } = useParams<{ inspectionId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ensure inspectionId is defined
        if (!inspectionId) {
          throw new Error('No inspection ID provided.');
        }

        const response = await fetch(
          `https://inspectraapi.dubotech.com/api/missions/${inspectionId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data);

        // Assuming the response is an array with the first object being the relevant data
        const mission = data[0];
        if (!mission) {
          throw new Error('Mission data is missing.');
        }

        // Extract video and telemetry data
        const videos = mission.videos && Array.isArray(mission.videos) ? mission.videos : [];
        const video = videos.length > 0 ? videos[0] : null;

        // Assuming telemetry data is in mission.data, which is an array
        const telemetry = mission.data && Array.isArray(mission.data) && mission.data.length > 0 ? mission.data[0] : null;

        // Set video URLs
        if (video) {
          setVideoUrls({
            cameraMain: video.normal_video_url || '',
            cameraSecondary1: '', // You can add URL if available
            cameraSecondary2: video.detection_video_url || '',
            enhancedMain: video.enhanced_video_url || '',
            enhancedSecondary1: '', // You can add URL if available
            enhancedSecondary2: '', // You can add URL if available
          });
        } else {
          // Handle case when video is null or empty
          setVideoUrls({
            cameraMain: '',
            cameraSecondary1: '',
            cameraSecondary2: '',
            enhancedMain: '',
            enhancedSecondary1: '',
            enhancedSecondary2: '',
          });
        }

        // Set telemetry data
        if (telemetry) {
          setDepth(telemetry.depth);
          setCurrent(telemetry.gain); // Example mapping, adjust as needed
          setSpeed(telemetry.pitch); // Example mapping, adjust as needed
        } else {
          // Handle case when telemetry data is not available
          setDepth(0);
          setCurrent(0);
          setSpeed(0);
        }
      } catch (error) {
        setError('Error fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [inspectionId]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handlePlayPause = (playing: boolean) => {
    setIsPlaying(playing);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Layout>
      <LayoutHeader>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>

      <LayoutBody className='space-y-4'>
        <Tabs orientation='vertical' defaultValue='camera' className='space-y-4' onValueChange={handleTabChange}>
          <div className='w-full pb-2 flex items-center justify-between space-y-2'>
            <TabsList>
              <TabsTrigger value='camera'>Camera View</TabsTrigger>
              <TabsTrigger value='enhanced'>Enhanced View</TabsTrigger>
              <TabsTrigger value='detection'>Detection View</TabsTrigger>
            </TabsList>
            <Button onClick={() => navigate(`/inspections/${inspectionId}/generate-report`)}>Generate PDF </Button>
          </div>

          {/* Camera View */}
          <TabsContent value='camera' className='space-y-3'>
            <div className="grid gap-2 lg:grid-cols-3">
              <div className="lg:col-span-2 relative">
                <div className="bg-red-900 p-2 text-white">{videoUrls.cameraMain}</div>
                {activeTab === 'camera' &&
                  <VideoPlayerCard url={videoUrls.cameraMain} isPlaying={isPlaying} handlePlayPause={handlePlayPause} />}
              </div>
              <div className="lg:col-span-1 grid gap-3 bg-blue-800 rounded-lg">
                <RightSideBar />
              </div>

              {/* New Section for Map and Data */}
              <Card className="grid gap-0 lg:grid-cols-6 object-fit ">
                {/* Map Section */}
                <div className="lg:col-span-4 m-3 flex">
                  <AspectRatio ratio={16 / 9}>
                    <img src="../../../../public/images/google-map-placeholder.png" alt="Google Map" className="rounded-lg w-full h-full object-cover" />
                  </AspectRatio>
                </div>

                <div className="lg:col-span-2 m-2 rounded-lg">
                  <div className='flex justify-start mb-2'>
                    <h2 className='font-semibold'>Realtime View</h2>
                  </div>
                  <Separator className="bg-blue-900" />
                  <div className="mt-2 space-y-2">
                    <DataCard icon={ArrowDownNarrowWide} label="Depth" value={depth} unit="m" />
                    <DataCard icon={Waves} label="Current" value={current} unit="nm" />
                    <DataCard icon={Gauge} label="Speed" value={speed} unit="m/s" />
                  </div>
                </div>
              </Card>

              <Card className="grid gap-0 lg:grid-cols-1 mt-0 object-fit">
                <VideoPlayerCard url={videoUrls.cameraSecondary2} isPlaying={isPlaying} handlePlayPause={handlePlayPause}
                  debugUrl={videoUrls.cameraMain}
                />
              </Card>
            </div>
          </TabsContent>

          {/* Enhanced View */}
          <TabsContent value='enhanced' className='space-y-3'>
            <div className="grid gap-2 lg:grid-cols-12">
              <div className="lg:col-span-8 relative">
                {activeTab === 'enhanced' && (
                  <VideoPlayerCard
                    url={videoUrls.enhancedMain}
                    isPlaying={isPlaying}
                    handlePlayPause={handlePlayPause}
                  />
                )}
              </div>
              <div className="lg:col-span-4 grid gap-3">
                <VideoPlayerCard
                  url={videoUrls.enhancedSecondary1}
                  isPlaying={isPlaying}
                  handlePlayPause={handlePlayPause}
                />
                <VideoPlayerCard
                  url={videoUrls.enhancedSecondary2}
                  isPlaying={isPlaying}
                  handlePlayPause={handlePlayPause}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </LayoutBody >
    </Layout >
  );
};

export default InspectionDetails;
const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
  },
  {
    title: 'Reports',
    href: 'dashboard/report',
    isActive: false,
  },
  {
    title: 'Logs',
    href: 'dashboard/logs',
    isActive: false,
  },
  {
    title: 'Settings',
    href: '/settings',
    isActive: false,
  },
]
