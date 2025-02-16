"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/Button"
import { Volume2, VolumeX } from "lucide-react"

interface SpeechSynthesisProps {
  text: string
}

export default function SpeechSynthesis({ text }: SpeechSynthesisProps) {
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    if (text && isSpeaking) {
      speak(text)
    }
  }, [text, isSpeaking])

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    speechSynthesis.speak(utterance)
  }

  const toggleSpeech = () => {
    setIsSpeaking(!isSpeaking)
    if (isSpeaking) {
      speechSynthesis.cancel()
    } else if (text) {
      speak(text)
    }
  }

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-500">{isSpeaking ? "Speech enabled" : "Speech disabled"}</p>
      <Button onClick={toggleSpeech} variant="outline" size="icon">
        {isSpeaking ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </Button>
    </div>
  )
}
