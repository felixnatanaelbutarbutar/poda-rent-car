import { useEffect, useMemo, useRef, useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clipboard,
  Fuel,
  MessageCircle,
  Users,
  X
} from "lucide-react"
import {
  buildCarBookingMessage,
  calculateEstimate,
  createWhatsAppUrl,
  formatRupiah,
  getDailyRate,
  getLocalDateMinimum,
  getPackageLabel,
  getPackageUsageLabel,
  validateBooking
} from "../utils/booking"
import { siteConfig } from "../data/site"

const emptyBooking = {
  vehicleId: "",
  packageType: "all-in",
  startDate: "",
  days: "1",
  passengers: "1",
  name: "",
  phone: "",
  pickupLocation: "Bandara Silangit",
  destination: "",
  notes: ""
}

function FieldError({ id, children }) {
  if (!children) return null
  return <span className="field-error" id={id}>{children}</span>
}

export function BookingDialog({ open, fleet, initialVehicle, initialPackage = "all-in", onClose }) {
  const dialogRef = useRef(null)
  const titleRef = useRef(null)
  const errorSummaryRef = useRef(null)
  const [step, setStep] = useState(1)
  const [values, setValues] = useState(emptyBooking)
  const [errors, setErrors] = useState({})
  const [availabilityNote, setAvailabilityNote] = useState("")
  const [sentState, setSentState] = useState(null)

  const selectedVehicle = useMemo(
    () => fleet.find((vehicle) => vehicle.id === values.vehicleId),
    [fleet, values.vehicleId]
  )
  const estimate = calculateEstimate(selectedVehicle, values.packageType, values.days)
  const dailyRate = getDailyRate(selectedVehicle, values.packageType)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      setStep(1)
      setErrors({})
      setSentState(null)
      setAvailabilityNote("")
      setValues({
        ...emptyBooking,
        vehicleId: initialVehicle?.id || "",
        packageType: initialPackage
      })
      dialog.showModal()
      window.setTimeout(() => titleRef.current?.focus(), 0)
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open, initialVehicle, initialPackage])

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      errorSummaryRef.current?.focus()
    }
  }, [errors])

  function updateValue(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
    })
  }

  function selectVehicle(event) {
    const vehicle = fleet.find((item) => item.id === event.target.value)
    let packageType = values.packageType

    if (packageType === "self-drive" && vehicle?.selfDrivePrice === null) {
      packageType = "all-in"
      setAvailabilityNote("Paket dialihkan ke All In karena mobil tersebut tidak tersedia untuk Lepas Kunci.")
    } else {
      setAvailabilityNote("")
    }

    setValues((current) => ({ ...current, vehicleId: event.target.value, packageType }))
    setErrors((current) => {
      const next = { ...current }
      delete next.vehicleId
      delete next.packageType
      return next
    })
  }

  function goToDetails(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!selectedVehicle) nextErrors.vehicleId = "Pilih kendaraan terlebih dahulu."
    if (!values.packageType) nextErrors.packageType = "Pilih paket sewa."

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }
    setErrors({})
    setStep(2)
    window.setTimeout(() => titleRef.current?.focus(), 0)
  }

  function reviewBooking(event) {
    event.preventDefault()
    const nextErrors = validateBooking(values, selectedVehicle)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }
    setErrors({})
    setStep(3)
    window.setTimeout(() => titleRef.current?.focus(), 0)
  }

  function createMessage() {
    return buildCarBookingMessage({
      ...values,
      vehicleName: selectedVehicle.name,
      packageLabel: getPackageLabel(values.packageType),
      usageLabel: getPackageUsageLabel(values.packageType),
      formattedEstimate: formatRupiah(estimate)
    })
  }

  function sendToWhatsApp() {
    const message = createMessage()
    const url = createWhatsAppUrl(siteConfig.whatsappNumber, message)
    setSentState({ url, message })
    window.open(url, "_blank", "noopener,noreferrer")
  }

  async function copyMessage() {
    if (!sentState) return
    try {
      await navigator.clipboard.writeText(sentState.message)
      setSentState((current) => ({ ...current, copied: true }))
    } catch {
      setSentState((current) => ({ ...current, copied: false }))
    }
  }

  function closeDialog() {
    setSentState(null)
    onClose()
  }

  return (
    <dialog
      className="booking-dialog"
      ref={dialogRef}
      onCancel={(event) => {
        event.preventDefault()
        closeDialog()
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) closeDialog()
      }}
      aria-labelledby="booking-title"
    >
      <div className="dialog-shell">
        <header className="dialog-header">
          <div>
            <span className="eyebrow">Pesan kendaraan</span>
            <h2 id="booking-title" tabIndex="-1" ref={titleRef}>
              {step === 1 && "Pilih mobil dan paket"}
              {step === 2 && "Lengkapi rencana perjalanan"}
              {step === 3 && "Periksa sebelum dikirim"}
            </h2>
          </div>
          <button className="icon-button" type="button" onClick={closeDialog} aria-label="Tutup formulir pemesanan">
            <X size={22} aria-hidden="true" />
          </button>
        </header>

        <ol className="stepper" aria-label="Tahapan pemesanan">
          {[1, 2, 3].map((item) => (
            <li key={item} className={item === step ? "is-active" : item < step ? "is-complete" : ""} aria-current={item === step ? "step" : undefined}>
              <span>{item < step ? <Check size={15} aria-hidden="true" /> : item}</span>
              <small>{item === 1 ? "Pilihan" : item === 2 ? "Perjalanan" : "Konfirmasi"}</small>
            </li>
          ))}
        </ol>

        <div className="dialog-body">
          {Object.keys(errors).length > 0 && (
            <div className="error-summary" role="alert" tabIndex="-1" ref={errorSummaryRef}>
              <strong>Masih ada yang perlu dilengkapi.</strong>
              <span>Periksa bagian bertanda merah di bawah.</span>
            </div>
          )}

          {step === 1 && (
            <form onSubmit={goToDetails} noValidate>
              <div className="form-group">
                <label htmlFor="vehicleId">Kendaraan</label>
                <select id="vehicleId" name="vehicleId" value={values.vehicleId} onChange={selectVehicle} aria-invalid={Boolean(errors.vehicleId)} aria-describedby={errors.vehicleId ? "vehicle-error" : undefined}>
                  <option value="">Pilih salah satu kendaraan</option>
                  {fleet.map((vehicle) => (
                    <option value={vehicle.id} key={vehicle.id}>{vehicle.name} — mulai {formatRupiah(Math.min(vehicle.allInPrice, vehicle.selfDrivePrice || vehicle.allInPrice))}/hari</option>
                  ))}
                </select>
                <FieldError id="vehicle-error">{errors.vehicleId}</FieldError>
              </div>

              {selectedVehicle && (
                <div className="selected-vehicle-summary">
                  <span className="selected-vehicle-summary__initial">{selectedVehicle.shortName.slice(0, 1)}</span>
                  <span><strong>{selectedVehicle.name}</strong><small><Users size={15} aria-hidden="true" /> {selectedVehicle.capacityLabel} · <Fuel size={15} aria-hidden="true" /> {selectedVehicle.fuelLabel}</small></span>
                </div>
              )}

              <fieldset className="form-group">
                <legend>Paket sewa</legend>
                <div className="package-options">
                  <label className={"radio-card" + (values.packageType === "all-in" ? " is-selected" : "")}>
                    <input type="radio" name="packageType" value="all-in" checked={values.packageType === "all-in"} onChange={updateValue} />
                    <span><strong>All In</strong><small>Driver + BBM · maks. 12 jam/hari</small></span>
                    {selectedVehicle && <b>{formatRupiah(selectedVehicle.allInPrice)}<small>/hari</small></b>}
                  </label>
                  <label className={"radio-card" + (values.packageType === "self-drive" ? " is-selected" : "") + (!selectedVehicle || selectedVehicle.selfDrivePrice === null ? " is-disabled" : "")}>
                    <input type="radio" name="packageType" value="self-drive" checked={values.packageType === "self-drive"} onChange={updateValue} disabled={!selectedVehicle || selectedVehicle.selfDrivePrice === null} />
                    <span><strong>Lepas Kunci</strong><small>Tanpa driver & BBM · bebas 24 jam/hari</small></span>
                    {selectedVehicle?.selfDrivePrice !== null && selectedVehicle && <b>{formatRupiah(selectedVehicle.selfDrivePrice)}<small>/hari</small></b>}
                  </label>
                </div>
                <FieldError id="package-error">{errors.packageType}</FieldError>
                <p className="assistive-note" aria-live="polite">{availabilityNote}</p>
              </fieldset>

              <div className="dialog-actions">
                <button className="button button--primary button--full" type="submit">Lanjut isi perjalanan <ArrowRight size={18} aria-hidden="true" /></button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={reviewBooking} noValidate>
              <div className="form-grid form-grid--two">
                <div className="form-group">
                  <label htmlFor="startDate">Tanggal mulai</label>
                  <input id="startDate" name="startDate" type="date" min={getLocalDateMinimum()} value={values.startDate} onChange={updateValue} aria-invalid={Boolean(errors.startDate)} aria-describedby={errors.startDate ? "startDate-error" : undefined} />
                  <FieldError id="startDate-error">{errors.startDate}</FieldError>
                </div>
                <div className="form-group">
                  <label htmlFor="days">Durasi (hari)</label>
                  <input id="days" name="days" type="number" inputMode="numeric" min="1" max="60" value={values.days} onChange={updateValue} aria-invalid={Boolean(errors.days)} aria-describedby={errors.days ? "days-error" : undefined} />
                  <FieldError id="days-error">{errors.days}</FieldError>
                </div>
                <div className="form-group">
                  <label htmlFor="passengers">Jumlah penumpang</label>
                  <input id="passengers" name="passengers" type="number" inputMode="numeric" min="1" max={values.packageType === "self-drive" ? selectedVehicle.totalSeatsSelfDrive : selectedVehicle.passengerCapacityWithDriver} value={values.passengers} onChange={updateValue} aria-invalid={Boolean(errors.passengers)} aria-describedby={errors.passengers ? "passengers-error" : "passenger-hint"} />
                  <small id="passenger-hint" className="field-hint">Maks. nyaman {values.packageType === "self-drive" ? selectedVehicle.totalSeatsSelfDrive : selectedVehicle.passengerCapacityWithDriver} orang.</small>
                  <FieldError id="passengers-error">{errors.passengers}</FieldError>
                </div>
                <div className="form-group">
                  <label htmlFor="name">Nama pemesan</label>
                  <input id="name" name="name" autoComplete="name" value={values.name} onChange={updateValue} placeholder="Contoh: Debora" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
                  <FieldError id="name-error">{errors.name}</FieldError>
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Nomor WhatsApp</label>
                  <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={updateValue} placeholder="Contoh: 0812 3456 7890" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} />
                  <FieldError id="phone-error">{errors.phone}</FieldError>
                </div>
                <div className="form-group">
                  <label htmlFor="pickupLocation">Lokasi jemput</label>
                  <input id="pickupLocation" name="pickupLocation" autoComplete="street-address" value={values.pickupLocation} onChange={updateValue} placeholder="Bandara, hotel, atau alamat" aria-invalid={Boolean(errors.pickupLocation)} aria-describedby={errors.pickupLocation ? "pickup-error" : undefined} />
                  <FieldError id="pickup-error">{errors.pickupLocation}</FieldError>
                </div>
                <div className="form-group form-group--full">
                  <label htmlFor="destination">Tujuan atau rute</label>
                  <input id="destination" name="destination" value={values.destination} onChange={updateValue} placeholder="Contoh: Parapat – Samosir – Balige" aria-invalid={Boolean(errors.destination)} aria-describedby={errors.destination ? "destination-error" : undefined} />
                  <FieldError id="destination-error">{errors.destination}</FieldError>
                </div>
                <div className="form-group form-group--full">
                  <label htmlFor="notes">Catatan <span>(opsional)</span></label>
                  <textarea id="notes" name="notes" rows="3" value={values.notes} onChange={updateValue} placeholder="Jadwal penerbangan, kebutuhan kursi anak, atau info lain" />
                </div>
              </div>

              <div className="estimate-strip" aria-live="polite">
                <span>Estimasi sementara</span>
                <strong>{estimate ? formatRupiah(estimate) : "—"}</strong>
                <small>{dailyRate ? formatRupiah(dailyRate) + " × " + values.days + " hari" : "Pilih paket"}</small>
              </div>

              <div className="dialog-actions dialog-actions--split">
                <button className="button button--ghost" type="button" onClick={() => setStep(1)}><ArrowLeft size={18} aria-hidden="true" /> Kembali</button>
                <button className="button button--primary" type="submit">Tinjau pesanan <ArrowRight size={18} aria-hidden="true" /></button>
              </div>
            </form>
          )}

          {step === 3 && selectedVehicle && (
            <div className="review-card">
              <dl>
                <div><dt>Kendaraan</dt><dd>{selectedVehicle.name}</dd></div>
                <div><dt>Paket</dt><dd>{getPackageLabel(values.packageType)}</dd></div>
                <div><dt>Waktu pemakaian</dt><dd>{getPackageUsageLabel(values.packageType)}</dd></div>
                <div><dt>Tanggal & durasi</dt><dd>{values.startDate} · {values.days} hari</dd></div>
                <div><dt>Penumpang</dt><dd>{values.passengers} orang</dd></div>
                <div><dt>Rute</dt><dd>{values.pickupLocation} → {values.destination}</dd></div>
                <div className="review-card__total"><dt>Estimasi tarif</dt><dd>{formatRupiah(estimate)}</dd></div>
              </dl>
              <p className="review-card__disclaimer">Estimasi belum termasuk biaya di luar paket. Ketersediaan unit, rute, syarat, dan harga final akan dikonfirmasi melalui WhatsApp.</p>

              {sentState && (
                <div className="sent-fallback" role="status">
                  <strong>WhatsApp sudah dibuka.</strong>
                  <span>Jika tidak terbuka otomatis, gunakan tombol di bawah.</span>
                  <div>
                    <a className="button button--whatsapp button--small" href={sentState.url} target="_blank" rel="noreferrer">Buka WhatsApp</a>
                    <button className="button button--ghost button--small" type="button" onClick={copyMessage}><Clipboard size={16} aria-hidden="true" /> {sentState.copied ? "Pesan disalin" : "Salin pesan"}</button>
                  </div>
                </div>
              )}

              <div className="dialog-actions dialog-actions--split">
                <button className="button button--ghost" type="button" onClick={() => setStep(2)}><ArrowLeft size={18} aria-hidden="true" /> Ubah data</button>
                <button className="button button--whatsapp" type="button" onClick={sendToWhatsApp}><MessageCircle size={19} aria-hidden="true" /> Kirim ke WhatsApp</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </dialog>
  )
}
