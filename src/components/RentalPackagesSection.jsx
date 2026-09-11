import { ArrowRight, Check, ChevronDown, KeyRound, Minus, CarFront } from "lucide-react"
import { allInExcludes, allInIncludes, selfDriveExcludes, selfDriveIncludes } from "../data/site"
import { formatRupiah } from "../utils/booking"
import "../styles/rental-packages.css"

function PackageFeatures({ items, excluded = false }) {
  return (
    <ul className={"rental-plans__features" + (excluded ? " rental-plans__features--excluded" : "")}>
      {items.map((item) => (
        <li key={item}>
          {excluded ? <Minus size={16} aria-hidden="true" /> : <Check size={16} aria-hidden="true" />}
          {item.includes("jam per hari") ? <strong>{item}</strong> : <span>{item}</span>}
        </li>
      ))}
    </ul>
  )
}

function startingPrice(vehicles, priceKey) {
  const prices = vehicles.map((vehicle) => vehicle[priceKey]).filter((price) => Number.isFinite(price) && price > 0)
  return prices.length ? Math.min(...prices) : null
}

export function RentalPackagesSection({ fleet, onChoose }) {
  const selfDriveFleet = fleet.filter((vehicle) => Number.isFinite(vehicle.selfDrivePrice) && vehicle.selfDrivePrice > 0)
  const plans = [
    {
      id: "all-in",
      title: "Dengan driver",
      description: "Untuk Anda yang ingin duduk nyaman sepanjang perjalanan.",
      icon: CarFront,
      price: startingPrice(fleet, "allInPrice"),
      includes: allInIncludes,
      excludes: allInExcludes,
      vehicles: "Tersedia untuk seluruh armada mobil.",
      note: "Tarif untuk area Danau Toba. Rute luar area dikonfirmasi terlebih dahulu.",
      action: "Sewa dengan driver"
    },
    {
      id: "self-drive",
      title: "Lepas kunci",
      description: "Untuk Anda yang ingin mengatur sendiri waktu dan rute.",
      icon: KeyRound,
      price: startingPrice(selfDriveFleet, "selfDrivePrice"),
      includes: selfDriveIncludes,
      excludes: selfDriveExcludes,
      vehicles: selfDriveFleet.length ? selfDriveFleet.map((vehicle) => vehicle.shortName).join(", ") + "." : "Ketersediaan unit dikonfirmasi melalui WhatsApp.",
      note: "Syarat, jaminan, batas wilayah, dan serah terima dikonfirmasi terlebih dahulu.",
      action: "Pilih lepas kunci"
    }
  ]

  return (
    <section className="rental-plans" id="paket" aria-labelledby="rental-plans-title">
      <div className="container">
        <header className="rental-plans__heading">
          <div>
            <span className="eyebrow">Paket sewa</span>
            <h2 id="rental-plans-title">Dengan driver,<br /><em>atau lepas kunci.</em></h2>
          </div>
          <p>Bandingkan waktu pemakaian dan fasilitasnya.<br />Pilih yang sesuai dengan rencana perjalanan Anda.</p>
        </header>

        <div className="rental-plans__comparison">
          {plans.map(({ id, title, description, icon: Icon, price, includes, excludes, vehicles, note, action }) => (
            <article className={"rental-plan rental-plan--" + id} key={id} aria-labelledby={id + "-title"}>
              <header className="rental-plan__header">
                <div>
                  <h3 id={id + "-title"}>{title}</h3>
                  <p>{description}</p>
                </div>
                <Icon className="rental-plan__icon" size={28} strokeWidth={1.5} aria-hidden="true" />
              </header>

              <p className="rental-plan__price">
                <span>{price === null ? "Tarif sewa" : "Mulai dari"}</span>
                <strong>{price === null ? "Hubungi kami" : formatRupiah(price)}{price !== null && <small>/ hari</small>}</strong>
              </p>

              <div className="rental-plan__inclusions">
                <h4>Termasuk dalam paket</h4>
                <PackageFeatures items={includes} />
                <div className="rental-plan__vehicles">
                  <h4>Pilihan kendaraan</h4>
                  <p>{vehicles}</p>
                </div>
              </div>

              <details className="rental-plan__exclusions">
                <summary>Biaya di luar paket<ChevronDown size={18} aria-hidden="true" /></summary>
                <PackageFeatures items={excludes} excluded />
              </details>

              <footer className="rental-plan__footer">
                <p>{note}</p>
                <button className="rental-plan__choose" type="button" onClick={() => onChoose(id)}>
                  {action}<ArrowRight size={18} aria-hidden="true" />
                </button>
              </footer>
            </article>
          ))}
        </div>
        <p className="rental-plans__footnote">Harga mengikuti pilihan mobil dan durasi sewa. Ketersediaan serta harga final dikonfirmasi melalui WhatsApp.</p>
      </div>
    </section>
  )
}
