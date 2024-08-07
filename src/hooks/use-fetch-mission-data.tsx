import { useState, useEffect } from 'react';

interface VideoUrls {
  cameraMain: string;
  cameraSecondary1: string;
  cameraSecondary2: string;
  enhancedMain: string;
  enhancedSecondary1: string;
  enhancedSecondary2: string;
}

interface Telemetry {
  depth: number;
  gain: number;
  pitch: number;
}

interface UseFetchMissionDataResult {
  videoUrls: VideoUrls;
  depth: number;
  current: number;
  speed: number;
  loading: boolean;
  error: string | null;
}

const useFetchMissionData = (inspectionId: string): UseFetchMissionDataResult => {
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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://controlapi.dubotech.com/api/missions/${inspectionId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // Process the data
        const videos = data.videos && data.videos.length > 0 ? data.videos[0] : null;
        const telemetry = data.data && data.data.length > 0 ? data.data[0] : null;

        if (videos) {
          setVideoUrls({
            cameraMain: videos.normal_video_url || '',
            cameraSecondary1: '',
            cameraSecondary2: videos.detection_video_url || '',
            enhancedMain: videos.enhanced_video_url || '',
            enhancedSecondary1: '',
            enhancedSecondary2: '',
          });
        }

        if (telemetry) {
          setDepth(telemetry.depth);
          setCurrent(telemetry.gain);
          setSpeed(telemetry.pitch);
        }
      } catch (error) {
        setError('Error fetching data.');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [inspectionId]);

  return { videoUrls, depth, current, speed, loading, error };
};

export default useFetchMissionData;
