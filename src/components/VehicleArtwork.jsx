import { useEffect, useState } from "react"
import { Image as ImageIcon } from "lucide-react"

export function VehicleArtwork({ vehicle }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)

  useEffect(() => {
    setImageLoaded(false)
    setImageFailed(false)
  }, [vehicle.image])

  return (
    <div className={"vehicle-art vehicle-art--" + vehicle.visualTone}>
      {!imageLoaded && (
        <div className="vehicle-art__placeholder" role="img" aria-label={"Tempat foto " + vehicle.name}>
          <ImageIcon size={38} strokeWidth={1.45} aria-hidden="true" />
          <span>Foto {vehicle.shortName}</span>
          <small>{vehicle.image.replace("/img/car/", "")}</small>
        </div>
      )}
      {!imageFailed && (
        <img
          className={"vehicle-art__photo" + (imageLoaded ? " is-loaded" : "")}
          src={vehicle.image}
          alt={vehicle.imageAlt}
          width="800"
          height="500"
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageFailed(true)}
        />
      )}
    </div>
  )
}
