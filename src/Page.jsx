import App from "./App"
import { ServicePage } from "./components/ServicePage"
import { Logo } from "./components/Logo"
import { getPage } from "./seo.js"

export function Page({ pathname }) {
  const page = getPage(pathname)
  if (page.noindex) {
    return <><header className="site-header"><div className="container site-header__inner"><Logo href="/" /></div></header><main className="section container"><h1>Halaman tidak ditemukan</h1><p>Alamat ini belum tersedia. Temukan pilihan mobil dan layanan kami di halaman utama.</p><a className="button button--primary" href="/">Kembali ke beranda</a></main></>
  }
  return page.path === "/" ? <App /> : <ServicePage page={page} />
}
