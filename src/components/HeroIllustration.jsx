import { useEffect, useRef, useState } from "react"
import { Pause, Play } from "lucide-react"

export function HeroIllustration() {
  const videoRef = useRef(null)
  const shouldAutoPlay = !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) {
      video.pause()
      return
    }

    video.play().catch(() => setIsPlaying(false))
  }, [])

  function togglePlayback() {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().catch(() => setIsPlaying(false))
    } else {
      video.pause()
    }
  }

  return (
    <div className={"hero-art hero-art--video" + (hasError ? " has-video-error" : "")}>
      <video
        ref={videoRef}
        className="hero-art__video"
        autoPlay={shouldAutoPlay}
        loop
        muted
        playsInline
        preload="auto"
        poster="/hero-poster.jpg"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedData={() => setIsReady(true)}
        onError={() => setHasError(true)}
        aria-label="Video perjalanan PodaRentCar di kawasan Danau Toba"
      >
        <source src="/hero.mp4#t=3" type="video/mp4" />
      </video>
      <span className="hero-art__shade" aria-hidden="true" />
      {isReady && (
        <div className="hero-art__caption">
          <span className="status-dot" aria-hidden="true" />
          Jemput bandara tersedia
        </div>
      )}
      {isReady && !hasError && (
        <button className="hero-art__control" type="button" onClick={togglePlayback} aria-label={isPlaying ? "Jeda video hero" : "Putar video hero"}>
          {isPlaying ? <Pause size={17} aria-hidden="true" /> : <Play size={17} aria-hidden="true" />}
        </button>
      )}
    </div>
  )
}
