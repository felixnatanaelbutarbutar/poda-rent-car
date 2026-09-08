import { ArrowRight, Fuel, MessageCircle, Users } from "lucide-react"
import { formatRupiah } from "../utils/booking"
import { VehicleArtwork } from "./VehicleArtwork"
import { siteConfig } from "../data/site"
import { createWhatsAppUrl } from "../utils/booking"

export function VehicleCard({ vehicle, onChoose }) {
  const isPriceOnRequest = vehicle.priceOnRequest === true

  const ambulanceWhatsApp = isPriceOnRequest
    ? createWhatsAppUrl(
        siteConfig.whatsappNumber,
        "Halo PodaRentCar, saya ingin menanyakan ketersediaan dan harga ambulans.\n\nMohon info detail layanannya. Terima kasih."
      )
    : null

  return (
    <article className={"vehicle-card" + (vehicle.featured ? " vehicle-card--featured" : "") + (isPriceOnRequest ? " vehicle-card--por" : "")}>
      {vehicle.featured && <span className="vehicle-card__featured">Pilihan populer</span>}
      {isPriceOnRequest && <span className="vehicle-card__por-badge">Harga via chat</span>}
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
          {vehicle.capacityLabel && <span><Users size={17} aria-hidden="true" />{vehicle.capacityLabel}</span>}
          <span><Fuel size={17} aria-hidden="true" />{vehicle.fuelLabel}{vehicle.fuelNeedsConfirmation ? "*" : ""}</span>
        </div>

        {isPriceOnRequest ? (
          <div className="vehicle-card__por-section">
            <div className="vehicle-card__por-info">
              <span>Harga menyesuaikan jarak, waktu, dan kebutuhan.</span>
              <span>Tanya dulu — tanpa perlu daftar atau tunggu email.</span>
            </div>
            <a
              className="button button--whatsapp button--full"
              href={ambulanceWhatsApp}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} aria-hidden="true" /> Tanya harga via WhatsApp
            </a>
          </div>
        ) : (
          <>
            <div className="vehicle-card__prices">
              <div className="price-row">
                <span><strong>Dengan Driver</strong><small>Maks. 12 jam/hari</small></span>
                <span className="price"><strong>{formatRupiah(vehicle.allInPrice)}</strong><small>/hari</small></span>
              </div>
              {vehicle.selfDrivePrice !== null ? (
                <div className="price-row price-row--secondary">
                  <span><strong>Berkendara Sendiri</strong><small>Tanpa driver · bebas 24 jam</small></span>
                  <span className="price"><strong>{formatRupiah(vehicle.selfDrivePrice)}</strong><small>/hari</small></span>
                </div>
              ) : (
                <div className="vehicle-card__availability">Tersedia paket dengan driver saja</div>
              )}
            </div>
            <button className="button button--outline button--full" type="button" onClick={() => onChoose(vehicle)}>
              Pilih kendaraan <ArrowRight size={18} aria-hidden="true" />
            </button>
            {vehicle.fuelNeedsConfirmation && <small className="vehicle-card__note">*Tipe bahan bakar mengikuti unit yang tersedia.</small>}
          </>
        )}
      </div>
    </article>
  )
}
