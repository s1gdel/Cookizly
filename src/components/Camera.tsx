import React, { useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import { Camera as CameraIcon } from 'lucide-react';

interface CameraProps {
  onCapture: (imageSrc: string) => void;
}

export const Camera: React.FC<CameraProps> = ({ onCapture }) => {
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
    }
  }, [onCapture]);

  return (
    <div className="relative">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: { exact: "environment" }
        }}
        className="w-full aspect-[3/4] rounded-xl shadow-lg border-2 border-[#2B2F36] object-cover"
      />
      <button
        onClick={capture}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#2B2F36] text-[#FCD535] px-8 py-4 rounded-full shadow-lg flex items-center gap-2 hover:bg-[#363A45] active:bg-[#363A45] transition-colors text-lg"
      >
        <CameraIcon className="w-6 h-6" />
        Take Photo
      </button>
    </div>
  );
}