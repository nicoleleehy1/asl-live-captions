import { Card, CardContent } from "@/components/ui/Card"

interface LiveCaptionsProps {
  text: string
}

export default function LiveCaptions({ text }: LiveCaptionsProps) {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-2">Live Captions</h2>
        <p className="text-xl">{text || "Waiting for ASL interpretation..."}</p>
      </CardContent>
    </Card>
  )
}