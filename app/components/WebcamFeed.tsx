import React, { useRef, useEffect, useState, useCallback } from "react";
import Webcam from "react-webcam";  // Import the react-webcam component
import * as handpose from "@tensorflow-models/handpose";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; // OR use "@tensorflow/tfjs-backend-wasm"
import { GestureEstimator, Gestures } from "fingerpose";
import { drawHand } from "../utils/drawHand";

interface WebcamFeedProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onSignDetected: (sign: string) => void;
}




const WebcamFeed: React.FC<WebcamFeedProps> = ({ onSignDetected, videoRef }) => {
  const webcamRef = useRef<Webcam>(null);  // Ref for react-webcam component
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);

  // Wrap onSignDetected in useCallback to prevent unnecessary re-renders
  const handleSignDetected = useCallback(onSignDetected, []);

  useEffect(() => {
    const runHandpose = async () => {
      await tf.setBackend("webgl");
      await tf.ready();
      console.log("TensorFlow.js backend:", tf.getBackend());

      const net = await handpose.load();
      console.log("Handpose model loaded.");

      setLoading(false);

      setInterval(async () => {
        const video = webcamRef.current?.video;
        if (video && video.readyState === 4) {
          const hand = await net.estimateHands(video);

          if (hand.length > 0) {
            const ctx = canvasRef.current?.getContext("2d");
            if (ctx) drawHand(hand, ctx);

            const GE = new GestureEstimator([Gestures.ThumbsUpGesture, Gestures.VictoryGesture]);

            const estimatedGestures = await GE.estimate(hand[0].landmarks, 8.5);

            if (estimatedGestures.gestures.length > 0) {
              const gesture = estimatedGestures.gestures.reduce(
                (prev: { name: string; confidence: number }, current: { name: string; confidence: number }) =>
                  prev.confidence > current.confidence ? prev : current
              );
              handleSignDetected(gesture.name);
            }
          }
        }
      }, 500);
    };

    runHandpose();
  }, [handleSignDetected, webcamRef]);

  return (
    <div>
      {loading ? (
        <p>Loading Handpose model...</p>
      ) : (
        <>
          <Webcam
            ref={webcamRef}  // Set the ref for react-webcam
            videoConstraints={{ facingMode: "user" }}
            style={{ width: "100%", height: "auto" }}
          />
          <canvas ref={canvasRef} style={{ position: "absolute" }} />
        </>
      )}
    </div>
  );
};

export default WebcamFeed;
