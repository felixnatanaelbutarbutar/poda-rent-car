import { useEffect, useState } from "react"
import { Image as ImageIcon } from "lucide-react"

export function VehicleArtwork({ vehicle }) {
  const [imageFailed, setImageFailed] = useState(false)

  useEffect(() => {
    setImageFailed(false)
  }, [vehicle.image])

  return (
    <div className={"vehicle-art vehicle-art--" + vehicle.visualTone}>
      {imageFailed && (
        <div className="vehicle-art__placeholder" role="img" aria-label={"Tempat foto " + vehicle.name}>
          <ImageIcon size={38} strokeWidth={1.45} aria-hidden="true" />
          <span>Foto {vehicle.shortName}</span>
          <small>Hubungi kami untuk foto unit terbaru.</small>
        </div>
      )}
      {!imageFailed && (
        <img
          className="vehicle-art__photo"
          src={vehicle.image}
          alt={vehicle.imageAlt}
          width="800"
          height="500"
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
        />
      )}
    </div>
  )
}
