import { ArrowRight, Fuel, Users } from "lucide-react"
import { formatRupiah } from "../utils/booking"
import { VehicleArtwork } from "./VehicleArtwork"

export function VehicleCard({ vehicle, onChoose }) {
  return (
    <article className={"vehicle-card" + (vehicle.featured ? " vehicle-card--featured" : "")}>
      {vehicle.featured && <span className="vehicle-card__featured">Pilihan populer</span>}
      <VehicleArtwork vehicle={vehicle} />
      <div className="vehicle-card__content">
        <div className="vehicle-card__heading">
          <div>
            <span className="eyebrow eyebrow--small">{vehicle.categoryLabel}</span>
            <h3>{vehicle.name}</h3>
          </div>
        </div>
        <p>{vehicle.description}</p>
        <div className="vehicle-card__specs" aria-label="Spesifikasi utama">
          <span><Users size={17} aria-hidden="true" />{vehicle.capacityLabel}</span>
          <span><Fuel size={17} aria-hidden="true" />{vehicle.fuelLabel}{vehicle.fuelNeedsConfirmation ? "*" : ""}</span>
        </div>
        <div className="vehicle-card__prices">
          <div className="price-row">
            <span><strong>All In</strong><small>Driver + BBM · maks. 12 jam</small></span>
            <span className="price"><strong>{formatRupiah(vehicle.allInPrice)}</strong><small>/hari</small></span>
          </div>
          {vehicle.selfDrivePrice !== null ? (
            <div className="price-row price-row--secondary">
              <span><strong>Lepas Kunci</strong><small>Tanpa driver & BBM · bebas 24 jam</small></span>
              <span className="price"><strong>{formatRupiah(vehicle.selfDrivePrice)}</strong><small>/hari</small></span>
            </div>
          ) : (
            <div className="vehicle-card__availability">Tersedia untuk paket All In</div>
          )}
        </div>
        <button className="button button--outline button--full" type="button" onClick={() => onChoose(vehicle)}>
          Pilih kendaraan <ArrowRight size={18} aria-hidden="true" />
        </button>
        {vehicle.fuelNeedsConfirmation && <small className="vehicle-card__note">*Tipe bahan bakar mengikuti unit yang tersedia.</small>}
      </div>
    </article>
  )
}
