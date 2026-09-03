import { useEffect, useRef, useState } from "react"
import { Ambulance, Clipboard, MessageCircle, X } from "lucide-react"
import { buildAmbulanceMessage, createWhatsAppUrl } from "../utils/booking"
import { siteConfig } from "../data/site"

const emptyValues = {
  name: "",
  phone: "",
  dateTime: "",
  pickupLocation: "",
  destination: "",
  needs: ""
}

export function AmbulanceDialog({ open, onClose }) {
  const dialogRef = useRef(null)
  const titleRef = useRef(null)
  const [values, setValues] = useState(emptyValues)
  const [errors, setErrors] = useState({})
  const [sentState, setSentState] = useState(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      setErrors({})
      setSentState(null)
      dialog.showModal()
      window.setTimeout(() => titleRef.current?.focus(), 0)
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  function updateValue(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => {
      const next = { ...current }
      delete next[name]
      return next
    })
  }

  function validate() {
    const next = {}
    if (!values.name.trim()) next.name = "Masukkan nama penghubung."
    if (!values.phone.trim()) next.phone = "Masukkan nomor WhatsApp."
    if (!values.dateTime) next.dateTime = "Pilih perkiraan waktu."
    if (!values.pickupLocation.trim()) next.pickupLocation = "Masukkan lokasi jemput."
    if (!values.destination.trim()) next.destination = "Masukkan tujuan."
    return next
  }

  function submit(event) {
    event.preventDefault()
    const nextErrors = validate()
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }
    const message = buildAmbulanceMessage(values)
    const url = createWhatsAppUrl(siteConfig.whatsappNumber, message)
    setSentState({ message, url })
    window.open(url, "_blank", "noopener,noreferrer")
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(sentState.message)
      setSentState((current) => ({ ...current, copied: true }))
    } catch {
      setSentState((current) => ({ ...current, copied: false }))
    }
  }

  function closeDialog() {
    onClose()
  }

  return (
    <dialog
      className="booking-dialog ambulance-dialog"
      ref={dialogRef}
      onCancel={(event) => {
        event.preventDefault()
        closeDialog()
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) closeDialog()
      }}
      aria-labelledby="ambulance-title"
    >
      <div className="dialog-shell">
        <header className="dialog-header">
          <div>
            <span className="eyebrow">Layanan tambahan</span>
            <h2 id="ambulance-title" tabIndex="-1" ref={titleRef}>Cek sewa ambulans</h2>
          </div>
          <button className="icon-button" type="button" onClick={closeDialog} aria-label="Tutup formulir ambulans"><X size={22} aria-hidden="true" /></button>
        </header>
        <div className="dialog-body">
          <div className="ambulance-intro">
            <span><Ambulance size={25} aria-hidden="true" /></span>
            <p><strong>Harga melalui negosiasi WhatsApp.</strong> Kirim kebutuhan dasar agar tim dapat mengecek ketersediaan dan memberi informasi lebih lanjut.</p>
          </div>
          <form onSubmit={submit} noValidate>
            <div className="form-grid form-grid--two">
              <div className="form-group">
                <label htmlFor="ambulance-name">Nama penghubung</label>
                <input id="ambulance-name" name="name" autoComplete="name" value={values.name} onChange={updateValue} aria-invalid={Boolean(errors.name)} />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="ambulance-phone">Nomor WhatsApp</label>
                <input id="ambulance-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={updateValue} aria-invalid={Boolean(errors.phone)} />
                {errors.phone && <span className="field-error">{errors.phone}</span>}
              </div>
              <div className="form-group form-group--full">
                <label htmlFor="ambulance-date">Perkiraan tanggal dan waktu</label>
                <input id="ambulance-date" name="dateTime" type="datetime-local" value={values.dateTime} onChange={updateValue} aria-invalid={Boolean(errors.dateTime)} />
                {errors.dateTime && <span className="field-error">{errors.dateTime}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="ambulance-pickup">Lokasi jemput</label>
                <input id="ambulance-pickup" name="pickupLocation" value={values.pickupLocation} onChange={updateValue} aria-invalid={Boolean(errors.pickupLocation)} />
                {errors.pickupLocation && <span className="field-error">{errors.pickupLocation}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="ambulance-destination">Tujuan</label>
                <input id="ambulance-destination" name="destination" value={values.destination} onChange={updateValue} aria-invalid={Boolean(errors.destination)} />
                {errors.destination && <span className="field-error">{errors.destination}</span>}
              </div>
              <div className="form-group form-group--full">
                <label htmlFor="ambulance-needs">Kebutuhan singkat <span>(opsional)</span></label>
                <textarea id="ambulance-needs" name="needs" rows="3" value={values.needs} onChange={updateValue} placeholder="Tuliskan informasi yang perlu diketahui tim" />
              </div>
            </div>
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
            <div className="dialog-actions">
              <button className="button button--whatsapp button--full" type="submit"><MessageCircle size={19} aria-hidden="true" /> Tanyakan via WhatsApp</button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  )
}
