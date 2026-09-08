import { ArrowRight, Check, Clock3, KeyRound, Minus, Route, ShieldCheck } from "lucide-react"
import { allInExcludes, allInIncludes, selfDriveExcludes, selfDriveIncludes } from "../data/site"
import { formatRupiah } from "../utils/booking"
import "../styles/rental-packages.css"

function PackageFeatures({ items, excluded = false }) {
  return (
    <ul className={"rental-plans__features" + (excluded ? " rental-plans__features--excluded" : "")}>
      {items.map((item) => (
        <li key={item}>
          {excluded ? <Minus size={16} aria-hidden="true" /> : <Check size={16} aria-hidden="true" />}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function RentalPackagesSection({ fleet, onChoose }) {
  const selfDriveFleet = fleet.filter((vehicle) => vehicle.selfDrivePrice !== null)
  const allInStartingPrice = Math.min(...fleet.map((vehicle) => vehicle.allInPrice))
  const selfDriveStartingPrice = Math.min(...selfDriveFleet.map((vehicle) => vehicle.selfDrivePrice))

  return (
    <section className="rental-plans" id="paket" aria-labelledby="rental-plans-title">
      <div className="container">
        <header className="rental-plans__heading">
          <div>
            <span className="eyebrow">Paket sewa · Sesuai gaya Anda</span>
            <h2 id="rental-plans-title">Pilih bantuan penuh atau <em>berkendara sendiri.</em></h2>
          </div>
          <p>Duduk nyaman bersama driver, atau pegang kendali perjalanan Anda. Dua pilihan, dengan rincian biaya yang jelas sejak awal.</p>
        </header>

        <div className="rental-plans__grid">
          <article className="rental-plan rental-plan--assisted" aria-labelledby="all-in-title">
            <div className="rental-plan__top">
              <div className="rental-plan__kicker"><span>Untuk perjalanan tanpa repot</span><ShieldCheck size={23} aria-hidden="true" /></div>
              <h3 id="all-in-title">All In</h3>
              <p className="rental-plan__subtitle">Anda menikmati perjalanan.<br />Kami yang menyetir.</p>
              <div className="rental-plan__allowance">
                <p><strong>12</strong><span>jam<small>per hari</small></span></p>
                <span className="rental-plan__allowance-note"><Clock3 size={18} aria-hidden="true" />Maksimal perjalanan<br />bersama driver</span>
              </div>
              <div className="rental-plan__ribbon"><Check size={16} aria-hidden="true" /> Driver sudah termasuk</div>
            </div>
            <div className="rental-plan__body">
              <div className="rental-plan__details">
                <div>
                  <h4>Sudah termasuk</h4>
                  <PackageFeatures items={allInIncludes} />
                </div>
                <div>
                  <h4>Di luar tarif sewa</h4>
                  <PackageFeatures items={allInExcludes} excluded />
                </div>
              </div>
              <p className="rental-plan__note"><Route size={18} aria-hidden="true" /><span>Tarif berlaku untuk area Danau Toba. Rute luar area dikonfirmasi melalui WhatsApp.</span></p>
              <div className="rental-plan__footer">
                <p className="rental-plan__price"><span>Mulai dari</span><strong>{formatRupiah(allInStartingPrice)}<small>/hari</small></strong></p>
                <button className="button button--primary button--full" type="button" onClick={() => onChoose("all-in")}>Pilih paket All In <ArrowRight size={18} aria-hidden="true" /></button>
              </div>
            </div>
          </article>

          <article className="rental-plan rental-plan--independent" aria-labelledby="self-drive-title">
            <div className="rental-plan__top">
              <div className="rental-plan__kicker"><span>Untuk kebebasan berkendara</span><KeyRound size={23} aria-hidden="true" /></div>
              <h3 id="self-drive-title">Lepas Kunci</h3>
              <p className="rental-plan__subtitle">Rute Anda. Ritme Anda.<br />Nikmati kebebasannya.</p>
              <div className="rental-plan__allowance">
                <p><strong>24</strong><span>jam<small>per hari</small></span></p>
                <span className="rental-plan__allowance-note"><Clock3 size={18} aria-hidden="true" />Bebas pemakaian<br />selama masa sewa</span>
              </div>
              <div className="rental-plan__ribbon"><KeyRound size={16} aria-hidden="true" /> Unit kendaraan · Tanpa driver</div>
            </div>
            <div className="rental-plan__body">
              <div className="rental-plan__details">
                <div>
                  <h4>Sudah termasuk</h4>
                  <PackageFeatures items={selfDriveIncludes} />
                  <div className="rental-plan__cars">
                    <h4>Pilihan kendaraan</h4>
                    <ul>{selfDriveFleet.map((vehicle) => <li key={vehicle.id}>{vehicle.shortName}</li>)}</ul>
                  </div>
                </div>
                <div>
                  <h4>Di luar tarif sewa</h4>
                  <PackageFeatures items={selfDriveExcludes} excluded />
                </div>
              </div>
              <p className="rental-plan__note"><ShieldCheck size={18} aria-hidden="true" /><span>Syarat, jaminan, batas wilayah, dan serah terima kendaraan dikonfirmasi melalui WhatsApp.</span></p>
              <div className="rental-plan__footer">
                <p className="rental-plan__price"><span>Mulai dari</span><strong>{formatRupiah(selfDriveStartingPrice)}<small>/hari</small></strong></p>
                <button className="button button--outline button--full" type="button" onClick={() => onChoose("self-drive")}>Pilih lepas kunci <ArrowRight size={18} aria-hidden="true" /></button>
              </div>
            </div>
          </article>
        </div>
        <p className="rental-plans__footnote">Harga menyesuaikan kendaraan dan durasi sewa. Ketersediaan serta harga final dikonfirmasi bersama tim.</p>
      </div>
    </section>
  )
}
