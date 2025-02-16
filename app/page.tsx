"use client";
import React, { useState } from "react";
import WebcamFeed from "./components/WebcamFeed";
import LiveCaptions from "./components/LiveCaptions";
import SpeechSynthesis from "./components/SpeechSynthesis";
import { Card, CardContent } from "./components/ui/Card"; // Import the Card and CardContent components

export default function Home() {
  const [detectedSign, setDetectedSign] = useState("");

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8">ASL Live Captions</h1>
        
        {/* Wrap webcam feed and detected sign inside a Card */}
        <Card className="mb-8">
          <CardContent>
            <WebcamFeed onSignDetected={setDetectedSign} />
            <h2>Detected Sign: {detectedSign}</h2>
          </CardContent>
        </Card>

        {/* Wrap live captions and speech synthesis in another Card */}
        <Card className="mb-8">
          <CardContent>
            <LiveCaptions text={detectedSign} />
            <SpeechSynthesis text={detectedSign} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}


