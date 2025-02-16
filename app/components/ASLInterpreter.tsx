import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import LiveCaptions from "@/components/LiveCaptions";
import SpeechSynthesis from "@/components/SpeechSynthesis";
import WebcamFeed from "./WebcamFeed";  // Import the WebcamFeed component

export default function ASLInterpreter() {
  const [isCapturing, setIsCapturing] = useState(false);
  const [captionText, setCaptionText] = useState("");
  const videoRef = useRef<HTMLVideoElement | null>(null);  // Ref for HTMLVideoElement

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  const startCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCapturing(true);
      // Here you would start sending video frames to your ASL interpretation API
      // For demonstration, we'll use a mock interpretation
      mockInterpretation();
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCapture = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setIsCapturing(false);
    setCaptionText("");
  };

  const mockInterpretation = () => {
    const phrases = ["Hello, how are you?", "Nice to meet you", "Thank you", "Can you help me?", "I understand"];
    let index = 0;
    const interval = setInterval(() => {
      if (isCapturing) {
        setCaptionText(phrases[index]);
        index = (index + 1) % phrases.length;
      } else {
        clearInterval(interval);
      }
    }, 3000);
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardContent className="p-6">
        <div className="aspect-video bg-gray-200 mb-4 relative">
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          {!isCapturing && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-500">Camera feed will appear here</p>
            </div>
          )}
        </div>
        <div className="flex justify-center mb-4">
          {!isCapturing ? (
            <Button onClick={startCapture}>Start Capturing</Button>
          ) : (
            <Button onClick={stopCapture} variant="destructive">
              Stop Capturing
            </Button>
          )}
        </div>
        <WebcamFeed videoRef={videoRef} onSignDetected={(sign) => setCaptionText(sign)} />
        <LiveCaptions text={captionText} />
        <SpeechSynthesis text={captionText} />
      </CardContent>
    </Card>
  );
}
