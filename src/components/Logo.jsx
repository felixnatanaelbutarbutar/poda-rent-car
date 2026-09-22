export function Logo({ href = "#beranda" }) {
  return (
    <a className="brand" href={href} aria-label="PodaRentCar, kembali ke beranda">
      <span className="brand__logo" aria-hidden="true">
        <img src="/img/logo/logo.png" alt="" width="1672" height="941" />
      </span>
    </a>
  )
}
