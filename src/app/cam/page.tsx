import { useRef, useState, useEffect } from 'react';

const CameraCapture = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (isCapturing) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("Error accessing camera: ", err);
        });
    }
  }, [isCapturing]);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 640, 480);
        setPhoto(canvasRef.current.toDataURL('image/png'));
        // You can now send the photo data (base64) to your backend
      }
    }
  };

  return (
    <div>
      <button onClick={() => setIsCapturing(true)}>Start Camera</button>
      <div style={{ display: isCapturing ? 'block' : 'none' }}>
        <video ref={videoRef} width="640" height="480" autoPlay />
        <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }} />
        <button onClick={capturePhoto}>Capture Photo</button>
      </div>
      {photo && (
        <div>
          <h3>Captured Photo:</h3>
          <img src={photo} alt="Captured" />
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
